// DOM

let $stopwatchDisplay = document.querySelector('.stopWatch > div'); // 스탑워치를 표시할 display
let $oneOfButtons = document.querySelector('.btn'); // button 두개
let $rangeSlider = document.querySelector('.range'); // slider 
let $background = document.querySelector('.background');
let $displayTimer = document.querySelector('.stopWatch > div');
let $buttonStart = document.querySelector('.buttonStart');
let $buttonStop = document.querySelector('.buttonStop');
const $imageList = document.querySelector(".imgProject");

// 변수
let timer; // setTimer
let secondNum = 0;
let minuteStr;
let decidedsecond;
let fixedRangeValueNum = 0;
let buttonstatus = "stop";

// 이벤트 핸들러의 함수 정의

function buttonClick(e) { // 버튼 클릭시 
  let button = e.target;
  let startButton = button.previousElementSibling;
  let stopButton = button.nextElementSibling;
  

  button.classList.add('displayNone');

  if(button.classList.contains('buttonStart')) {
    stopButton.classList.remove('displayNone');

    // 타이머
    buttonstatus = "start";
    timer = setInterval(timerFunc, 10); // timer 함수 실행
    // 타이머

  } else if(button.classList.contains('buttonStop')){
    startButton.classList.remove('displayNone');
    buttonstatus = "stop";

  
    $background.style.width = "0";
  secondNum = fixedRangeValueNum * 60;
  $displayTimer.textContent = minuteStr.length === 1 ? `0${fixedRangeValueNum}:00` : `${fixedRangeValueNum}:00`;
    
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
    console.log($imageList.children[0]);
    $imageList.children[0].style.opacity = "1";
  }
  if (+e.currentTarget.value >= 20 && +e.currentTarget.value <= 39) {
    $imageList.children[0].style.opacity = '0';
    $imageList.children[0].style.transition = 'opacity 1s';
    $imageList.children[1].style.opacity = "1";
  }
  if (+e.currentTarget.value > 39 && +e.currentTarget.value <= 59) {
    $imageList.children[1].style.opacity = "0";
    $imageList.children[1].style.transition = "opacity 1s";
    $imageList.children[2].style.opacity = "1";
  }
  if (+e.currentTarget.value > 59 && +e.currentTarget.value <= 79) {
    $imageList.children[2].style.opacity = "0";
    $imageList.children[2].style.transition = "opacity 1s";
    $imageList.children[3].style.opacity = "1";
  }
  if (+e.currentTarget.value > 79 && +e.currentTarget.value <= 99) {
    $imageList.children[3].style.opacity = "0";
    $imageList.children[3].style.transition = "opacity 1s";
    $imageList.children[4].style.opacity = "1";
  }



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
  ////
  // $background.style.width = `calc(calc(100% - 136px)/100 * ${Math.floor(secondNum/60)} + 34px * ${Math.floor})`

  $background.style.width = `calc(calc(calc(100% - 136px)/100 * ${Math.floor(secondNum/60)} + 34px * ${Math.floor(secondNum/60)})`;
  $background.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum - Math.floor(secondNum/60)})`
  // $background.style.width = `calc(calc(100% - 136px)/3 * ${e.target.value} + 34px * ${e.target.value})`;
  
  if(Math.floor(secondNum/60) === 0 && secondNum%60 === 0){
    clearInterval(timer);
    $buttonStart.classList.remove('displayNone');
    $buttonStop.classList.add('displayNone');
    buttonstatus = "stop";
    secondNum = + fixedRangeValueNum * 60;

    $displayTimer.textContent = fixedRangeValueNum >= 10 ? `${fixedRangeValueNum}:00` : `0${fixedRangeValueNum}:00`;
    return;
  }
  secondNum = secondNum - 1;
}



// 이벤트 핸들러
$oneOfButtons.onclick = buttonClick; // 버튼두개중 한개가 클릭되면
$rangeSlider.oninput = setMinute; // slider 입력이 들어오면
