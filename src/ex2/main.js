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
    this.tasksUlElem = document.getElementById("tasks");
  }
  init() {
    this.handleEnterPress();
    this.sortBtn.addEventListener("click", this.sortTasksListByName());
    this.clearAllBtn.addEventListener("click", () => {
      this.itemManager.clearAllTasks();
    });
    this.addButton.addEventListener("click", async () => {
      this.watingForTasksElem.style.visibility = "visible";
      this.emptyInputValidation(this.input.value, this.itemManager.itemsArr);
      const { isPokemon, arr } = this.validation(this.input.value);
      console.log(isPokemon, arr, "noder");
      try {
        const itemToRender = await this.itemManager.addItem(isPokemon, arr);
        console.log("item to render", itemToRender);
        if (itemToRender == null) {
          this.input.value = "";
          return;
        }

        this.addItem(itemToRender.items, itemToRender.isPokemon);
      } catch (err) {
        this.addItem([err], false);
      }

      this.input.value = "";
    });
  }

  emptyInputValidation(input, itemsArr) {
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

  deleteAllTasks() {
    //countTasksElem.style.visibility = "hidden";
    this.tasksUlElem.classList.toggle("removed-item");
    setTimeout(() => {
      //i used setTimeout because i added animation
      this.tasksUlElem.innerHTML = ""; //remove all the tasks
      this.tasksUlElem.classList.remove("removed-item");
      //watingForTasksElem.style.visibility = "visible";
    }, 500);
    // clearAllBtn.style.visibility = "hidden";
    // sortBtn.style.visibility = "hidden";
  }

  sortTasksListByName() {
    
  }

  addItem(item, isPokemon) {
    for (const val of item) {
      this.renderItem(val, isPokemon);
    }
  }
  renderItem(item, isPokemon) {
    const liTaskElem = document.createElement("li"); //create new list item html element
    const textElement = document.createElement("span"); //document.createTextNode(input.value); // create text html element with user task input name
    if (isPokemon) {
      console.log("hey", item.name);
      textElement.innerText = `catch ${item.name}`;
      liTaskElem.setAttribute("id", `pokemon`);
    } else {
      textElement.innerText = item;
      liTaskElem.setAttribute("id", `item`);
    }

    liTaskElem.appendChild(textElement); // append text element to list item element
    liTaskElem.classList = "new-item";
    this.addDateElement(liTaskElem);
    this.tasksUlElem.appendChild(liTaskElem); //append new task to the list
    this.createDeleteButton(liTaskElem, item);
    this.clickOnItem(liTaskElem, textElement);
    //countTasksElem.innerHTML = "you have" + " " + numTasks.toString() + " " + "task(s)";
  }

  addOnClickMehodWhenDeleteItem(liTaskElem, deleteButton, itemToDelete) {
    deleteButton.addEventListener("click", () => {
      liTaskElem.classList.toggle("removed-item");
      setTimeout(() => {
        //i used setTimeout because i added animation
        liTaskElem.remove();

        // this.countTasksElem.innerText =
        //   "you have" + " " + numTasks.toString() + " " + "task(s)";
        // if (numTasks === 0) {
        //   countTasksElem.style.visibility = "hidden";
        //   watingForTasksElem.style.visibility = "visible";
        // }
        // if (numTasks === 0 || numTasks === 1) {
        //   clearAllBtn.style.visibility = "hidden";
        // }
        // if (numTasks === 1) {
        //     console.log(numTasks)
        //   sortBtn.style.visibility = "hidden";
        // }
      }, 500);
    });
    return;
  }

  addDateElement(liTaskElem) {
    const todayDate = this.getTodayDate();
    const dateElem = document.createElement("i");
    dateElem.innerText = todayDate;
    dateElem.classList = "date";
    liTaskElem.append(dateElem);
  }

  clickOnItem(liTaskElem, textElement) {
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
  }

  createDeleteButton(liTaskElem, item) {
    const deleteButton = document.createElement("button");
    deleteButton.style.visibility = "hidden";
    deleteButton.className = "delete fa fa-trash";
    liTaskElem.appendChild(deleteButton);
    this.addOnClickMehodWhenDeleteItem(liTaskElem, deleteButton, item);
    //Change the background and cursor type of an item when hovered on
    liTaskElem.addEventListener("mouseover", () => {
      deleteButton.style.visibility = "visible";
    });

    liTaskElem.addEventListener("mouseout", () => {
      deleteButton.style.visibility = "hidden";
    });
  }

  validation(item) {
    console.log(item, "heraaaae");
    const arr = item.split(/\s*,\s*/);
    console.log(arr, "mew");
    let flag = false;
    arr.forEach((element) => {
      if (!this.isNum(element)) {
        return;
      }
      flag = true;
    });
    return { isPokemon: flag, arr: arr };
  }

  getTodayDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }

  isNum(val) {
    return !isNaN(val);
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
