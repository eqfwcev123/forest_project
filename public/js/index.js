// DOM Start
const $body = document.querySelector(".body");
const $titleTextImg = document.querySelector(".titleTextImg");
const $treeImg = document.querySelector(".treeImg");
const $timerDisplay = document.querySelector(".stopWatch > div");
const $rangeSlider = document.querySelector(".range");
const $rangeSliderBackground = document.querySelector(".rangeSliderBackground");
const $buttons = document.querySelector(".btn");
const $startButton = document.querySelector(".startButton");
const $stopButton = document.querySelector(".stopButton");
const $dateButton = document.querySelector(".dateButton");
// DOM Finish

// Variable Start
let secondNum = 0;
let buttonStatus = "ready";
let timer;
let minuteStr = " ";
let fixedRangeValueNum = 0;
let date = new Date().getDate();
// Variable Stop

// Event Function Start
function buttonClick(e) {
  if (secondNum === 0) {
    $titleTextImg.src = "./img/titleText01.png";
    return;
  }

  let button = e.target;

  button.classList.add("displayNone"); // 클릭하면 시작버튼/종료버튼을 숨김

  if (button.classList.contains("startButton")) { // 클래스에 startButton이라는 class 가 있으면
    $titleTextImg.src = "./img/titleText02.png"; // 타이틀 이미지를 변경해라. (힘내세요 할수 있어요!)
    // Math.floor(18/19)+1 === Math.floor(0.947)+1 === 0+1 === 1
    $treeImg.src = `./img/mainImg0${Math.floor(fixedRangeValueNum / 20) +1}.png`; // 0~19 는 이미지1, 20~39 는 이미지 2 ... 
    buttonStatus = "start"; // 상태 표현. 현재 진행중
    $stopButton.classList.remove("displayNone"); //stopButton을 화면에 표시.
    timer = setInterval(timerFunc, 1); // 타이머 꾸준히 감소
  } 
  else if (button.classList.contains("stopButton")) { // 중간에 포기할 경우
    $titleTextImg.src = "./img/titleText04.png"; //타이틀 로고 변경 (너무 무리하지 마세요)
    $rangeSliderBackground.style.width = "0"; //rangeslider 에 칠해지는 색의 길이를 삭제시킨다
    $timerDisplay.textContent =
      minuteStr.length === 1
        ? `0${fixedRangeValueNum}:00`
        : `${fixedRangeValueNum}:00`;
    $treeImg.src = "./img/mainImg07.png"; // 죽은나무 표시
    buttonStatus = "stop"; // 상태표현. 현재 멈춤
    $startButton.classList.remove("displayNone"); // startButton 을 화면에 다시 표시
    clearInterval(timer);
    secondNum = fixedRangeValueNum * 60; 
  }
}

// RangeSlider 를 통해 시간 지정
function setMinute(e) {
  if (buttonStatus === "start") { // 시작을 했으면 rangeSlider의 값은 사용자가 지정한 값
    $rangeSlider.value = `${fixedRangeValueNum}`;
    return;
  }

  minuteStr = e.target.value; // rangeSlider의 값. 1~에서 100 사이의 숫자. rangeSlider의 값은 문자열이다.
  fixedRangeValueNum = +minuteStr;
  secondNum = +minuteStr * 60; //TODO: 이건 도대체 무엇

  // 시간이 20미만이면 첫번째 이미지, 40미만이면 두번째 이미지 ...
  $treeImg.src = `./img/mainImg0${Math.floor(+minuteStr / 20) + 1}.png`;
  $timerDisplay.textContent =
    minuteStr.length === 1 ? `0${minuteStr}:00` : `${minuteStr}:00`;
  $rangeSliderBackground.style.width = "0";
}

