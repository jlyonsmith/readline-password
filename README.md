# Readline for Passwords <!-- omit in toc -->

- [Package: `readline-password`](#package-readline-password)
  - [Class: `Interface`](#class-interface)
  - [Event: `close`](#event-close)
  - [Event: `SIGINT`](#event-sigint)
  - [Method: `close()`](#method-close)
  - [Method: `password(options, callback)`](#method-passwordoptions-callback)
  - [Method: `passwordAsync(options)`](#method-passwordasyncoptions)

## Package: `readline-password`

This is a `readline` for passwords. It has a similar interface to the Node.js [readline](https://nodejs.org/api/readline.html). Node's `readline` does not have any functionality to **not** echo the output of the `question()` method to the screen. It also has lots of other functionality such as history and tab completion that is not relevant to entering passwords.

This implementation also provides for optionally echoing the password characters to the screen as `*`.

Here is an example of the usage:

```js
import readlinePassword from "@johnls/readline-password"

const rl = readlinePassword.createInstance(process.stdin, process.stdout)

rl.on("SIGINT", () => process.exit(1))

rl.password("Password: \u{1F511} ", (password) => {
  console.log(password)
  rl.close()
  process.stdin.unref() // Do this only when we are all done with input
})
```

You can also use promises:

```js
import readlinePassword from "@johnls/readline-password"

const rl = readlinePassword.createInstance(process.stdin, process.stdout)

rl.on("SIGINT", () => process.exit(1))
;(async () => {
  const password = await rl.passwordAsync("Password: \u{1F511} ")

  console.log(password)
  rl.close()
  process.stdin.unref() // See above
})()
```

A call to `unref()` or something similar is needed to cause the Node.js event loop to exit, and is needed even with the built-in `readline` package.

### Class: `Interface`

Construct with a call to `createInterface()` or with `new Interface()`.

### Event: `close`

Occurs when:

- The `close()` method is called

### Event: `SIGINT`

Occurs when:

- The user types **Control+C** while entering a password

### Method: `close()`

Closes the `Interface` and relinquishes control over the `input` and `output` streams.

### Method: `password(options, callback)`

If `options` is a string, displays it as the text prompt and begins receiving a password. When the user hits **Enter** or **Return** the `callback()` function is called. This method follows the standard node convention of `(err, value) => ...` where value is the entered password string. `err` will always be `null`. This allows the call to be wrapped with `util.promisify()`.

If `options` is an object it can contain:

- `prompt`. String to display for the prompt
- `echo`. Whether to echo a `*` everytime an character is entered

The only editing that is supported is **Backspace** to delete the last character entered, and **Control+V** or **Command+V** to paste a password.

### Method: `passwordAsync(options)`

Like `password()` but returns a `Promise`.
