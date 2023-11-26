import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/common.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const daysOutput = document.querySelector('#days');
const hoursOutput = document.querySelector('#hours');
const minutesOutput = document.querySelector('#minutes');
const secondsOutput = document.querySelector('#seconds');

let selectedDate = null;
let timerId = null; // Declare timerId outside the click event to access it later

startBtn.disabled = true;
stopBtn.disabled = true;

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

const selectedDateUpdate = () => {
  const { days, hours, minutes, seconds } = convertMs(
    selectedDate - Date.now()
  );
  daysOutput.textContent = days;
  hoursOutput.textContent = hours.toString().padStart(2, '0');
  minutesOutput.textContent = minutes.toString().padStart(2, '0');
  secondsOutput.textContent = seconds.toString().padStart(2, '0');
};

const counterReset = () => {
  clearInterval(timerId);
  daysOutput.textContent = '0';
  hoursOutput.textContent = '00';
  minutesOutput.textContent = '00';
  secondsOutput.textContent = '00';
};

// Style customization
input.classList.add('flatpickr-input');

// Date picker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (Date.now() < selectedDate) {
      startBtn.disabled = false;
      selectedDateUpdate();
    } else {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', () => {
  Notify.success('Countdown starts!');

  timerId = setInterval(() => {
    selectedDateUpdate();
    if (Date.now() > selectedDate) {
      clearInterval(timerId);
      counterReset();
      Notify.success('Countdown finished!');
    }
  }, 1000);

  input.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;

  stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    counterReset();
    selectedDate = null;
    Notify.failure('Countdown interrupted!');
    input.disabled = false;
    startBtn.disabled = true;
    stopBtn.disabled = true;
  });
});
