const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentDate = new Date();
let eventsData = [];

// Función principal
function renderCalendar(year, month) {
    calendar.innerHTML = "";

    // Encabezados de días
    const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    daysOfWeek.forEach(day => {
        const div = document.createElement("div");
        div.classList.add("day-name");
        div.textContent = day;
        calendar.appendChild(div);
    });

    // Día de la semana del 1er día del mes
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    // Ajustar inicio (lunes = 1)
    let startIndex = firstDay === 0 ? 6 : firstDay - 1;

    // Huecos antes del primer día
    for (let i = 0; i < startIndex; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const div = document.createElement("div");
        div.classList.add("day");
        div.textContent = day;

        const event = eventsData.find(e => e.date === dateStr);
        if (event) {
            div.classList.add("event");
            div.title = event.title;
        }

        calendar.appendChild(div);
    }

    // Título
    monthYear.textContent = `${monthNames[month]} ${year}`;
}

// Cambiar mes
prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Cargar eventos y mostrar
fetch("events.json")
    .then(res => res.json())
    .then(data => {
        eventsData = data;
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    })
    .catch(err => console.error("Error cargando eventos:", err));
