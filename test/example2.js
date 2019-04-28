import readlinePassword from "../src"
import util from "util"

const rl = readlinePassword.createInstance(process.stdin, process.stdout)

rl.on("SIGINT", () => process.exit(1))
;(async () => {
  const password = await util.promisify(rl.password.bind(rl))(
    "Password: \u{1F511} "
  )

  console.log(password)
  rl.close()
  process.stdin.unref() // Do this only when we are all done with input. See https://stackoverflow.com/a/26004758/576235
})()
