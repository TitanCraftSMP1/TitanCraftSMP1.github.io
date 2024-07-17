const quizForm = document.getElementById('quizForm');
const quizMessage = document.getElementById('quizMessage');

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        question1: 'B',
        question2: 'C',
        question3: 'B',
        question4: 'B'
    };

    let score = 0;
    const formData = new FormData(event.target);
    let userAnswers = {};

    for (let [question, answer] of formData.entries()) {
        if (question !== 'name') {
            userAnswers[question] = answer;
            if (answer === answers[question]) {
                score++;
            }
        }
    }

    const MAX_ATTEMPTS = 3; // Maximale Anzahl an Fehlversuchen
    const BASE_WAIT_TIME = 60 * 60 * 1000; // 1 Stunde in Millisekunden
    const additionalTime = (MAX_ATTEMPTS - score) * 5 * 60 * 1000; // Zusätzliche 5 Minuten pro Fehlversuch

    if (score === 4) {
        quizMessage.textContent = `Glückwunsch! Du hast das Quiz bestanden.`;
        sendEmail(formData.get('name'), userAnswers);
    } else {
        const waitTime = BASE_WAIT_TIME + additionalTime;
        setWaitTime(waitTime);
    }

    // Formular zurücksetzen
    event.target.reset();
});

function setWaitTime(waitTime) {
    quizMessage.textContent = `Leider hast du das Quiz nicht bestanden. Bitte warte, bevor du es erneut versuchst.`;

    setTimeout(() => {
        quizMessage.textContent = '';
    }, waitTime);
}

function sendEmail(name, userAnswers) {
    // Hier den Code für das Senden der E-Mail einfügen
    // (nicht im Beispiel enthalten, da es serverseitige Logik erfordert)
}
