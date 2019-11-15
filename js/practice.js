// $container.addEventListener('mouseleave',e => {
//   // if ($outerDiv.classList.contains("container")) return;
//   console.log(1);
// })

//Range Slider
let $slider = document.querySelector(".slider"); // input요소
const $display = document.querySelector(".display");
const $btn = document.querySelector(".button"); // 버튼 요소

let myInterval = 0;
let isTrue = true;
let numToRemember = 0;
// 시간 초기값. 만약에 사용자가 시간을 건드리지 않고 15분 동안만 컴퓨터를 사용하지 않을 경우 15분을 그대로 사용한다
let minute = 15;
let second = 0;

// $output.innerHTML = $rangeSlider.value;
// TODO: 이부분은 상관없다

// 드래그로 분 설정 하는곳 minute 변수에 숫자 설정
$slider.oninput = e => {

  if(isTrue === false){
    e.currentTarget.value = minute;
    return;
  }

  minute = e.currentTarget.value;
  $display.innerHTML = `${minute}:00`;
};

// 시계
function minusSecond() {
  
  if (second === 0) {
    minute -= 1;
    second = 60;
  }
  second -= 1;

  $display.innerHTML = `${minute < 10 ?`0${minute}`:minute}:${second < 10 ?`0${second}`:second}`;
   
  console.log('[type,minute]',typeof minute,minute,typeof second, second);
  console.log(second===0);
  console.log(minute===0);

  if((second===0) && (minute === 0)) {
    console.log('stop');
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

