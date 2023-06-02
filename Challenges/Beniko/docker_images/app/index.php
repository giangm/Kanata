<?php

if(isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    include($lang);
} else {
    $url = $_SERVER['REQUEST_URI'] . 'index.php?lang=stories/en.txt';
    header('Location: ' . $url);
}
?>


<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <p>Select your language:</p>
    <ul>
        <li><a href="?lang=stories/en.txt">English</a></li>
        <li><a href="?lang=stories/es.txt">Spanish</a></li>
        <li><a href="?lang=stories/fr.txt">French</a></li>
    </ul>
</body>
</html>