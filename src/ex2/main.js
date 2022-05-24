import ItemManager from "./ItemManager.js";

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.input = document.getElementById("taskInput");
    this.addButton = document.getElementById("addButton");
    this.watingForTasksElem = this.createWelcomeMsg();
    this.todoListH1Elem = document.querySelector("h1");
    this.sortBtn = document.getElementById("sortBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
  }
  init() {
    this.handleEnterPress();
    //this.sortBtn.addEventListener("click", this.sortTasksListByName());
    this.clearAllBtn.addEventListener("click", () => {
      this.itemManager.clearAllTasks();
    });
    this.addButton.addEventListener("click", () => {
      this.watingForTasksElem.style.visibility = "visible";
      this.inputValidation(this.input.value, this.itemManager.itemsArr);
      this.itemManager.addItem(this.input.value);
      this.input.value = "";
    });
  }
  inputValidation(input, itemsArr) {
    if (input.trim() === "") {
      if (itemsArr.length === 0) {
        //this.countTasksElem.style.visibility = "hidden";
      }
      const div = document.createElement("div");
      const i = document.createElement("i");
      div.classList = "error-msg";
      div.appendChild(i);
      this.todoListH1Elem.appendChild(div);
      div.innerText = "You can't add an empty task!";
      setTimeout(() => {
        div.remove();
        i.remove();
      }, 4000);
    } else return;
  }
  createWelcomeMsg() {
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

  handleEnterPress() {
    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.addButton.click();
      }
    });
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
