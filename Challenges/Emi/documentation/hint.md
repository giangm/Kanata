## Hint 1
`index()` performs string concatenation with html data alongside username information. How can the username field be manipulated and what can you exploit through this behaviour?

## Hint 2
It is inherently unsafe to render raw user data as a template. This type of data should instead be passed either through a user context model or as a parameter to be inserted into a defined template.