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
    <title>Registrierung - TitanCraft SMP</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Registrierung</h1>
    </header>
    <main>
        <form method="post">
            <div>
                <label for="username">Benutzername:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Passwort:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Registrieren</button>
        </form>
    </main>
</body>
</html>
