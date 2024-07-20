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
    
    const users = {
        'Team': '5880'
    };

    // Check if the user is already logged in
    if (localStorage.getItem('loggedInUser')) {
        showLoggedInView();
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (users[username] && users[username] === password) {
            localStorage.setItem('loggedInUser', username);
            showLoggedInView();
        } else {
            loginMessage.textContent = 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
        }
    });

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        showLoggedOutView();
    });

    quizSelect.addEventListener('change', () => {
        const selectedQuiz = quizSelect.value;
        if (selectedQuiz) {
            showQuiz(selectedQuiz);
        } else {
            quizContainer.style.display = 'none';
        }
    });

    taskSelect.addEventListener('change', () => {
        const selectedTask = taskSelect.value;
        if (selectedTask) {
            showTasks(selectedTask);
        } else {
            taskContainer.style.display = 'none';
        }
    });

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(quizForm);
        const userAnswers = {};
        formData.forEach((value, key) => {
            userAnswers[key] = value;
        });

        const correctAnswers = {
            question1: 'A',
            question2: 'C',
            question3: 'B',
            question4: 'B'
        };

        let score = 0;
        for (let question in correctAnswers) {
            if (userAnswers[question] === correctAnswers[question]) {
                score++;
            }
        }

        if (score === 4) {
            quizMessage.textContent = 'Glückwunsch! Du hast das Quiz bestanden.';
        } else {
            quizMessage.textContent = 'Leider hast du das Quiz nicht bestanden. Bitte versuche es später erneut.';
            setWaitTime();
        }

        quizForm.reset();
    });

    function showLoggedInView() {
        document.getElementById('login').style.display = 'none';
        document.getElementById('quizzes').style.display = 'block';
        document.getElementById('tasks').style.display = 'block';
        loginLink.style.display = 'none';
        logoutLink.style.display = 'block';
    }

    function showLoggedOutView() {
        document.getElementById('login').style.display = 'block';
        document.getElementById('quizzes').style.display = 'none';
        document.getElementById('tasks').style.display = 'none';
        loginLink.style.display = 'block';
        logoutLink.style.display = 'none';
    }

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

    function setWaitTime() {
        const waitTimeKey = 'quizWaitTime';
        let waitTime = parseInt(localStorage.getItem(waitTimeKey) || '0', 10);
        if (waitTime) {
            quizMessage.textContent += ` Du musst ${waitTime / 60000} Minuten warten, bevor du es erneut versuchen kannst.`;
            setTimeout(() => {
                quizMessage.textContent = '';
                localStorage.removeItem(waitTimeKey);
            }, waitTime);
        } else {
            localStorage.setItem(waitTimeKey, '3600000'); // 1 Stunde in Millisekunden
            quizMessage.textContent += ' Du musst 60 Minuten warten, bevor du es erneut versuchen kannst.';
        }
    }
});
