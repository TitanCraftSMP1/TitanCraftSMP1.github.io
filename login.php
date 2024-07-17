<?php
include('functions.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (login_user($username, $password)) {
        header('Location: index.php');
    } else {
        echo "Anmeldung fehlgeschlagen. Falscher Benutzername oder Passwort.";
    }
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anmeldung - Team Webseite</title>
</head>
<body>
    <h1>Anmeldung</h1>
    <form method="post">
        <label for="username">Benutzername:</label>
        <input type="text" id="username" name="username" required><br>
        <label for="password">Passwort:</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Anmelden</button>
    </form>
</body>
</html>
