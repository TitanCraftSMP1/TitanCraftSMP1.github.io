document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const profileContainer = document.getElementById('profileContainer');
    const profileForm = document.getElementById('profileForm');

    const users = {
        'Jannis': { password: 'adminpass1', role: 'inhaber', email: '' },
        'Jürgen': { password: 'adminpass2', role: 'inhaber', email: 'phrugu18@gmail.com' }
    };

    let currentUser = null;

    function isLoggedIn() {
        return currentUser !== null;
    }

    function setLoggedIn(user) {
        currentUser = user;
        localStorage.setItem('currentUser', user ? JSON.stringify(user) : null);
        if (user) {
            logLoginData(user);
        }
    }

    function updateLoginState() {
        if (isLoggedIn()) {
            loginForm.style.display = 'none';
            logoutLink.style.display = 'block';
            profileLink.style.display = 'block';
            if (currentUser.email) {
                profileLink.querySelector('img').src = 'profile.png'; // Placeholder for user-specific profile image
            }
        } else {
            loginForm.style.display = 'block';
            logoutLink.style.display = 'none';
            profileLink.style.display = 'none';
        }
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (users[username] && users[username].password === password && users[username].role === 'inhaber') {
            setLoggedIn(users[username]);
            updateLoginState();
            loginMessage.textContent = 'Erfolgreich angemeldet!';
        } else {
            loginMessage.textContent = 'Ungültiger Benutzername, Passwort oder Berechtigung.';
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

    function logLoginData(user) {
        const loginData = {
            user: user.email || user.username,
            time: new Date().toLocaleString(),
            pc: navigator.userAgent,
            location: 'Unknown'
        };
        // For demonstration, logging to console. Replace this with a server-side logging endpoint.
        console.log('Login Data:', loginData);
    }

    (function initialize() {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setLoggedIn(storedUser);
        }
        updateLoginState();
    })();
});
