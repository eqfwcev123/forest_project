//   // if ($outerDiv.classList.contains("container")) return;
// $container.addEventListener('mouseleave',e => {
//   console.log(1);
// })

//Range Slider
let $range = document.querySelector(".range"); // input요소
const $display = document.querySelector(".display");
const $btn = document.querySelector(".buttonStart"); // 버튼 요소
const $imageList = document.querySelector(".imgProject");

let myInterval = 0;
let isTrue = true;
let numToRemember = 0;
// 시간 초기값. 만약에 사용자가 시간을 건드리지 않고 15분 동안만 컴퓨터를 사용하지 않을 경우 15분을 그대로 사용한다
let minute = 15;
let second = 0;

// $output.innerHTML = $rangeSlider.value;
// TODO: 이부분은 상관없다

// 드래그로 분 설정 하는곳 minute 변수에 숫자 설정
$range.oninput = e => {
  if (isTrue === false) {
    e.currentTarget.value = minute;
    return;
  }
  minute = e.currentTarget.value;
  $display.innerHTML = `${minute}:00`;

  // TODO 슬라이더를 땡기면 시간이 이미지가 변하게된다.
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

  



};

// 시계
function minusSecond() {
  if (second === 0) {
    minute -= 1;
    second = 60;
  }
  second -= 1;

  $display.innerHTML = `${minute < 10 ? `0${minute}` : minute}:${
    second < 10 ? `0${second}` : second
  }`;

  console.log("[type,minute]", typeof minute, minute, typeof second, second);
  console.log(second === 0);
  console.log(minute === 0);

  if (second === 0 && minute === 0) {
    console.log("stop");
    clearInterval(myInterval);
    isTrue = true;
    $display.innerHTML = `${numToRemember}:00`;
    minute = numToRemember;
    $slider.value = numToRemember;
  }
}

$btn.addEventListener("click", () => {
  if (isTrue) {
    myInterval = setInterval(minusSecond, 1000);
    numToRemember = minute;
    isTrue = false;
  } else {
    clearInterval(myInterval);
    isTrue = true;
  }
});
