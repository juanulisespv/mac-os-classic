
// --- Calendario y ventana calendario ---
function showEventWindow(event, dateStr) {
    let oldWin = document.getElementById('event-window');
    if (oldWin) oldWin.remove();
    const win = document.createElement('div');
    win.className = 'window';
    win.id = 'event-window';
    win.style.top = '150px';
    win.style.left = '150px';
    win.style.width = '320px';
    win.style.height = 'auto';
    win.innerHTML = `
        <div class="window-header">
            <div class="window-buttons">
                <button class="close-btn"></button>
            </div>
            <span class="window-title">Evento: ${dateStr}</span>
        </div>
        <div class="window-content">
            <h2 style="font-size:16px;margin:0 0 10px 0;">${event.title}</h2>
            <p>${event.description || ''}</p>
        </div>
    `;
    document.body.appendChild(win);
    win.querySelector('.close-btn').addEventListener('click', () => win.remove());
    makeWindowDraggable(win);
}

function renderCalendar(calendarRoot, monthYearRoot, eventsData, currentDate) {
    calendarRoot.innerHTML = "";
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    daysOfWeek.forEach(day => {
        const div = document.createElement("div");
        div.classList.add("day-name");
        div.textContent = day;
        calendarRoot.appendChild(div);
    });
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let startIndex = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < startIndex; i++) {
        calendarRoot.appendChild(document.createElement("div"));
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const div = document.createElement("div");
        div.classList.add("day");
        div.textContent = day;
        const event = eventsData.find(e => e.date === dateStr);
        if (event) {
            div.classList.add("event-day");
            div.title = event.title;
            div.style.background = '#e3f0ff';
            div.style.color = '#0d47a1';
            div.style.fontWeight = 'bold';
            div.style.position = 'relative';
            div.style.cursor = 'pointer';
            const dot = document.createElement('span');
            dot.textContent = '●';
            dot.style.color = '#1976d2';
            dot.style.fontSize = '13px';
            dot.style.position = 'absolute';
            dot.style.top = '4px';
            dot.style.right = '6px';
            div.appendChild(dot);
            div.addEventListener('click', () => {
                showEventWindow(event, dateStr);
            });
        }
        calendarRoot.appendChild(div);
    }
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    monthYearRoot.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function openCalendarWindow() {
    let calendarWindow = document.getElementById('calendar-window');
    if (calendarWindow) {
        calendarWindow.style.display = 'block';
        return;
    }
    calendarWindow = document.createElement('div');
    calendarWindow.className = 'window';
    calendarWindow.id = 'calendar-window';
    calendarWindow.style.top = '100px';
    calendarWindow.style.left = '100px';
    calendarWindow.style.width = '600px';
    calendarWindow.style.height = 'auto';
    calendarWindow.innerHTML = `
        <div class="window-header">
            <div class="window-buttons">
                <button class="close-btn"></button>
                <button class="min-btn"></button>
                <button class="max-btn"></button>
            </div>
            <span class="window-title">Calendario</span>
        </div>
        <div class="window-content">
            <div class="calendar-header">
                <button id="prev-month">⬅️</button>
                <h2 id="month-year"></h2>
                <button id="next-month">➡️</button>
            </div>
            <div id="calendar"></div>
        </div>
    `;
    document.body.appendChild(calendarWindow);
    makeWindowDraggable(calendarWindow);
    // Botones de ventana
    const closeBtn = calendarWindow.querySelector('.close-btn');
    const minBtn = calendarWindow.querySelector('.min-btn');
    const maxBtn = calendarWindow.querySelector('.max-btn');
    closeBtn.addEventListener('click', () => {
        calendarWindow.style.display = 'none';
    });
    minBtn.addEventListener('click', () => {
        calendarWindow.style.display = 'none';
    });
    maxBtn.addEventListener('click', () => {
        if (calendarWindow.classList.contains('maximized')) {
            calendarWindow.classList.remove('maximized');
            calendarWindow.style.width = '500px';
            calendarWindow.style.height = 'auto';
        } else {
            calendarWindow.classList.add('maximized');
        }
    });
    // Lógica de calendario
    const calendar = calendarWindow.querySelector('#calendar');
    const monthYear = calendarWindow.querySelector('#month-year');
    const prevBtn = calendarWindow.querySelector('#prev-month');
    const nextBtn = calendarWindow.querySelector('#next-month');
    let currentDate = new Date();
    let eventsData = [];
    function updateCal() {
        renderCalendar(calendar, monthYear, eventsData, currentDate);
    }
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCal();
    });
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCal();
    });
        // Eventos embebidos directamente
        eventsData = [
            { "date": "2025-08-15", "title": "Fiesta Nacional" },
            { "date": "2025-08-20", "title": "Reunión de equipo" },
            { "date": "2025-09-05", "title": "Presentación de proyecto" },
            { "date": "2025-09-25", "title": "Cumpleaños de Ana" }
        ];
        updateCal();
}

