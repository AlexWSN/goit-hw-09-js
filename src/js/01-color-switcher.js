
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

// reține ID-ul intervalului
let colorInterval = null;

// Generare culori gradient
function getRandomGradient() {
  const color1 = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  const color2 = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  return `linear-gradient(45deg, ${color1}, ${color2})`;
}

// Event listener pentru butonul "Start"
startButton.addEventListener('click', () => {
  // Dezactivează butonul "Start" și activează butonul "Stop"
  startButton.disabled = true;
  stopButton.disabled = false;

  // Setează un interval pentru a schimba culoarea fundalului cu gradient la fiecare secundă
  colorInterval = setInterval(() => {
    document.body.style.background = getRandomGradient();
  }, 1000);
});

// Event listener pentru butonul "Stop"
stopButton.addEventListener('click', () => {
  // Dezactivează butonul "Stop" și activează butonul "Start"
  stopButton.disabled = true;
  startButton.disabled = false;

  // Oprește intervalul de schimbare a culorii
  clearInterval(colorInterval);
});

