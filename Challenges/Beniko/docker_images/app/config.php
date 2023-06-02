<?php
$users = array(
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

define('ADMIN_USER', 'admin');
define('ADMIN_PASSWORD', 'adminpassword');

define('DEBUG_MODE', true);

define('MAX_UPLOAD_SIZE', 2000000);

define('DEFAULT_LANGUAGE', 'en_US');
define('LOCALE', 'en_US');

define('DEFAULT_TIMEZONE', 'America/Toronto');
function get_user($username, $password) {
    global $users;
    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            return $user;
        }
    }
    return null;
}
?>