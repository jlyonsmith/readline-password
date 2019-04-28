import readlinePassword from "."

test("createInstance", () => {
  const rl = readlinePassword.createInstance(process.stdin, process.stdout)

  rl.close()
  process.stdin.unref()
})
