## Hint 1
Direct concatenation of directory strings and user input would imply that it would be possible  for users to read/reveal any file on the machine that hosts the application.

## Hint 2
Look for files to read that contains data that users can manipulate. Considering that the files being read by the `lanugage` parameter is being parsed through php, it will be possible to manipulate the file to contain custom php code to be interpreted by the target machine.