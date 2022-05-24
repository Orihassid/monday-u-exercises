export default class UiLogics {
  constructor() {
    this.tasksUlElem = document.getElementById("tasks");
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

  sortTasksListByName() {}

  addItem(item) {
    for (const val of item) {
      this.renderItem(val);
    }
  }
  renderItem(item) {
    const liTaskElem = document.createElement("li"); //create new list item html element
    const textElement = document.createElement("span"); //document.createTextNode(input.value); // create text html element with user task input name
    textElement.innerText = item;
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

  getTodayDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  }
}
