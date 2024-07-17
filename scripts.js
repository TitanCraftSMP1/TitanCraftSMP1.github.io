document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        question1: 'A',
        question2: 'C',
        question3: 'B',
        question4: 'B'
    };

    let score = 0;
    const formData = new FormData(event.target);
    const name = formData.get('name');
    let userAnswers = {};

    for (let [question, answer] of formData.entries()) {
        if (question !== 'name') {
            userAnswers[question] = answer;
            if (answer === answers[question]) {
                score++;
            }
        }
    }

    alert(`Du hast ${score} von 4 Fragen richtig beantwortet.`);
    if (score === 4) {
        alert('Glückwunsch! Du hast das Quiz bestanden.');
        sendEmail(name, userAnswers);
    } else {
        alert('Leider hast du das Quiz nicht bestanden. Versuche es erneut.');
    }

    // Formular zurücksetzen
    event.target.reset();
});

function sendEmail(name, userAnswers) {
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, userAnswers })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('E-Mail erfolgreich gesendet.');
        } else {
            alert('Fehler beim Senden der E-Mail.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Fehler beim Senden der E-Mail.');
    });
}
