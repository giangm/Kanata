<?php
session_start();
if (isset($_SESSION['username'])) {
    require_once '/var/www/html/controllers/Index.php';

    $indexController = new Index();
    $indexController->render();
} else {
    header('Location: login.php');
    exit();
}
?>