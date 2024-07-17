<?php
include('functions.php');
if (!is_logged_in()) {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['quiz'])) {
    if (!can_attempt_quiz($_SESSION['username'])) {
        $attempt_data = get_last_attempt_time($_SESSION['username']);
        $wait_time = 3600 + ($attempt_data['attempts_count'] - 1) * 300; // 1 hour + 5 minutes for each failed attempt
        $remaining_time = $wait_time - (time() - $attempt_data['timestamp']);
        echo "Bitte warten Sie noch " . ceil($remaining_time / 60) . " Minuten, bevor Sie es erneut versuchen.";
    } else {
        $answers = ['question1' => 'B', 'question2' => 'C', 'question3' => 'B', 'question4' => 'B']; // Beispielantworten

        $score = 0;
        $user_answers = [];
        foreach ($_POST['answers'] as $question => $answer) {
            $user_answers[$question] = $answer;
            if ($answer == $answers[$question]) {
                $score++;
            }
        }

        if ($score == 4) {
            echo "Glückwunsch! Du hast das Quiz bestanden.";
            send_email('phrugu18@gmail.com', 'Quiz Ergebnisse', print_r($user_answers, true));
        } else {
            record_failed_attempt($_SESSION['username']);
            echo "Sie haben das Quiz nicht bestanden. Bitte versuchen Sie es später erneut.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Webseite - Startseite</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Willkommen, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
    </header>
    <main>
        <p><a href="logout.php">Abmelden</a></p>

        <h2>T-Supporter zu Supporter Quiz</h2>
        <form id="quizForm" method="post">
            <input type="hidden" name="quiz" value="true">
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="question">
                <p>1. Was würdest du tun, wenn jemand im MC Chat beleidigt?</p>
                <label><input type="radio" name="answers[question1]" value="A" required> A: Muten</label><br>
                <label><input type="radio" name="answers[question1]" value="B"> B: Verwarnen</label><br>
                <label><input type="radio" name="answers[question1]" value="C"> C: Bannen</label>
            </div>
            <div class="question">
                <p>2. Was machst du, wenn jemand hackt?</p>
                <label><input type="radio" name="answers[question2]" value="A" required> A: Verwarnen</label><br>
                <label><input type="radio" name="answers[question2]" value="B"> B: Bannen</label><br>
                <label><input type="radio" name="answers[question2]" value="C"> C: Bannen und den Inhaber melden</label>
            </div>
            <div class="question">
                <p>3. Was machst du bei einer Bewerbung?</p>
                <label><input type="radio" name="answers[question3]" value="A" required> A: Nichts</label><br>
                <label><input type="radio" name="answers[question3]" value="B"> B: Inhaber Bescheid geben</label><br>
                <label><input type="radio" name="answers[question3]" value="C"> C: Ein Moderator anpingen</label>
            </div>
            <div class="question">
                <p>4. Was machst du bei Spammen?</p>
                <label><input type="radio" name="answers[question4]" value="A" required> A: Inhaber Bescheid geben</label><br>
                <label><input type="radio" name="answers[question4]" value="B"> B: Muten</label><br>
                <label><input type="radio" name="answers[question4]" value="C"> C: Kicken</label>
            </div>
            <button type="submit">Quiz abschließen</button>
        </form>
        <p id="quizMessage"></p>
    </main>
    <script src="scripts.js"></script>
</body>
</html>
