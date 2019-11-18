// DOM
let $oneOfButtons = document.querySelector('.btn'); // button 두개
let $rangeSlider = document.querySelector('.range'); // slider 
let $background = document.querySelector('.background');
let $displayTimer = document.querySelector('.stopWatch > div');
let $buttonStart = document.querySelector('.buttonStart');
let $buttonStop = document.querySelector('.buttonStop');
let $treeImg = document.querySelector('.treeImg');
let $titleText = document.querySelector('.titleText');
let $body = document.querySelector('.body');

// 변수
let timer; // setTimer
let secondNum = 0;
let minuteStr =' ';
let fixedRangeValueNum = 0;
let buttonstatus = "ready";

var cumulativeTime = 0;

// 이벤트 핸들러의 함수 정의

function buttonClick(e) { // 버튼 클릭시 
  let button = e.target;
  let startButton = button.previousElementSibling;
  let stopButton = button.nextElementSibling;
  
  if(secondNum === 0){
    $titleText.src = "img/titleText01.png";
    return;
  }

  button.classList.add('displayNone');

  if(button.classList.contains('buttonStart')) {
    stopButton.classList.remove('displayNone');

    

    $titleText.src = "img/titleText02.png";
    // 타이머
    buttonstatus = "start";
    timer = setInterval(timerFunc, 10); // timer 함수 실행
    // 타이머
    $treeImg.src = `img/mainImg0${Math.floor(fixedRangeValueNum/20)+1}.png`;

  } else if(button.classList.contains('buttonStop')){
    startButton.classList.remove('displayNone');
    buttonstatus = "stop";
  
    $titleText.src = "img/titleText04.png";

    $background.style.width = "0";
    secondNum = fixedRangeValueNum * 60;
    $displayTimer.textContent = minuteStr.length === 1 ? `0${fixedRangeValueNum}:00` : `${fixedRangeValueNum}:00`;
    
    $treeImg.src = "img/mainImg06.png";
    // 타이머
    clearInterval(timer);
    // 타이머
  }
}

function setMinute(e){
  if(buttonstatus === "start") {
    $rangeSlider.value = `${fixedRangeValueNum}`;
    return;
  }

  if (+e.currentTarget.value <= 19) {
    $treeImg.src = "img/mainImg01.png";
  }
  if (+e.currentTarget.value >= 20 && +e.currentTarget.value <= 39) {
    $treeImg.src = "img/mainImg02.png";
  }
  if (+e.currentTarget.value > 39 && +e.currentTarget.value <= 59) {
    $treeImg.src = "img/mainImg03.png";
    
  }
  if (+e.currentTarget.value > 59 && +e.currentTarget.value <= 79) {
    $treeImg.src = "img/mainImg04.png";

  }
  if (+e.currentTarget.value > 79 && +e.currentTarget.value <= 99) {
    $treeImg.src = "img/mainImg05.png";
  }
  $background.style.width = '0';

  minuteStr = e.target.value;
  fixedRangeValueNum = +minuteStr;
  secondNum = +minuteStr * 60;
  $displayTimer.textContent = minuteStr.length === 1 ? `0${minuteStr}:00` : `${minuteStr}:00`;
}

// 1초마다 실행되는 함수
function timerFunc() {
  
  $displayTimer.textContent =  Math.floor(secondNum/60) > 10 ? `${Math.floor(secondNum/60)}:${secondNum%60}` : `0${Math.floor(secondNum/60)}:${secondNum%60}`;
  
  if(Math.floor(secondNum/60) >= 10 && Math.floor(secondNum%60) >= 10)
  {
    $displayTimer.textContent = `${Math.floor(secondNum/60)}:${secondNum%60}`;
  }
  else if(Math.floor(secondNum/60) >= 10 && Math.floor(secondNum%60) <= 10)
  {
    $displayTimer.textContent = `${Math.floor(secondNum/60)}:0${secondNum%60}`;
  }
  else if(Math.floor(secondNum/60) < 10 && Math.floor(secondNum%60) < 10)
  {
    $displayTimer.textContent = `0${Math.floor(secondNum/60)}:0${secondNum%60}`;
  }
  else if(Math.floor(secondNum/60) < 10 && Math.floor(secondNum%60) > 10)
  {
    $displayTimer.textContent = `0${Math.floor(secondNum/60)}:${secondNum%60}`;
  }
  
  $background.style.width = `calc(calc(calc(100% - 136px)/100 * ${Math.floor(secondNum/60)} + 34px * ${Math.floor(secondNum/60)})`;
  $background.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum - Math.floor(secondNum/60)})`
  // $background.style.width = `calc(calc(100% - 136px)/3 * ${e.target.value} + 34px * ${e.target.value})`;
  
  if(Math.floor(secondNum/60) === 0 && secondNum%60 === 0){
    clearInterval(timer);

    

    $buttonStart.classList.remove('displayNone');
    $buttonStop.classList.add('displayNone');
    buttonstatus = "stop";
    secondNum = + fixedRangeValueNum * 60;

    $titleText.src = "img/titleText03.png";

    $displayTimer.textContent = fixedRangeValueNum >= 10 ? `${fixedRangeValueNum}:00` : `0${fixedRangeValueNum}:00`;
    
    cumulativeTime += fixedRangeValueNum;
    
    return;
  }
  secondNum = secondNum - 1;
}

function bodyonmouseleave() {
  $buttonStart.classList.remove('displayNone');
  $buttonStop.classList.add('displayNone');  
  buttonstatus = "stop";
  
    $titleText.src = "img/titleText04.png";

    $background.style.width = "0";
    secondNum = fixedRangeValueNum * 60;
    $displayTimer.textContent = minuteStr.length === 1 ? `0${fixedRangeValueNum}:00` : `${fixedRangeValueNum}:00`;
    $treeImg.src = "img/mainImg06.png";
    // 타이머
    clearInterval(timer);
}

// 이벤트 핸들러
$oneOfButtons.onclick = buttonClick; // 버튼두개중 한개가 클릭되면
$rangeSlider.oninput = setMinute; // slider 입력이 들어오면
$body.onmouseleave = bodyonmouseleave;
export{cumulativeTime};