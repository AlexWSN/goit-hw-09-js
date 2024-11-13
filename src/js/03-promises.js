import Notiflix from 'notiflix';


// Selectează elementele din formular
const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

// Funcția care creează o promisiune
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3; 

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); 
      } else {
        reject({ position, delay }); 
      }
    }, delay); 
  });
}

// Funcția pentru formatarea numărului de două caractere
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Gestionarea evenimentului de submit al formularului
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obține valorile din formular
  let delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);

  // Dezactivează butonul pentru a preveni trimiterea multiplă
  const button = form.querySelector('button');
  button.disabled = true;

  // Creează promisiunile în funcție de cantitatea introdusă
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // Afișează mesaj de succes cu notiflix sau console.log
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Afișează mesaj de eșec cu notiflix sau console.log
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    // Crește delay-ul pentru următoarea promisiune
    delay += step;
  }

  // Reactivarea butonului după ce s-au creat toate promisiunile
  button.disabled = false;

  // Curăță câmpurile formularului
  form.reset();
});
