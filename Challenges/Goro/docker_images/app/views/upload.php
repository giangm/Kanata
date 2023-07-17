<?php
    if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["xml"])) {
        require_once '/var/www/html/controllers/UploadController.php';

        $uploadController = new UploadController();
        $uploadController->handleUpload($_FILES["xml"]);

        header('Location: /');
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/public/css/index.css">
    <title>Upload Blog Contents</title>
</head>
<body>
    <h1>Upload Blog Contents</h1>
    <form action="/upload.php" method="post" enctype="multipart/form-data">
        <label for="xml">Select an XML file:</label>
        <input type="file" id="xml" name="xml" accept=".xml" required>
        <input type="submit" value="Upload">
    </form>
</body>
</html>