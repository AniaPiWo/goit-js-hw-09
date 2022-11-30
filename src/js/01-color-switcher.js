function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');
  const bodyColor = document.querySelector('body');
  let timerId;
  
  stopBtn.disabled = true;
  
  startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
      bodyColor.style.backgroundColor = getRandomHexColor();
      console.log(bodyColor.style.backgroundColor)
    }, 1000);
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });
  
  stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

 
