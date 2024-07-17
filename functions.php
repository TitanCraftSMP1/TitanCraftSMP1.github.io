<?php
session_start();

function get_users() {
    $users = [];
    if (file_exists('users.txt')) {
        $file = fopen('users.txt', 'r');
        while (($line = fgets($file)) !== false) {
            $data = explode(':', trim($line));
            if (count($data) == 3) {
                list($username, $password, $role) = $data;
                $users[$username] = ['password' => $password, 'role' => $role];
            }
        }
        fclose($file);
    }
    return $users;
}

function save_user($username, $password, $role = 'member') {
    $file = fopen('users.txt', 'a');
    fwrite($file, "$username:$password:$role\n");
    fclose($file);
}

function register_user($username, $password) {
    $users = get_users();
    if (isset($users[$username])) {
        return false;
    }
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    save_user($username, $hashed_password);
    return true;
}

function login_user($username, $password) {
    $users = get_users();
    if (isset($users[$username]) && password_verify($password, $users[$username]['password'])) {
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $users[$username]['role'];
        return true;
    }
    return false;
}

function is_logged_in() {
    return isset($_SESSION['username']);
}

function logout_user() {
    session_destroy();
}
?>
