
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('es-ES', options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

const windowEl = document.getElementById('main-window');
const closeBtn = document.querySelector('.close-btn');
const maxBtn = document.querySelector('.max-btn');
const minBtn = document.querySelector('.min-btn');
const finderMenu = document.getElementById('finder-menu');

let isMinimized = false;

closeBtn.addEventListener('click', () => {
    windowEl.style.display = 'none';
});

maxBtn.addEventListener('click', () => {
    if (windowEl.classList.contains('maximized')) {
        windowEl.classList.remove('maximized');
        windowEl.style.width = '400px';
        windowEl.style.height = '300px';
    } else {
        windowEl.classList.add('maximized');
    }
});

minBtn.addEventListener('click', () => {
    if (!isMinimized) {
        windowEl.style.display = 'none';
        isMinimized = true;
    }
});

finderMenu.addEventListener('click', () => {
    windowEl.style.display = 'block';
    isMinimized = false;
});
