import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const startBtn = document.querySelector('button');

startBtn.disabled = false;

form.addEventListener('submit', onSubmit);

function onSubmit(number) {
  number.preventDefault();

  let delay = Number(number.currentTarget.delay.value);
  let step = Number(number.currentTarget.step.value);
  let amount = Number(number.currentTarget.amount.value);

   for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })

    delay += step;
  } 

  number.currentTarget.reset();

  startBtn.disabled = true;
  setTimeout(function () {
    startBtn.disabled = false;
  }, delay)

}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
};