// Menú para abrir calendario
const calendarMenu = document.getElementById('calendar-menu');
if (calendarMenu) {
    calendarMenu.addEventListener('click', openCalendarWindow);
}


// Funcion para crear chat
function openChatWindow() {
    let chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        chatWindow.style.display = 'block';
        return;
    }
    chatWindow = document.createElement('div');
    chatWindow.className = 'window';
    chatWindow.id = 'chat-window';
    chatWindow.style.top = '100px';
    chatWindow.style.left = '100px';
    chatWindow.style.width = '600px';
    chatWindow.style.height = 'auto';
    chatWindow.innerHTML = `
        <div class="window-header">
            <div class="window-buttons">
                <button class="close-btn"></button>
                <button class="min-btn"></button>
                <button class="max-btn"></button>
            </div>
            <span class="window-title">Chat</span>
        </div>
        <div class="window-content">
            
            <iframe src="https://chat-git-main-juan-ulises-projects.vercel.app/"></iframe>
            <div id="chat"></div>
        </div>
    `;
    document.body.appendChild(chatWindow);
    makeWindowDraggable(chatWindow);
    // Botones de ventana
    const closeBtn = chatWindow.querySelector('.close-btn');
    const minBtn = chatWindow.querySelector('.min-btn');
    const maxBtn = chatWindow.querySelector('.max-btn');
    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });
    minBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });
    maxBtn.addEventListener('click', () => {
        if (chatWindow.classList.contains('maximized')) {
            chatWindow.classList.remove('maximized');
            chatWindow.style.width = '500px';
            chatWindow.style.height = 'auto';
        } else {
            chatWindow.classList.add('maximized');
        }
    });
}

// Menú para abrir chat
const chatMenu = document.getElementById('chat-menu');
if (chatMenu) {
    chatMenu.addEventListener('click', openChatWindow);
}





function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('date-display').textContent = now.toLocaleDateString('es-ES', options);
}
setInterval(updateDateTime, 1000);
updateDateTime();


// --- Ventana principal ---
const windowEl = document.getElementById('main-window');
const closeBtn = windowEl.querySelector('.close-btn');
const maxBtn = windowEl.querySelector('.max-btn');
const minBtn = windowEl.querySelector('.min-btn');
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

// --- Arrastrar ventanas ---
function makeWindowDraggable(win) {
    const header = win.querySelector('.window-header');
    let isDragging = false, offsetX = 0, offsetY = 0;
    header.addEventListener('mousedown', function(e) {
        if (e.target.closest('.window-buttons')) return; // No arrastrar desde botones
        isDragging = true;
        const rect = win.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            win.style.left = (e.clientX - offsetX) + 'px';
            win.style.top = (e.clientY - offsetY) + 'px';
        }
    });
    document.addEventListener('mouseup', function() {
        isDragging = false;
        document.body.style.userSelect = '';
    });
}

document.querySelectorAll('.window').forEach(makeWindowDraggable);
