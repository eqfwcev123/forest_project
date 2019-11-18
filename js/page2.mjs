// page 2 시작

// import {cumulativeTime} from './index.mjs';

let num = 0;
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;

// Dom
$date = document.querySelector('.date');
$decreaseButton = document.querySelector('.decreaseButton');
$increaseButton = document.querySelector('.increaseButton');
$totalTime = document.querySelector('.totalTime');

// 이벤트 함수
function render() {
  if(month > 12){
    year++;
    month = month - 12;
  }
  if(month < 1){
    year--;
    month = 12;
  }


  $date.textContent = `${year}년 ${month < 10 ? "0" + month : month}월`;
}

function decreaseButtonClick() {
  month--;
  render();
}

function increaseButtonClick() {
  month++;
  render();
}

function setcumulativeTime() {
  $totalTime.textContent = `${cumulativeTime}`;
}

//이벤트
$decreaseButton.onclick = decreaseButtonClick;
$increaseButton.onclick = increaseButtonClick;
window.onload = setcumulativeTime;


// page 2 끝