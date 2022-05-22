import ItemManager from "./ItemManager.js";

// Implement the `Main` class here
class Main {
  constructor() {
    this.itemManager = new ItemManager();
    this.addButton = document.getElementById("addButton");
    this.input = document.getElementById("taskInput");
    this.sortBtn = document.getElementById("sortBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.tasksUlElem = document.getElementById("tasks");
    this.countTasksElem = document.getElementById("count");
    this.todoListH1Elem = document.querySelector("h1");
    this.watingForTasksElem = null //create wating for tasks greet
  }

  init() {
    this.sortBtn.style.visibility = "hidden";
    this.clearAllBtn.style.visibility = "hidden";
    this.countTasksElem.classList = "count";
    this.watingForTasksElem = this.createWelcomeMsg()
  }
  addItem()
  {
        this.addButton.addEventListener("click", () => {
        this.itemManager.addItem(this.input.value);
        this.watingForTasksElem.style.visibility = "hidden";
        this.countTasksElem.style.visibility = "visible";
       // this.itemManager.getPokemon(this.input.value)
        //console.log(this.itemManager.itemsArr)
       
      });
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
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
  main.addItem()
});


