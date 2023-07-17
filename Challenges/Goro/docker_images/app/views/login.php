<?php
session_start();
require_once '/var/www/html/controllers/LoginController.php';

$loginController = new LoginController();

if ($loginController->isLoggedIn()) {
    header('Location: index.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $loginController->login($username, $password);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="/public/css/login.css">
</head>
<body>
    <div class="login-form">
        <h1>Login</h1>
        <form method="post" action="login.php">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            
            <input type="submit" value="Login">
        </form>
        <?php if (isset($_SESSION['login_error'])): ?>
            <p class="error"><?php echo $_SESSION['login_error']; ?></p>
            <?php unset($_SESSION['login_error']); ?>
        <?php endif; ?>
        <p>Don't have an account? <a href="register.php">Register</a></p>
    </div>
</body>
</html>