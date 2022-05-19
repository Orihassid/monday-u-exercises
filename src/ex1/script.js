//init elements
const input = document.querySelector("#taskInput");
const addButton = document.getElementById("addButton");
const sortBtn = document.getElementById("sortBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const tasksUlElem = document.getElementById("tasks");
const countTasksElem = document.getElementById("count");
const todoListH1Elem = document.querySelector("h1");
const watingForTasksElem = createWelcomeMsg();//create wating for tasks greet

//init event listeners
addButton.addEventListener("click", onButtonAddClicked);
sortBtn.addEventListener("click", sortTasksListByName);
clearAllBtn.addEventListener("click", clearAllTasks);

sortBtn.style.visibility = "hidden";
clearAllBtn.style.visibility = "hidden";
countTasksElem.classList = "count";

handleEnterPress();


function onButtonAddClicked() {


  const todayDate = getTodayDate()
  const dateElem = document.createElement('i')
  dateElem.innerHTML = todayDate;
  dateElem.classList = 'date'
  watingForTasksElem.style.visibility = "hidden";
  countTasksElem.style.visibility = "visible";
  const liTaskElem = document.createElement("li"); //create new list item html element
  const textElement = document.createElement("span"); //document.createTextNode(input.value); // create text html element with user task input name
  textElement.innerHTML = input.value;
  liTaskElem.appendChild(textElement); // append text element to list item element
  liTaskElem.classList = "new-item";
  liTaskElem.append(dateElem);

  if (!input.value) {//if the user value is empty
    handleEmptyState();
    return;
  }

  tasksUlElem.appendChild(liTaskElem);//append new task to the list
  let numTasks = tasksUlElem.childElementCount;//number of current tasks in the list
  input.value = "";//Clear the input when a new item is added

  
  
  numTasks > 0
    ? (clearAllBtn.style.visibility = "visible")
    : (clearAllBtn.style.visibility = "hidden");

  numTasks > 1
    ? (sortBtn.style.visibility = "visible")
    : (sortBtn.style.visibility = "hidden");

 
  const deleteButton = document.createElement("button"); 
  deleteButton.style.visibility = "hidden";

  //Change the background and cursor type of an item when hovered on
  liTaskElem.addEventListener("mouseover", () => {
    deleteButton.style.visibility = "visible";
  });

  liTaskElem.addEventListener("mouseout", () => {
    deleteButton.style.visibility = "hidden";
  });

  //add an event only to the li elemnt
  liTaskElem.addEventListener(
    "click",
    (e) => {
      if (e.target !== liTaskElem) return;
      alert(textElement.innerText);
      liTaskElem.classList.toggle("checked");
    },
    false
  );

  deleteButton.className = "delete fa fa-trash";

  deleteButton.addEventListener("click", () => {
    liTaskElem.classList.toggle("removed-item");
    setTimeout(() => {//i used setTimeout because i added animation
      liTaskElem.remove();
      numTasks--;
      console.log('here',numTasks)
      countTasksElem.innerText =
        "you have" + " " + numTasks.toString() + " " + "task(s)";
      if (numTasks === 0) {
        countTasksElem.style.visibility = "hidden";
        watingForTasksElem.style.visibility = "visible";
      }
      if (numTasks === 0 || numTasks === 1) {
        clearAllBtn.style.visibility = "hidden";
      }
      if (numTasks === 1) {
          console.log(numTasks)
        sortBtn.style.visibility = "hidden";
      }
    }, 500);
  });

  countTasksElem.innerHTML = "you have" + " " + numTasks.toString() + " " + "task(s)";
  liTaskElem.appendChild(deleteButton);
  
}

function sortTasksListByName() {
  const taksElements = [...tasksUlElem.childNodes];
  taksElements.sort((task1, task2) => {
    const text1 = task1.querySelector("span").innerHTML;
    const text2 = task2.querySelector("span").innerHTML;
    return text1.toLowerCase().localeCompare(text2.toLowerCase());
  });

  taksElements.forEach((task) => task.remove());
  taksElements.forEach((task) => tasksUlElem.appendChild(task));
}

function clearAllTasks() {
  countTasksElem.style.visibility = "hidden";
  tasksUlElem.classList.toggle("removed-item");
  setTimeout(() => {//i used setTimeout because i added animation
    tasksUlElem.innerHTML = "";//remove all the tasks
    tasksUlElem.classList.remove("removed-item");
    watingForTasksElem.style.visibility = "visible";
  }, 500);
  clearAllBtn.style.visibility = "hidden";
  sortBtn.style.visibility = "hidden";
}

function handleEmptyState() {
  if (tasksUlElem.childElementCount === 0) {
    countTasksElem.style.visibility = "hidden";
  }
  const div = document.createElement("div");
  const i = document.createElement("i");
  div.classList = "error-msg";
  div.appendChild(i);
  todoListH1Elem.appendChild(div);
  div.innerText = "You can't add an empty task!";
  input.value = "";
  setTimeout(() => {
    div.remove();
    i.remove();
  }, 4000);
}

function createWelcomeMsg() {
  const childDiv = document.createElement("div");
  childDiv.innerText = "Waiting for tasks...";
  childDiv.classList = "typing";
  const parentDiv = document.createElement("div");
  parentDiv.classList = "wrapper";
  const elementDiv = document.getElementById("todoApp");
  parentDiv.appendChild(childDiv);
  elementDiv.appendChild(parentDiv);
  return parentDiv;
}


function handleEnterPress(){
input.addEventListener("keypress", (event)=> {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    addButton.click();
  }
})}


function getTodayDate()
{
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
