// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력한다. 그리고 go라는 버튼을 누른다.
// 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 4. 랜덤번호가 < 유저번호 Down!!!
// 5. 랜덤번호가 > 유저번호 Up!!
// 6. Reset 버튼을 누르면 게임이 리셋된다.
// 7. 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 8. 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.
// 10. 유저가 숫자를 입력하기 전에, input 창이 깨끗하게 정리된다.
// 11. 게임을 기회가 끝나기 전에 맞춰도 Go 버튼은 비활성화 된다.
// 12. Go버튼 활성화, 기회 초기화, 결과창 초기화, history 초기화

// 1. 랜덤번호 지정
let computerNum = 0;

function randomNumPick() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("컴퓨터가 뽑은 랜덤 숫자 (정답) :", computerNum);
}
randomNumPick();

// 2. 유저가 번호를 입력한다. 그리고 go라는 버튼을 누른다.
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
// 결과창 문구 변수
let resultArea = document.getElementById("result-area");
// 리셋 버튼
let resetButton = document.getElementById("reset-button");
// 기회
let chances = 5;
// 게임오버
let gameOver = false;
// 기회 보여주는 영역
let chancesArea = document.getElementById("chance-area");
// 유저가 입력한 숫자 기록하는 배열
let history = [];

// 게임 시작버튼 눌렀을 때
playButton.addEventListener("click", play);
// 리셋 버튼 눌렀을 때
resetButton.addEventListener("click", reset);

// 10. 유저가 숫자를 입력하기 전에, input 창이 깨끗하게 정리된다.
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function play() {
  let userValue = userInput.value;
  console.log("유저가 입력한 값: ", userValue);
  // 8. 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100 사이의 숫자를 입력해 주세요.";
    return;
  }
  // 9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.
  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }

  //7. 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
  chances--;
  chancesArea.textContent = `남은 기회: ${chances} 번`;

  // 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
  // 4. 랜덤번호가 < 유저번호 Down!!!
  // 5. 랜덤번호가 > 유저번호 Up!!
  if (userValue < computerNum) {
    console.log("UP");
    resultArea.textContent = "UP";
  } else if (userValue > computerNum) {
    console.log("DOWN");
    resultArea.textContent = "DOWN";
  } else {
    console.log("맞췄습니다!");
    resultArea.textContent = "맞췄습니다!";
    // 11. 게임을 기회가 끝나기 전에 맞춰도 Go 버튼은 비활성화 된다.
    gameOver = true;
  }

  // 기회가 1보다 작으면 게임 오버.
  if (chances < 1) {
    gameOver = true;
  }
  // 게임오버가 참이면, Go 버튼 비활성화
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

// 6. Reset 버튼을 누르면 게임이 리셋된다.
function reset() {
  userInput.value = "";
  randomNumPick();
  // 12. Go버튼 활성화, 기회 초기화, 결과창 초기화, history 초기화
  playButton.disabled = false;
  chances = 5;
  chancesArea.textContent = `남은 기회: ${chances} 번`;
  history = [];
}
