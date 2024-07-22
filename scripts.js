document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const profileContainer = document.getElementById('profileContainer');
    const profileForm = document.getElementById('profileForm');
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

    const users = {
        'Jannis': { password: 'adminpass1', role: 'admin', email: '' },
        'Jürgen': { password: 'adminpass2', role: 'admin', email: '' },
        'Max': { password: 'adminpass3', role: 'admin', email: '' },
        'Bacon': { password: 'modpass', role: 'moderator', email: '' },
        'Nunu': { password: 'tsupportpass', role: 'tsupporter', email: '' }
    };

    let currentUser = null;

    function isLoggedIn() {
        return currentUser !== null;
    }

    function setLoggedIn(user) {
        currentUser = user;
        localStorage.setItem('currentUser', user ? JSON.stringify(user) : null);
    }

    function updateLoginState() {
        if (isLoggedIn()) {
            loginForm.style.display = 'none';
            logoutLink.style.display = 'block';
            profileLink.style.display = 'block';
            document.getElementById('quizzes').style.display = 'block';
            document.getElementById('tasks').style.display = 'block';
            if (currentUser.email) {
                profileLink.querySelector('img').src = 'profile.png'; // Placeholder for user-specific profile image
            }
        } else {
            loginForm.style.display = 'block';
            logoutLink.style.display = 'none';
            profileLink.style.display = 'none';
            document.getElementById('quizzes').style.display = 'none';
            document.getElementById('tasks').style.display = 'none';
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (users[username] && users[username].password === password) {
            setLoggedIn(users[username]);
            updateLoginState();
            loginMessage.textContent = 'Erfolgreich angemeldet!';
        } else if (Object.values(users).some(user => user.email === username && user.password === password)) {
            const user = Object.values(users).find(user => user.email === username && user.password === password);
            setLoggedIn(user);
            updateLoginState();
            loginMessage.textContent = 'Erfolgreich angemeldet!';
        } else {
            loginMessage.textContent = 'Ungültiger Benutzername oder Passwort.';
        }
        setTimeout(() => {
            loginMessage.textContent = '';
        }, 3000);
    });

    logoutLink.addEventListener('click', function() {
        setLoggedIn(null);
        updateLoginState();
    });

    profileLink.addEventListener('click', function() {
        profileContainer.style.display = 'block';
        profileForm.email.value = currentUser.email || '';
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = profileForm.email.value;
        const newPassword = profileForm.newPassword.value;

        if (currentUser) {
            currentUser.email = email;
            if (newPassword) {
                currentUser.password = newPassword;
            }
            setLoggedIn(currentUser);
            profileContainer.style.display = 'none';
            updateLoginState();
        }
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
        }
        setTimeout(() => {
            quizMessage.textContent = '';
        }, 3000);
        quizForm.reset();
    });

    function showQuiz(quizName) {
        const questions = {
            'tsupporter': [
                { question: '1. Was würdest du tun, wenn jemand im MC Chat beleidigt?', options: { 'A': 'Muten', 'B': 'Verwarnen', 'C': 'Bannen' } },
                { question: '2. Was machst du, wenn jemand hackt?', options: { 'A': 'Verwarnen', 'B': 'Bannen', 'C': 'Bannen und den Inhaber melden' } },
                { question: '3. Was machst du bei einer Bewerbung?', options: { 'A': 'Nichts', 'B': 'Inhaber Bescheid geben', 'C': 'Ein Moderator anpingen' } },
                { question: '4. Was machst du bei Spammen?', options: { 'A': 'Inhaber Bescheid geben', 'B': 'Muten', 'C': 'Kicken' } }
            ]
        };

        quizForm.innerHTML = '';
        const selectedQuiz = questions[quizName];

        selectedQuiz.forEach((q, index) => {
            const fieldset = document.createElement('fieldset');
            const legend = document.createElement('legend');
            legend.textContent = q.question;
            fieldset.appendChild(legend);

            Object.entries(q.options).forEach(([key, value]) => {
                const label = document.createElement('label');
                label.textContent = value;
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${index + 1}`;
                input.value = key;
                label.prepend(input);
                fieldset.appendChild(label);
                fieldset.appendChild(document.createElement('br'));
            });

            quizForm.appendChild(fieldset);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Absenden';
        quizForm.appendChild(submitButton);

        quizContainer.style.display = 'block';
    }

    function showTasks(rank) {
        const tasks = {
            'tsupporter': ['Chat aktiv halten', 'Generälen Support'],
            'supporter': ['Chat aktiv halten', 'Generälen Support', 'T-Supportern Überwachen, Unterstützen.'],
            'moderator': ['Chat aktiv halten', 'Generälen Support', 'Supporter und T-Supporter bewachen.'],
            'srmoderator': ['Chat aktiv halten', 'Generälen Support', 'Moderator, Supporter und T-Supporter bewachen', 'Admins und Inhaber unterstützen.'],
            'admin': ['Verwaltung des Servers', 'Bewerbungen', 'Leitung des Teams.']
        };

        taskContainer.innerHTML = '';
        const selectedTasks = tasks[rank];

        selectedTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.textContent = task;
            taskContainer.appendChild(taskElement);
        });

        taskContainer.style.display = 'block';
    }

    function sendEmail(userName, formData) {
        console.log(`Email to ${currentUser.email}:\nHallo ${userName},\n\nHerzlichen Glückwunsch! Du hast das Quiz bestanden.\n\nDeine Antworten:\n${Array.from(formData.entries()).map(([q, a]) => `${q}: ${a}`).join('\n')}`);
    }

    (function initialize() {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setLoggedIn(storedUser);
        }
        updateLoginState();
    })();
});
