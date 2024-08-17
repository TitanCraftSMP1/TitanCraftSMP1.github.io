document.addEventListener('DOMContentLoaded', () => {
    const adminSection = document.getElementById('adminSection');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');

    const users = {
        'Jannis': { password: 'adminpass1', role: 'admin', email: '' },
        'Jürgen': { password: 'adminpass2', role: 'admin', email: 'phrugu18@gmail.com' },
        'Fuchsi': { password: 'Ichmagfuechse', role: 'admin', email: '' },
        'Orange': { password: 'Orangensindcool', role: 'admin', email: '' },
        'Bacon': { password: 'modpass', role: 'moderator', email: '' },
        'Winterstream': { password: 'socialpass', role: 'socialmedia', email: '' },
        'Leo': { password: 'builderpass', role: 'builder', email: '' }
    };

    let currentUser = null;

    function isLoggedIn() {
        return currentUser !== null;
    }

    function setLoggedIn(user) {
        if (user) {
            currentUser = { ...user, username: Object.keys(users).find(key => users[key] === user) };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            currentUser = null;
            localStorage.removeItem('currentUser');
        }
        updateLoginState();
    }

    function updateLoginState() {
        if (isLoggedIn()) {
            loginForm.style.display = 'none';
            logoutLink.style.display = 'block';
            profileLink.style.display = 'block';
            adminSection.style.display = currentUser.role === 'admin' ? 'block' : 'none';
        } else {
            loginForm.style.display = 'block';
            logoutLink.style.display = 'none';
            profileLink.style.display = 'none';
            adminSection.style.display = 'none';
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (users[username] && users[username].password === password) {
            setLoggedIn(users[username]);
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
    });

    (function initialize() {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser && users[storedUser.username] && users[storedUser.username].password === storedUser.password) {
            setLoggedIn(storedUser);
        } else {
            setLoggedIn(null);
        }
        updateLoginState();
    })();
});
