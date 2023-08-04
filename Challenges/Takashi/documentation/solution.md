## app.py

![](images/1.png)

In `app.py`'s `require_login()` function, there appears to be a hashed cookie that the application searches for in a client's requests. Examination of the file `database.db` reveals that the `user_id` of 0 is associated with the application's admin account. As such, if it is possible to crack the plaintext of the authorization cookie, it would be possible for any client to authenticate as the administrator and view sensitive information.
Fortunately, as the MD5 hashing algorithm is not considered secure, it is possible to find publicly available cracking tools for the hash, which reveals the `auth` cookie's plaintext value to be `privleged`.
With this knowledge, it would be possible to craft a request including this key-value pair to initiate a session with the application as the admin user without knowledge of their credentials.
