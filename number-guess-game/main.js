// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력한다. 그리고 go라는 버튼을 누른다.
// 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 4. 랜덤번호가 < 유저번호 Down!!!
// 5. 랜덤번호가 > 유저번호 Up!!
// 6. Reset 버튼을 누르면 게임이 리셋된다.
// 7. 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 8. 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 9. 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다.

// 1. 랜덤번호 지정
let computerNum = 0;

function pickRandomNum() {
  //   computerNum = Math.random();  // 0.000000000000 ~ 0.999999999999
  //   computerNum = Math.random() * 100; // 0.000000000000 ~ 99.999999999
  computerNum = Math.floor(Math.random() * 100) + 1; // 1 ~ 100
  console.log("정답: ", computerNum);
}

pickRandomNum();

// 2. 유저가 번호를 입력한다. 그리고 go라는 버튼을 누른다.
// 3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 4. 랜덤번호가 < 유저번호 Down!!!
// 5. 랜덤번호가 > 유저번호 Up!!
// 6. Reset 버튼을 누르면 게임이 리셋된다.
// 7. 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chancesArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
// 10. 유저가 숫자를 입력하기 전에, input 창이 깨끗하게 정리된다.
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function play() {
  let userValue = userInput.value;

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

  chances--;
  chancesArea.textContent = `남은 기회: ${chances} 번`;
  console.log("남은 기회: ", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "Up!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = "맞췄습니다!!";
    // 11. 게임을 기회가 끝나기 전에 맞춰도 Go 버튼은 비활성화 된다
    gameOver = true;
  }
  history.push(userValue);
  console.log(history);

  if (chances < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset() {
  // user input 창이 깨끗하게 정리되고,
  userInput.value = "";
  // 새로운 번호가 생성
  pickRandomNum();

  resultArea.textContent = "결과값이 여기에 나옵니다.";
}
