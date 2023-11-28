import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const form = document.querySelector('.form');

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

form.addEventListener('submit', async e => {
  e.preventDefault();

  const delay = parseInt(document.querySelector('#delay').value, 10);
  const step = parseInt(document.querySelector('#step').value, 10);
  const amount = parseInt(document.querySelector('#amount').value, 10);

  /*   console.log(typeof delay);
  console.log(typeof step);
  console.log(typeof amount); */

  for (let i = 1; i <= amount; i++) {
    try {
      const position = i;
      const result = await createPromise(position, delay);

      Notify.success(
        `Fulfilled promise ${result.position} in ${result.delay}ms`
      );
    } catch (error) {
      Notify.failure(
        `Rejected promise ${error.position} in ${error.delay}ms`
      );
    }
  }
});
