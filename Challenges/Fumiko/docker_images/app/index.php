<?php
session_start();
if (isset($_SESSION['username'])) {
    require_once '/var/www/html/controllers/IndexController.php';

    $indexController = new IndexController();
    $indexController->render();
} else {
    header('Location: login.php');
    exit();
}
?>