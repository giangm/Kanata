<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/public/css/index.css">
    <title>Blog Posts</title>
</head>
<body>
    <h1>Welcome to My Blog</h1>
    <a href="/upload.php">Upload a New Post!</a>
    <div class="blog-posts">
        <?php
            require_once '/var/www/html/controllers/IndexController.php';

            $indexController = new IndexController();
            $posts = $indexController->getPosts();

            foreach ($posts as $post) {
                echo '<div class="blog-post">';
                echo '<h2>' . $post['title'] . '</h2>';
                echo '<p>' . $post['content'] . '</p>';
                echo '</div>';
            }
        ?>
</body>
</html>