## Hint 1
The `cms` parameter renders any data provided as a URL prepended by `https://`. How might this be unsafe?

## Hint 2
It is possible to make a simple file server on an attacker's machine through modules such as python's `https.server`. What kind of data can be passed to the application through a server like this to take advantage of php's `include()` function?