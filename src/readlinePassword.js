import readline from "readline"
import EventEmitter from "events"
import util from "util"

export const readlinePassword = {
  Instance: class extends EventEmitter {
    constructor(input, output) {
      super()

      this.onKeypress = this.onKeypress.bind(this)
      this.onClose = this.onClose.bind(this)

      this.input = input
      this.output = output
      this.closed = false

      input.on("keypress", this.onKeypress)

      readline.emitKeypressEvents(input)

      if (input.isTTY) {
        input.setRawMode(true)
      }

      this.once("close", this.onClose)
    }

    close() {
      if (this.closed) {
        return
      }

      if (this.input.isTTY) {
        this.input.setRawMode(false)
      }
      this.closed = true
      this.emit("close")
    }

    onClose() {
      this.input.removeListener("keypress", this.onKeypress)
    }

    backspace() {
      if (this.line.length > 0) {
        this.line = this.line.slice(0, this.line.length - 1)
      }
    }

    finishLine() {
      this.output.write("\n")

      const callback = this.callback

      this.callback = null

      if (callback) {
        callback(null, this.line)
      }
    }

    onKeypress(s, key) {
      if (key.ctrl) {
        switch (key.name) {
          case "c":
            if (this.listenerCount("SIGINT") > 0) {
              this.emit("SIGINT")
            } else {
              this.close()
            }
            break
          case "h":
            backspace()
            break
        }
      } else if (!key.meta) {
        switch (key.name) {
          case "return":
          case "enter":
            this.finishLine()
            break
          case "backspace":
            this.backspace()
            break
          default:
            if (typeof s === "string" && s) {
              this.line += s
            }
        }
      }
    }

    password(options, callback) {
      if (options && typeof options === "string") {
        options = { prompt: options }
      }

      this.line = ""
      this.echo = !!options.echo
      this.output.write(options.prompt)
      this.callback = callback
    }

    passwordAsync(options) {
      return util.promisify(this.password.bind(this))(options)
    }
  },
  createInstance: (input, output) =>
    new readlinePassword.Instance(input, output),
}
