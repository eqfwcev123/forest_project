// page 2 시작

let num = 0;
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
// Dom
const $date = document.querySelector(".date");
const $decreaseButton = document.querySelector(".decreaseButton");
const $increaseButton = document.querySelector(".increaseButton");
const $totalTime = document.querySelector(".totalTime");
// 이벤트 함수
function render() {
  if (month > 12) {
    year++;
    month = month - 12;
  }
  if (month < 1) {
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
  axios.get("http://localhost:5100/login")
    .then(result => result = result.data)
    .then(result => result = result[0].time)
    .then(result => result.reduce((acc,cur) =>acc+cur.dateTime,0))
    .then(result => console.log(result))
}
//이벤트
$decreaseButton.onclick = decreaseButtonClick;
$increaseButton.onclick = increaseButtonClick;
window.onload = setcumulativeTime;
// page 2 끝

