<?php
require_once '/var/www/html/models/Post.php';

class IndexController {
    private $postModel;

    public function __construct() {
        $this->postModel = new Post();
    }

    public function getPosts() {
        return $this->postModel->getAllPosts();
    }

    public function render() {
        require_once '/var/www/html/views/index.php';
    }
}
?>