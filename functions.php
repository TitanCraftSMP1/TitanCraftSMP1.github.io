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

function get_last_attempt_time($username) {
    $attempts = [];
    if (file_exists('results.txt')) {
        $file = fopen('results.txt', 'r');
        while (($line = fgets($file)) !== false) {
            list($user, $timestamp, $attempts_count) = explode(':', trim($line));
            $attempts[$user] = ['timestamp' => $timestamp, 'attempts_count' => $attempts_count];
        }
        fclose($file);
    }
    return isset($attempts[$username]) ? $attempts[$username] : null;
}

function save_attempt($username, $timestamp, $attempts_count) {
    $attempts = [];
    if (file_exists('results.txt')) {
        $file = fopen('results.txt', 'r');
        while (($line = fgets($file)) !== false) {
            list($user, $time, $count) = explode(':', trim($line));
            $attempts[$user] = ['timestamp' => $time, 'attempts_count' => $count];
        }
        fclose($file);
    }
    $attempts[$username] = ['timestamp' => $timestamp, 'attempts_count' => $attempts_count];

    $file = fopen('results.txt', 'w');
    foreach ($attempts as $user => $data) {
        fwrite($file, "$user:{$data['timestamp']}:{$data['attempts_count']}\n");
    }
    fclose($file);
}

function can_attempt_quiz($username) {
    $attempt_data = get_last_attempt_time($username);
    if ($attempt_data) {
        $last_attempt_time = $attempt_data['timestamp'];
        $attempts_count = $attempt_data['attempts_count'];
        $wait_time = 3600 + ($attempts_count - 1) * 300; // 1 hour + 5 minutes for each failed attempt
        if (time() - $last_attempt_time < $wait_time) {
            return false;
        }
    }
    return true;
}

function record_failed_attempt($username) {
    $attempt_data = get_last_attempt_time($username);
    $attempts_count = $attempt_data ? $attempt_data['attempts_count'] + 1 : 1;
    save_attempt($username, time(), $attempts_count);
}

function send_email($to, $subject, $message) {
    // Beispiel: Email senden mit PHP mail()
    $headers = "From: no-reply@titancraft-smp.com";
    mail($to, $subject, $message, $headers);
}
?>
