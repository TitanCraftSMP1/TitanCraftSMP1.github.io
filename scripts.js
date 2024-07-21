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
            if (question !== 'name' && answer === answers[question]) {
                score++;
            }
        }

        if (score === Object.keys(answers).length) {
            quizMessage.textContent = 'Glückwunsch! Du hast das Quiz bestanden.';
            sendEmail(formData.get('name'), formData);
        } else {
            quizMessage.textContent = `Leider hast du das Quiz nicht bestanden. Du hast ${score} von ${Object.keys(answers).length} Fragen richtig.`;
            setTimeout(() => {
                quizMessage.textContent = '';
            }, 3600000); // 1 Stunde warten
        }

        quizForm.reset();
    });

    function showQuiz(quizName) {
        const quizQuestions = {
            'tsupporter': [
                {
                    question: '1. Was würdest du tun, wenn jemand im MC Chat beleidigt?',
                    options: ['A: Muten', 'B: Verwarnen', 'C: Bannen']
                },
                {
                    question: '2. Was machst du, wenn jemand hackt?',
                    options: ['A: Verwarnen', 'B: Bannen', 'C: Bannen und den Inhaber melden']
                },
                {
                    question: '3. Was machst du bei einer Bewerbung?',
                    options: ['A: Nichts', 'B: Inhaber Bescheid geben', 'C: Ein Moderator anpingen']
                },
                {
                    question: '4. Was machst du bei Spammen?',
                    options: ['A: Inhaber Bescheid geben', 'B: Muten', 'C: Kicken']
                }
            ]
        };

        const questions = quizQuestions[quizName];
        quizForm.innerHTML = '<div><label for="name">Name:</label><input type="text" id="name" name="name" required></div>';
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.innerHTML = `<p>${q.question}</p>`;
            q.options.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="question${index + 1}" value="${option[0]}" required> ${option}`;
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });
            quizForm.appendChild(questionDiv);
        });
        quizForm.appendChild(document.createElement('button')).textContent = 'Quiz abschließen';
        quizContainer.style.display = 'block';
    }

    function showTasks(rank) {
        const tasks = {
            'tsupporter': [
                'Chat aktiv halten',
                'Generälen Support'
            ],
            'supporter': [
                'Chat aktiv halten',
                'Generälen Support',
                'T-Supportern Überwachen, Unterstützen.'
            ],
            'moderator': [
                'Chat aktiv halten',
                'Generälen Support',
                'Supporter und T-Supporter bewachen.'
            ],
            'srmoderator': [
                'Chat aktiv halten',
                'Generälen Support',
                'Moderator, Supporter und T-Supporter bewachen',
                'Admins und Inhaber unterstützen.'
            ],
            'admin': [
                'Verwaltung des Servers',
                'Bewerbungen',
                'Leitung des Teams.'
            ]
        };

        const taskList = tasks[rank];
        taskContainer.innerHTML = '<ul>' + taskList.map(task => `<li>${task}</li>`).join('') + '</ul>';
        taskContainer.style.display = 'block';
    }

    function sendEmail(name, formData) {
        // Hier den Code für das Senden der E-Mail einfügen
        // (nicht im Beispiel enthalten, da es serverseitige Logik erfordert)
    }

    updateLoginState();
});
