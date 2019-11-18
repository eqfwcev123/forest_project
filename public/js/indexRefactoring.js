// DOM Start
const $body = document.querySelector('.body');
const $titleTextImg = document.querySelector('.titleTextImg');
const $treeImg = document.querySelector('.treeImg');
const $timerDisplay = document.querySelector('.stopWatch > div');
const $rangeSlider = document.querySelector('.range');
const $rangeSliderBackground = document.querySelector('.rangeSliderBackground');
const $buttons = document.querySelector('.btn');
const $startButton = document.querySelector('.startButton');
const $stopButton = document.querySelector('.stopButton');
// DOM Finish

// Variable Start
let secondNum; 
let buttonStatus;
let timer;
// Variable Stop

// Event Function Start
function buttonClick(e){
  if(!secondNum){
    $titleTextImg.src = "./img/titleText01.png";
    return;
  }

  let button = e.target;
  let startButton = button.previousElementSibling;
  let stopButton = button.nextElementsibling;

  button.classList.add('displayNone');

  if(button.classList.contains('startButton')){
    $titleTextImg.src = './img/titleText02.png';
    $treeImg.src = `./img/mainImg0${Math.floor(fixedRangeValueNum/20)+1}.png`; 
    buttonStatus = "start";
    stopButton.classList.remove('displayNone');
    timer = setInterval(timerFunc, 10);
  }else if(button.classList.contains('.stopButton')){
    $titleTextImg.src = "./img/titleText04.png";
    $rangeSliderBackground.style.width = '0';
    $timerDisplay.textContent = minuteStr.length === 1 ? `0${fixedRangeValueNum}:00`:`${fixedRangeValueNum}:00`;
    $treeImg.src = "./img/mainImg06.png";
    buttonStatus = "stop";
    startButton.classList.remove('displayNone');
    clearInterval(timer);
    secondNum = fixedRangeValueNum * 60;
  }
}

function setMinute(e){
  if(buttonstatus === "start") {
    $rangeSlider.value = `${fixedRangeValueNum}`;
    return;
  }
  
  minuteStr = e.target.value;
  fixedRangeValueNum = +minuteStr;
  secondNum = +minuteStr * 60;
  
  $treeImg.src = `./img/mainImg0${Math.floor(+minuteStr/20)+1}.png`;
  $timerDisplay.textContent = minuteStr.length === 1 ? `0{minuteStr}:00` : `${minuteStr}:00`;
  $rangeSliderBackground.style.width = '0';
}

// Event Function Finish

// function declaration Start
function timerFunc() {
  $timerDisplay.textContent = `${Math.floor(secondNum/60) >= 10 ? Math.floor(secondNum/60) : '0' + Math.floor(secondNum/60)}:${secondNum%60 >= 10 ? Math.floor(secondNum%60) : '0' + Math.floor(secondNum%60)}`;
  $rangeSliderBackground.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum - Math.floor(secondNum/60)})`

  if(Math.floor(secondNum/60) === 0 && secondNum%60 === 0){
    $startButton.classList.remove('displayNone');
    $stopButton.classList.add('displayNone');
    $titleTextImg.src = "./img/titleText03.png";
    $timerDisplay.textContent = fixedRangeValueNum >= 10 ? `${fixedRangeValueNum}:00` : `0${fixedRangeValueNum}:00`;
    secondNum = fixedRangeValueNum * 60;
    clearInterval(timer);
    buttonStatus = 'stop';
    return;
  }
  second--;
}
// function declaration Finish




// Event Handler Start
$buttons.onclick = buttonClick;
// $rangeSlider.oninput = setMinute;
// Event Handler Stop