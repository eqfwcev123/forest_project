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
let secondNum = 0; 
let buttonStatus = "ready";
let timer;
let minuteStr = " ";
let fixedRangeValueNum = 0;
// Variable Stop

// Event Function Start
function buttonClick(e){
  if(secondNum === 0){
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
    $stopButton.classList.remove('displayNone');
    timer = setInterval(timerFunc, 10);
  }else if(button.classList.contains('stopButton')){
    $titleTextImg.src = "./img/titleText04.png";
    $rangeSliderBackground.style.width = '0';
    $timerDisplay.textContent = minuteStr.length === 1 ? `0${fixedRangeValueNum}:00`:`${fixedRangeValueNum}:00`;
    $treeImg.src = "./img/mainImg07.png";
    buttonStatus = "stop";
    startButton.classList.remove('displayNone');
    clearInterval(timer);
    secondNum = fixedRangeValueNum * 60;
  }
}

function setMinute(e){
  if(buttonStatus === "start") {
    $rangeSlider.value = `${fixedRangeValueNum}`;
    return;
  }
  
  minuteStr = e.target.value;
  fixedRangeValueNum = +minuteStr;
  secondNum = +minuteStr * 60;
  
  $treeImg.src = `./img/mainImg0${Math.floor(+minuteStr/20)+1}.png`;
  $timerDisplay.textContent = minuteStr.length === 1 ? `0${minuteStr}:00` : `${minuteStr}:00`;
  $rangeSliderBackground.style.width = '0';
}

function mouseleaveFromBody(){
  if(buttonStatus === "ready" || buttonStatus === "stop") return;
  $startButton.classList.remove('displayNone');
  $stopButton.classList.add('displayNone');
  $titleTextImg.src = "img/titleText04.png";
  $rangeSliderBackground.style.width = "0";
  $timerDisplay.textContent = minuteStr.length === 1? `0${fixedRangeValueNum}:00` : `${fixedRangeValueNum}:00`;
  $treeImg.src = "./img/mainImg07.png";
  buttonStatus = "stop";
  secondNum = fixedRangeValueNum * 60;
  clearInterval(timer);
}
// Event Function Finish

// function declaration Start
function timerFunc() {
  secondNum--;

  $timerDisplay.textContent = `${Math.floor(secondNum/60) >= 10 ? Math.floor(secondNum/60) : '0' + Math.floor(secondNum/60)}:${secondNum%60 >= 10 ? Math.floor(secondNum%60) : '0' + Math.floor(secondNum%60)}`;
  // $rangeSliderBackground.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum - Math.floor(secondNum/60)})`
  $rangeSliderBackground.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum - Math.floor(secondNum/60)})`

  if(Math.floor(secondNum/60) === 0 && secondNum%60 === 0){
    let result = 0;
    $startButton.classList.remove('displayNone');
    $stopButton.classList.add('displayNone');
    $titleTextImg.src = "./img/titleText03.png";
    $timerDisplay.textContent = fixedRangeValueNum >= 10 ? `${fixedRangeValueNum}:00` : `0${fixedRangeValueNum}:00`;
    secondNum = fixedRangeValueNum * 60;
    axios.get("http://localhost:5100/login")
      .then(res => result = res.data)
      .then(result => result = result[0].time)
      .then(result => result += fixedRangeValueNum)
      .then(result => axios.patch("http://localhost:5100/login",{id:1,time:result}))
      .catch(err => console.error(err))
    clearInterval(timer);
    buttonStatus = 'stop';
    return;
  }
  
}
// function declaration Finish

// Event Handler Start
$buttons.onclick = buttonClick;
$body.onmouseleave = mouseleaveFromBody;
$rangeSlider.oninput = setMinute;
// Event Handler Stop