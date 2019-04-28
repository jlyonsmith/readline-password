import readlinePassword from "../src"

const rl = readlinePassword.createInstance(process.stdin, process.stdout)

rl.on("SIGINT", () => process.exit(1))
;(async () => {
  const password = await rl.passwordAsync({
    prompt: "Password: \u{1F511} ",
    echo: true,
  })

  console.log(password)
  rl.close()
  process.stdin.unref() // Do this only when we are all done with input. See https://stackoverflow.com/a/26004758/576235
})()
