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

addButton.addEventListener("click", addTask);

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
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서 (mode = 내가 선택한 탭의 정보를 가진 변수)
  // 2. 리스트를 달리 보여준다.
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
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
  } else if (mode === "ongoing") {
    // 진행중인 리스트
    //  task.isComplete == false 인 값들.
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
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
