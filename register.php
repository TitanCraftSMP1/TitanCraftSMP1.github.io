<?php
include('functions.php');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if (register_user($username, $password)) {
        echo "Registrierung erfolgreich. <a href='login.php'>Jetzt anmelden</a>";
    } else {
        echo "Registrierung fehlgeschlagen. Benutzername existiert bereits.";
    }
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrierung - Team Webseite</title>
</head>
<body>
    <h1>Registrierung</h1>
    <form method="post">
        <label for="username">Benutzername:</label>
        <input type="text" id="username" name="username" required><br>
        <label for="password">Passwort:</label>
        <input type="password" id="password" name="password" required><br>
        <button type="submit">Registrieren</button>
    </form>
</body>
</html>
