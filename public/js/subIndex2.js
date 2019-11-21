// DOM Start
const $date = document.querySelector(".date");
const $decreaseButton = document.querySelector(".decreaseButton");
const $increaseButton = document.querySelector(".increaseButton");
const $totalTime = document.querySelector(".totalTime");
// DOM Finish

// Variable Start
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
// Variable Stop

// function declaration Start
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
// function declaration Finish

// Event Function Start
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
    .then(result => $totalTime.textContent = `Total Time: ${result}`)
}
// Event Function Finish

// Event Handler Start
$decreaseButton.onclick = decreaseButtonClick;
$increaseButton.onclick = increaseButtonClick;
window.onload = setcumulativeTime;
// Event Handler Stop

