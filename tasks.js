const tasks = {
    't-supporter': [
        'Spieler muten, die beleidigen',
        'Verwarnungen aussprechen',
        'Unterstützung bei allgemeinen Anfragen'
    ],
    'supporter': [
        'Beleidigende Spieler muten',
        'Hacker melden und bannen',
        'Bewerbungen weiterleiten'
    ],
    'moderator': [
        'Moderation des Chats',
        'Bannen von Hackern',
        'Unterstützung bei Bewerbungen'
    ],
    'sr-moderator': [
        'Überwachung der Moderatoren',
        'Entscheidung über schwierige Fälle',
        'Koordination mit Admins'
    ],
    'admin': [
        'Serververwaltung',
        'Entscheidungen über Teammitglieder',
        'Überprüfung und Implementierung von Regeln'
    ]
};

function showTasks() {
    const role = document.getElementById('role').value;
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    if (tasks[role]) {
        const ul = document.createElement('ul');
        tasks[role].forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            ul.appendChild(li);
        });
        tasksList.appendChild(ul);
    }
}
