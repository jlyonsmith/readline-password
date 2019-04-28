import readlinePassword from "../src"

const rl = readlinePassword.createInstance(process.stdin, process.stdout)

rl.on("SIGINT", () => process.exit(1))

rl.password("Password: \u{1F511} ", (password) => {
  console.log(password)
  rl.close()
  process.stdin.unref() // Do this only when we are all done with input. See https://stackoverflow.com/a/26004758/576235
})
