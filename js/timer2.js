// $container.addEventListener('mouseleave',e => {
//   // if ($outerDiv.classList.contains("container")) return;
//   console.log(1);
// })

//Range Slider
let $slider = document.querySelector(".slider");
let $output = document.querySelector(".demo");
const $display = document.querySelector(".display");
const $btn = document.querySelector(".button");

let myInterval = 0;
let isTrue = true;

// 시간 초기값. 만약에 사용자가 시간을 건드리지 않고 15분 동안만 컴퓨터를 사용하지 않을 경우 15분을 그대로 사용한다
let minute = 15;
let second = 60;

// $output.innerHTML = $rangeSlider.value;
// TODO: 이부분은 상관없다
$slider.oninput = e => {
  minute = e.currentTarget.value;
  $display.innerHTML = `${minute}:00`;
};

// 시계
function minusSecond() {
  second -= 1;
  if (second === 0) {
    minute -= 1;
    second = 60;
  }
  $display.innerHTML = `${minute < 10 ? `0${minute - 1}` : minute - 1} : ${
    second < 10 ? `0${second}` : second
  }`;
}

$btn.addEventListener("click", () => {
  if (isTrue) {
    myInterval = setInterval(minusSecond, 1000);
    isTrue = false;
  } else {
    clearInterval(myInterval);
    isTrue = true;
  }
});
