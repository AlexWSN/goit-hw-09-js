import Notiflix from 'notiflix';

// Funcția care creează o promisiune
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3; // 70% șanse să fie îndeplinită
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Promisiune îndeplinită
      } else {
        reject({ position, delay }); // Promisiune respinsă
      }
    }, delay);
  });
}

// Selectează elementele din formular
const form = document.querySelector('.form');
const inputDelay = form.querySelector('input[name="delay"]');
const inputStep = form.querySelector('input[name="step"]');
const inputAmount = form.querySelector('input[name="amount"]');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne trimiterea formularului

  const firstDelay = Number(inputDelay.value); // Primul delay
  const step = Number(inputStep.value); // Pașii între promisiuni
  const amount = Number(inputAmount.value); // Numărul de promisiuni de creat

  // Crează promisiunile
  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + step * (i - 1); // Calculăm delay-ul pentru fiecare promisiune

    createPromise(i, delay)
      .then(({ position, delay }) => {
        // Mesaj de succes cu Notiflix
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Mesaj de eroare cu Notiflix
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
