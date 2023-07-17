<?php
require_once '/var/www/html/utils/Database.php';

class User {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getUserByUsername($username) {
        $query = 'SELECT * FROM users WHERE username = :username';
        $params = array(':username' => $username);
        return $this->db->query($query, $params)[0];
    }

    public function getUser($username, $password) {
        $query = "SELECT * FROM users WHERE username = '" . $username . "' and password = '" . $password . "' LIMIT 1";
        return $this->db->query($query, array());
    }
}
?>
