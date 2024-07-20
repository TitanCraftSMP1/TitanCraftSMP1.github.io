document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const loginLink = document.getElementById('loginLink');
    const logoutLink = document.getElementById('logoutLink');
    const quizSelect = document.getElementById('quizSelect');
    const quizContainer = document.getElementById('quizContainer');
    const quizForm = document.getElementById('quizForm');
    const quizMessage = document.getElementById('quizMessage');
    const taskSelect = document.getElementById('taskSelect');
    const taskContainer = document.getElementById('taskContainer');

    const correctAnswers = {
        'tsupporter': {
            question1: 'A',
            question2: 'C',
            question3: 'B',
            question4: 'B'
        }
    };

    const loginData = {
        username: 'Team',
        password: '5880'
    };

    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    function setLoggedIn(value) {
        localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
    }

    function updateLoginState() {
        if (isLoggedIn()) {
            loginForm.style.display = 'none';
            logoutLink.style.display = 'block';
            document.getElementById('quizzes').style.display = 'block';
            document.getElementById('tasks').style.display = 'block';
        } else {
            loginForm.style.display = 'block';
            logoutLink.style.display = 'none';
            document.getElementById('quizzes').style.display = 'none';
            document.getElementById('tasks').style.display = 'none';
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (username === loginData.username && password === loginData.password) {
            setLoggedIn(true);
            updateLoginState();
            loginMessage.textContent = 'Erfolgreich angemeldet!';
        } else {
            loginMessage.textContent = 'Ungültiger Benutzername oder Passwort.';
        }
    });

    logoutLink.addEventListener('click', function() {
        setLoggedIn(false);
        updateLoginState();
    });

    quizSelect.addEventListener('change', function() {
        const quizName = quizSelect.value;
        if (quizName) {
            showQuiz(quizName);
        } else {
            quizContainer.style.display = 'none';
        }
    });

    taskSelect.addEventListener('change', function() {
        const rank = taskSelect.value;
        if (rank) {
            showTasks(rank);
        } else {
            taskContainer.style.display = 'none';
        }
    });

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const quizName = quizSelect.value;
        const answers = correctAnswers[quizName];
        let score = 0;
        const formData = new FormData(quizForm);

        for (let [question, answer] of formData.entries()) {
            if (answers[question] === answer) {
                score++;
            }
        }

        if (score === Object.keys(answers).length) {
            quizMessage.textContent = 'Glückwunsch! Du hast das Quiz bestanden.';
            sendEmail(formData.get('name'), formData);
            resetWaitTime();
        } else {
            quizMessage.textContent = 'Leider hast du das Quiz nicht bestanden.';
            incrementWaitTime();
        }
    });

    function showQuiz(quizName) {
        const quizQuestions = {
            'tsupporter': [
                { question: '1. Was würdest du tun, wenn jemand im MC Chat beleidigt?', options: ['A: Muten', 'B: Verwarnen', 'C: Bannen'] },
                { question: '2. Was machst du, wenn jemand hackt?', options: ['A: Verwarnen', 'B: Bannen', 'C: Bannen und den Inhaber melden'] },
                { question: '3. Was machst du bei einer Bewerbung?', options: ['A: Nichts', 'B: Inhaber Bescheid geben', 'C: Ein Moderator anpingen'] },
                { question: '4. Was machst du bei Spammen?', options: ['A: Inhaber Bescheid geben', 'B: Muten', 'C: Kicken'] }
            ]
        };

        const questions = quizQuestions[quizName];
        quizForm.innerHTML = '';
        questions.forEach((q, index) => {
            const div = document.createElement('div');
            div.className = 'question';
            const p = document.createElement('p');
            p.textContent = q.question;
            div.appendChild(p);
            q.options.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="question${index + 1}" value="${option.charAt(0)}" required> ${option}`;
                div.appendChild(label);
                div.appendChild(document.createElement('br'));
            });
            quizForm.appendChild(div);
        });
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Quiz abschließen';
        quizForm.appendChild(button);
        quizContainer.style.display = 'block';
    }

    function showTasks(rank) {
        const tasks = {
            'tsupporter': ['Aufgabe 1 für T-Supporter', 'Aufgabe 2 für T-Supporter'],
            'supporter': ['Aufgabe 1 für Supporter', 'Aufgabe 2 für Supporter'],
            'moderator': ['Aufgabe 1 für Moderator', 'Aufgabe 2 für Moderator'],
            'srmoderator': ['Aufgabe 1 für SR-Moderator', 'Aufgabe 2 für SR-Moderator'],
            'admin': ['Aufgabe 1 für Admin', 'Aufgabe 2 für Admin']
        };

        const selectedTasks = tasks[rank];
        taskContainer.innerHTML = '';
        selectedTasks.forEach(task => {
            const p = document.createElement('p');
            p.textContent = task;
            taskContainer.appendChild(p);
        });
        taskContainer.style.display = 'block';
    }

    function incrementWaitTime() {
        const waitTimeKey = 'quizWaitTime';
        let waitTime = parseInt(localStorage.getItem(waitTimeKey) || '0', 10);
        if (!waitTime) {
            waitTime = 60 * 60 * 1000; // 1 Stunde in Millisekunden
        } else {
            waitTime += 5 * 60 * 1000; // 5 zusätzliche Minuten in Millisekunden
        }
        localStorage.setItem(waitTimeKey, waitTime);
        setWaitTime(waitTime);
    }

    function resetWaitTime() {
        localStorage.removeItem('quizWaitTime');
    }

    function setWaitTime(waitTime) {
        quizMessage.textContent += ` Bitte warte ${waitTime / 60000} Minuten, bevor du es erneut versuchen kannst.`;
        setTimeout(() => {
            quizMessage.textContent = '';
            localStorage.removeItem('quizWaitTime');
        }, waitTime);
    }

    function sendEmail(name, userAnswers) {
        // Simulierter E-Mail-Versand
        console.log(`Sende E-Mail an phrugu18@gmail.com:`);
        console.log(`Name: ${name}`);
        console.log(`Antworten:`, userAnswers);
    }

    updateLoginState();
});
