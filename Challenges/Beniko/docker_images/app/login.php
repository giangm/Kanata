<?php
session_start();
require_once 'config.php'; // Make sure this path is correct

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    $user = get_user($username, $password);
    if ($user !== null) {
        $_SESSION['username'] = $username;
        header('Location: index.php?lang=stories/en.txt');
        exit();
    } else {
        $error = "Invalid username or password.";
    }
}
?>
<!DOCTYPE html>
<html>
<body>

<h2>Login Form</h2>

<form method="post" action="">
  <div class="container">
    <label for="username"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="username" required>

    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" required>

    <button type="submit">Login</button>
  </div>

  <?php
    if (isset($error)) {
        echo "<p>$error</p>";
    }
  ?>
</form>

</body>
</html>