document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const adminLink = document.getElementById('adminLink');
    const profileContainer = document.getElementById('profileContainer');
    const profileForm = document.getElementById('profileForm');
    const quizSelect = document.getElementById('quizSelect');
    const quizContainer = document.getElementById('quizContainer');
    const quizForm = document.getElementById('quizForm');
    const quizMessage = document.getElementById('quizMessage');
    const taskSelect = document.getElementById('taskSelect');
    const taskContainer = document.getElementById('taskContainer');
    const privacyPolicyModal = document.getElementById('privacyPolicyModal');
    const showPrivacyPolicyButton = document.getElementById('showPrivacyPolicyButton');
    const closePrivacyPolicyButton = document.querySelector('.close');
    const adminContainer = document.getElementById('adminContainer');
    const loginRecords = document.getElementById('loginRecords');

    showPrivacyPolicyButton.addEventListener('click', () => {
        privacyPolicyModal.style.display = 'block';
    });

    closePrivacyPolicyButton.addEventListener('click', () => {
        privacyPolicyModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === privacyPolicyModal) {
            privacyPolicyModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        // Dummy-Inhaber-Überprüfung - Ersetzen Sie dies durch echte Überprüfungen
        if (username === 'inhaber' && password === 'securepassword') {
            profileLink.style.display = 'block';
            logoutLink.style.display = 'block';
            adminLink.style.display = 'block';
            loginContainer.style.display = 'none';
            profileContainer.style.display = 'block';

            // Login-Daten protokollieren
            const loginData = {
                username: username,
                timestamp: new Date().toLocaleString(),
                device: navigator.userAgent,
                location: 'Unbekannt' // Sie können die Geolokation-API verwenden, um den Standort zu ermitteln
            };
            localStorage.setItem(`login-${Date.now()}`, JSON.stringify(loginData));

        } else {
            loginMessage.textContent = 'Ungültiger Benutzername oder Passwort';
        }
    });

    logoutLink.addEventListener('click', () => {
        profileLink.style.display = 'none';
        logoutLink.style.display = 'none';
        adminLink.style.display = 'none';
        profileContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Profil speichern
    });

    adminLink.addEventListener('click', () => {
        adminContainer.style.display = 'block';
        profileContainer.style.display = 'none';
        taskContainer.style.display = 'none';
        quizContainer.style.display = 'none';

        // Protokollierte Login-Daten abrufen
        loginRecords.innerHTML = '<h3>Login-Daten</h3>';
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('login-')) {
                const loginData = JSON.parse(localStorage.getItem(key));
                loginRecords.innerHTML += `<p>Benutzer: ${loginData.username}, Zeitpunkt: ${loginData.timestamp}, Gerät: ${loginData.device}, Standort: ${loginData.location}</p>`;
            }
        });
    });

    quizSelect.addEventListener('change', (event) => {
        const selectedQuiz = event.target.value;
        if (selectedQuiz) {
            quizContainer.style.display = 'block';
            quizForm.innerHTML = generateQuiz(selectedQuiz);
        } else {
            quizContainer.style.display = 'none';
        }
    });

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedQuiz = quizSelect.value;
        const answers = new FormData(quizForm);
        let score = 0;

        for (let [question, answer] of answers.entries()) {
            if (correctAnswers[selectedQuiz][question] === answer) {
                score++;
            }
        }

        quizMessage.textContent = `Du hast ${score} von 4 Fragen richtig beantwortet.`;
    });

    taskSelect.addEventListener('change', (event) => {
        const selectedTask = event.target.value;
        if (selectedTask) {
            taskContainer.style.display = 'block';
            taskContainer.innerHTML = generateTasks(selectedTask);
        } else {
            taskContainer.style.display = 'none';
        }
    });

    function generateQuiz(quizType) {
        return `
            <label for="question1">Frage 1</label>
            <select name="question1">
                <option value="A">Antwort A</option>
                <option value="B">Antwort B</option>
                <option value="C">Antwort C</option>
            </select>
            <label for="question2">Frage 2</label>
            <select name="question2">
                <option value="A">Antwort A</option>
                <option value="B">Antwort B</option>
                <option value="C">Antwort C</option>
            </select>
            <label for="question3">Frage 3</label>
            <select name="question3">
                <option value="A">Antwort A</option>
                <option value="B">Antwort B</option>
                <option value="C">Antwort C</option>
            </select>
            <label for="question4">Frage 4</label>
            <select name="question4">
                <option value="A">Antwort A</option>
                <option value="B">Antwort B</option>
                <option value="C">Antwort C</option>
            </select>
            <button type="submit">Abschicken</button>
        `;
    }

    function generateTasks(taskType) {
        return `
            <h3>Aufgaben für ${taskType}</h3>
            <ul>
                <li>Aufgabe 1</li>
                <li>Aufgabe 2</li>
                <li>Aufgabe 3</li>
            </ul>
        `;
    }

    // Dummy-Inhaber-Überprüfung - Ersetzen Sie dies durch echte Überprüfungen
    const correctAnswers = {
        'tsupporter': {
            question1: 'A',
            question2: 'C',
            question3: 'B',
            question4: 'B'
        }
    };
});
