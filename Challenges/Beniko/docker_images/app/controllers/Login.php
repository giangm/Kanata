<?php
require_once '/var/www/html/models/User.php';

class Login {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function login($username, $password) {
        $user = $this->userModel->getUser($username, $password);
        if ($user) {
            $_SESSION['username'] = $username;
            header('Location: index.php');
            exit();
        } else {
            $_SESSION['login_error'] = 'Invalid username or password';
        }
    }

    public function isLoggedIn() {
        return isset($_SESSION['username']);
    }

    public function render() {
        require_once '/var/www/html/views/login.php';
    }
}
?>