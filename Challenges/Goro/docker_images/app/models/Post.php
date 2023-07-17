<?php
require_once '/var/www/html/utils/Database.php';

class Post {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getPostById($id) {
        $query = 'SELECT * FROM posts WHERE id = :id';
        $params = array(':username' => $id);
        return $this->db->query($query, $params)[0];
    }

    public function getAllPosts() {
        $query = 'SELECT * FROM posts';
        return $this->db->query($query, array());
    }

    public function insertPost($title, $content) {
        $query = 'INSERT INTO posts (title, content) VALUES (:title, :content)';
        $params = array(':title' => $title, ':content' => $content);
        return $this->db->query($query, $params);
    }
}
?>
