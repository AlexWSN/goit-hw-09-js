import flatpickr from "flatpickr"; // Import biblioteca flatpickr pentru selectarea datei
import "flatpickr/dist/flatpickr.min.css"; // Import stilurile pentru flatpickr

// Selectăm elementele din DOM
const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownInterval; // Variabila pentru intervalul de numărătoare inversă

// Funcția care convertește milisecundele în zile, ore, minute și secunde
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Funcția care adaugă un 0 în fața valorilor care au mai puțin de 2 caractere
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Funcția care actualizează timerul pe ecran
function updateTimer({ days, hours, minutes, seconds }) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

// Inițializarea flatpickr pentru inputul de dată
flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), // Data curentă
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    // Dacă utilizatorul selectează o dată din trecut, afișăm un mesaj de alertă
    if (selectedDate < currentDate) {
      alert("Te rog să alegi o dată în viitor!");
    } else {
      // Permitem butonului "Start" să devină activ
      startButton.disabled = false;
    }
  },
});

// Evenimentul "click" pentru butonul "Start"
startButton.addEventListener('click', () => {
  const endDate = new Date(datetimePicker.value);
  const currentDate = new Date();

  // Calcul timp rămas
  const timeRemaining = endDate - currentDate;

  if (timeRemaining <= 0) {
    alert("Data selectată a trecut deja!");
    return;
  }

  // Dezactivez butonul "Start" când timerul începe
  startButton.disabled = true;

  // Actualizez timerul la fiecare secundă
  countdownInterval = setInterval(() => {
    const timeLeft = endDate - new Date();

    if (timeLeft <= 0) {
      // Opresc timerul când ajunge la 00:00:00:00
      clearInterval(countdownInterval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      alert("Timpul a expirat!");
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimer({ days, hours, minutes, seconds });
    }
  }, 1000);
});
