# Readline for Passwords

## Overview

This is a `readline` for passwords. It has a similar interface to the Node.js [readline](https://nodejs.org/api/readline.html).  Node's `readline` does not have any functionality to **not** echo the output of the `question()` method to the screen.  It also has lots of other functionality such as history and tab completion that is not relevant to entering passwords.

Currently, this implementation does not echo the password characters to the screen as `*`.  This is intentional, and follows the behavior of `ssh` password entry.

Here is an example of the usage:

```js
import readlinePassword from "readline-password"

const rl = readlinePassword.createInstance(process.stdin, process.stdout)

rl.on("SIGINT", () => process.exit(1))

rl.password("Password: \u{1F511} ", (password) => {
  console.log(password)
  rl.close()
  process.stdin.unref() // Do this only when we are all done with input
})
```

A call to `unref()` or something similar is needed to cause the Node.js event loop to exit, and is needed even with the built-in `readline` package.

## Methods

- Class: `Interface`
  - Event: `close`
  - Event: `SIGINT`
  - Method: `close()`
  - Method: `password(message, callback)`
- Function: `createInterface(input, output)`

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

### Method: `password(message, callback)`

Displays the message and begins receiving a password.  When the user hits **Enter** or **Return** the `callback()` function is called passing the password string as the first argument.

The only editing that is supported is **Backspace** to delete the last character entered, and **Control+V** or **Command+V** to paste a password.
