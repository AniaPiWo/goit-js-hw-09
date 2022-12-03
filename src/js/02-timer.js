import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('input');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let selectedDate;
let intervalId;

startBtn.addEventListener('click', start);

startBtn.disabled = true;

function convertMs(ms) {
    // Number of milliseconds per unit of time
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
  
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//choose future date
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0].getTime() < Date.now()) {
            return Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            Notiflix.Notify.success('The selected date is valid!');
  
        startBtn.disabled = false;
        selectedDate = selectedDates[0].getTime();
      }
    }
};
const calendar = flatpickr('#datetime-picker', options);

function start() {
    const startTime = selectedDate;

    startBtn.disabled = true;
    input.disabled = true;
   
    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        
        if (deltaTime < 0) {
            clearInterval(intervalId);
            return;
        }     

        onclick  = (event) => {Notiflix.Notify.warning('The counter is running. Refresh page to enter the new date!') };
        
        updateTimer({ days, hours, minutes, seconds });
    }, 1000);
};

function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${ days }`;
    dataHours.textContent = `${ hours }`;
    dataMinutes.textContent = `${ minutes }`;
    dataSeconds.textContent = `${ seconds }`;
};
  
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
  

