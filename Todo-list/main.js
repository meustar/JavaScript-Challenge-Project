// 기능들.
// 1. 유저는 할일을 추가할 수 있다.
// 2. 각 할일에 삭제와 체크버튼이 있다
// 3. 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 4. 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이 그어진다.
// 4-1. Check 버튼을 클릭하는 순간 true false
// 4-2. true이면 끝난걸로 간주하고 밑줄 그어주기
// 4-3. false이면 안끝난걸로 간주하고 그대로
// 5. 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 6. 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 7. 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let taskInput = document.getElementById("task-input");
// console.log(taskInput);
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";
let filterList = [];

function getTodayStr() {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = String(d.getMonth() + 1).padStart(2, "0");
  let dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

let selectedDate = getTodayStr();

function updateSelectedDateUI() {
  let el = document.getElementById("selected-date-text");
  if (el) el.textContent = selectedDate;
}

// 달력안에 할일 갯수 보여주기
function getCountByDate(dateStr) {
  let count = 0;

  for (let i = 0; i < taskList.length; i++) {
    let taskDate = taskList[i].date ? taskList[i].date : getTodayStr();

    if (taskDate === dateStr) {
      count++;
    }
  }
  return count;
}
function updateCalendarBadges() {
  let dayEls = document.querySelectorAll(".fc-daygrid-day[data-date]");
  if (!dayEls || dayEls.length === 0) return;

  for (let i = 0; i < dayEls.length; i++) {
    let dateStr = dayEls[i].getAttribute("data-date");
    let count = getCountByDate(dateStr);

    let frame = dayEls[i].querySelector(".fc-daygrid-day-frame");
    if (!frame) frame = dayEls[i];

    let badge = frame.querySelector(".todo-badge");

    if (count > 0) {
      if (!badge) {
        badge = document.createElement("div");
        badge.className = "todo-badge";
        frame.appendChild(badge);
      }
      badge.textContent = count;
    } else {
      if (badge) {
        badge.remove();
      }
    }
  }
}

// 모바일 환경에서 달력의 날짜를 누르면 할일 리스트로 자동 스크롤
function scrollToTodoIfMobile() {
  // 992px 보다 작으면 모바일로 간주.
  let isMobile = window.matchMedia("(max-width: 991.98px)").matches;
  if (!isMobile) return;

  let todoSection = document.getElementById("todo-section");
  if (!todoSection) return;

  todoSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  let input = document.getElementById("task-input");
  if (input) input.focus();
}

// 할일 추가 버튼
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

console.log(tabs);

// 할일 추가
function addTask() {
  //   console.log("clicked");
  // let taskContent = taskInput.value;

  // 입력창이 비어있으면 추가 안되도록.
  if (taskInput.value.trim() === "") {
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
    date: selectedDate,
  };
  taskList.push(task);
  // 입력창 초기화
  taskInput.value = "";
  console.log(taskList);
  render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서 (mode = 내가 선택한 탭의 정보를 가진 변수)
  // 2. 리스트를 달리 보여준다.
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "Action") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        list.push(taskList[i]);
      }
    }
  } else if (mode === "Complete") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        list.push(taskList[i]);
      }
    }
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
              <button  onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;

  updateCalendarBadges();
}

// 체크버튼을 클릭하면 할일이 끝난것으로 간주하고 밑줄이 그어진다.
// taskList[i].isComplete 가 ture이면 끝나고 밑줄.
// taskList[i].isComplete 가 false이면 안끝나고 그대로.
function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

// 삭제 기능
function deleteTask(id) {
  // console.log("delete", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log(taskList);
  render();
}

function filter(event) {
  console.log("filter", event.target.id);
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    // 전체 리스트
    render();
  } else if (mode === "Action") {
    // 진행중인 리스트
    //  task.isComplete == false 인 값들.
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "Complete") {
    // 끝난 리스트
    // task.isComplete == true 인 값들.
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("완료", filterList);
  }
}

// 랜덤 아이디 생성 함수
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// menu tab =  underline
let underLine = document.getElementById("under-line");
console.log(underLine);

let taskTabs = document.querySelectorAll(".task-tabs div");
console.log(taskTabs);

taskTabs.forEach((menu) =>
  menu.addEventListener("click", (e) => menuIndicator(e)),
);

function menuIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

document.addEventListener("DOMContentLoaded", function () {
  updateSelectedDateUI();

  var calenderEl = document.getElementById("calendar");
  if (!calenderEl) return;

  var calender = new FullCalendar.Calendar(calenderEl, {
    initialView: "dayGridMonth",
    height: "auto",
    // Bootstrap 5 테마 적용
    themeSystem: "bootstrap5",

    // 한국어
    locale: "ko",
    firstDay: 1, // 월요일 시작

    // 툴바 정리
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek",
    },

    datesSet: function () {
      updateCalendarBadges();
    },

    dateClick: function (info) {
      selectedDate = info.dateStr;
      updateSelectedDateUI();
      render();

      // 살짝 기다렸다가 스크롤
      setTimeout(function () {
        scrollToTodoIfMobile();
      }, 50);
    },
  });
  calender.render();
  updateCalendarBadges();
});
