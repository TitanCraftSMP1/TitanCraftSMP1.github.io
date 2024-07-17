<?php
include('functions.php');
if (!is_logged_in()) {
    header('Location: login.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Webseite - Startseite</title>
</head>
<body>
    <h1>Willkommen, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
    <p><a href="logout.php">Abmelden</a></p>

    <h2>Quiz</h2>
    <!-- Hier kommt der Quiz-Code hin -->

    <h2>Aufgaben</h2>
    <!-- Hier kommen die Aufgaben hin -->
</body>
</html>
