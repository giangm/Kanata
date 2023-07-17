<?php
session_start();
if (isset($_SESSION['username'])) {
    require_once '/var/www/html/controllers/UploadController.php';

    $uploadController = new UploadController();
    $uploadController->render();
} else {
    header('Location: login.php');
    exit();
}
?>