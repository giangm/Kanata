<?php
class User {
    private $users;

    public function __construct() {
        $this->users = array(
            array(
                'username' => 'admin',
                'password' => 'admin'
            ),
            array(
                'username' => 'user1',
                'password' => 'user1'
            ),
            array(
                'username' => 'user2',
                'password' => 'user2'
            ),
            array(
                'username' => 'user3',
                'password' => 'user3'
            )
        );
    }

    public function getUser($username, $password) {
        foreach ($this->users as $user) {
            if ($user['username'] === $username && $user['password'] === $password) {
                return $user;
            }
        }
        return null;
    }
}
?>