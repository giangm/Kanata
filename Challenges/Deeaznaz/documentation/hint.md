## Hint 1
The bulk of the application's code is written to prevent login brute force attempts. However, the implementation is insecure and can be easily bypassed.

## Hint 2
The application tracks a user's IP address through the request header's `X-Forwarded-For` value. If this value can be altered by the user, it would be possible to bypass the application's login attempt limit.