function mouseleaveFromBody() {
  if (buttonStatus === "ready" || buttonStatus === "stop") return;
  // ready = 버튼 시작 누르기전
  // stop = 버튼 시작 중 포기
  // start 일때만 밑에 문들이 실행된다. 즉 buttonStatus 가 ready 혹은 stop 이면 마우스 커서가 화면 밖을로 나가도 나무가 죽지 않는다.
  $startButton.classList.remove("displayNone");
  $stopButton.classList.add("displayNone");
  $titleTextImg.src = "img/titleText04.png"; //위에 타이틀 변경
  $rangeSliderBackground.style.width = "0";
  $timerDisplay.textContent =
    minuteStr.length === 1
      ? `0${fixedRangeValueNum}:00`
      : `${fixedRangeValueNum}:00`;
  $treeImg.src = "./img/mainImg07.png"; //죽은나무
  buttonStatus = "stop";
  secondNum = fixedRangeValueNum * 60;
  clearInterval(timer);
}

// TEST 용 날짜 변경
function increaseDate() {
  date = date + 1;
  if(date > 31){
    date = 1;
  }
  console.log(date);
}
// Event Function Finish

// function declaration Start
function timerFunc() {
  secondNum--;
  // TODO : 시간이 10 이하이면 0 표시 아니면 표시안함
  $timerDisplay.textContent = `${
    Math.floor(secondNum / 60) >= 10
      ? Math.floor(secondNum / 60)
      : "0" + Math.floor(secondNum / 60)
  }:${
    secondNum % 60 >= 10
      ? Math.floor(secondNum % 60)
      : "0" + Math.floor(secondNum % 60)
  }`;
  // $rangeSliderBackground.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum - Math.floor(secondNum/60)})`
  $rangeSliderBackground.style.width = `calc(calc(calc(100% - 34px) / 100) * ${fixedRangeValueNum -
    Math.floor(secondNum / 60)})`;
    // TODO : 100% - (34px버튼 크기)/ 100 (100개의 칸을로 나눈다)
    // 100% = 칸의 전체 길이
    // 34px = 버튼 길이
    // 나누기 100 = 전체 슬라이더를 100을로 나눈것. 1분이 지날때 마다 칸이 하나씩 칠해진다
    // fixedRangeValueNum = 사용자가 초기에 지정한 시간
    // ${fixedRangeValueNum -Math.floor(secondNum / 60)} = 사용자가 지정한 시간 - 현재 진행된 시간

  if (Math.floor(secondNum / 60) === 0 && secondNum % 60 === 0) {
    // 지정한 시간이 0이 될경우
    let result = 0
    $startButton.classList.remove("displayNone");
    $stopButton.classList.add("displayNone");
    $titleTextImg.src = "./img/titleText03.png";
    $timerDisplay.textContent =
      fixedRangeValueNum >= 10
        ? `${fixedRangeValueNum}:00`
        : `0${fixedRangeValueNum}:00`;
    secondNum = fixedRangeValueNum * 60;
    
    axios
      .get("http://localhost:5100/login")
      .then(res => (result = res.data))
      .then(result => (result = result[0]))
      .then(result => {
        // 초기화
        // axios.patch("http://localhost:5100/login", {
        //   id: 1,
        //   time: [
        //   ]
        // });
        if (result.time.length !== 0) { // 데이터베이스에 데이터 있을때 
          // 갱신
          if (result.time.filter(item => date === item.dateId).length !== 0) {
            axios.patch("http://localhost:5100/login", {
              id: 1,
              time: [
                ...result.time.filter(item => date !== item.dateId),
                {
                  dateId: date,
                  dateTime:
                    result.time.filter(item => item.dateId === date)[0]
                      .dateTime + fixedRangeValueNum
                }
              ]
            });
          } else { // 추가
            axios.patch("http://localhost:5100/login", {
              id: 1,
              time: [
                ...result.time,
                {
                  dateId: date,
                  dateTime: fixedRangeValueNum
                }
              ]
            });
          }
        } else {
          // 데이터베이스에 데이터 없을때 데이터 추가
          axios.patch("http://localhost:5100/login", {
            id: 1,
            time: [
              ...result.time,
              {
                dateId: date,
                dateTime: fixedRangeValueNum
              }
            ]
          });
        }
      })
    .catch(err => console.error(err));
    clearInterval(timer);
    buttonStatus = "stop";
    return;
  }
}
// function declaration Finish

// Event Handler Start
$buttons.onclick = buttonClick;
$body.onmouseleave = mouseleaveFromBody;
$rangeSlider.oninput = setMinute;
$dateButton.onclick = increaseDate; //TEST 용 시간 증가
// Event Handler Stop
