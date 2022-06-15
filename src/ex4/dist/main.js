
// Implement the `Main` class here
class Main {
  constructor() {
   
    this.input = document.getElementById("taskInput");
    this.addButton = document.getElementById("addButton");
    this.watingForTasksElem = this.createWelcomeMsg();
    this.todoListH1Elem = document.querySelector("h1");
    this.sortBtn = document.getElementById("sortBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.tasksUlElem = document.getElementById("tasks");
    this.countTasksElem = document.getElementById("count");
  }
  async init() {
    const items = await this.fetchItems();
    console.log(items)
    if(items.length!=0)
    {
        this.addItem(items);
        return;
    }
    this.handleEnterPress();
    this.sortBtn.addEventListener("click", () => this.sortTasksListByName());
    this.clearAllBtn.addEventListener("click", () => this.clearAllTasks());
    this.addButton.addEventListener("click", async () => {
      
      this.watingForTasksElem.style.visibility = "visible";
      if (!this.input.value.trim()) {
        const alertMsg = "you cant add an empty task!";
        this.addAlert(alertMsg);
        return;
      }
    
      try {
      
        if (itemToRender === null) {
          this.input.value = "";
          return;
        }
        this.addItem(this.itemManager.newItems);
      } catch (err) {
        this.addItem([err], false);
      }
      this.input.value = "";
    });
  }



  async fetchItems(){
    const response = await fetch('/item',
        {
            method: 'get',
            headers: { 'Content-Type': 'application/json'
        }});

    
    if(response.status != 200)
    {
        throw new Error(' Error fetching items')
    }
    
    const data = await response.json();
    return data
}

  clearAllTasks() {
    this.itemManager.deleteAllItems();
    this.countTasksHandler(this.itemManager.itemsArr.length);
    this.tasksUlElem.classList.toggle("removed-item");
    setTimeout(() => {
      //i used setTimeout because i added animation
      this.tasksUlElem.innerHTML = ""; //remove all the tasks
      this.tasksUlElem.classList.remove("removed-item");
    }, 500);
    this.clearAllBtn.style.visibility = "hidden";
    this.sortBtn.style.visibility = "hidden";
  }

  addAlert(alertMsg, miilis) {
    this.addErorrAlert(alertMsg, miilis);
  }

  addErorrAlert(alertMsg, miilis = 4000) {
    const div = document.createElement("div");
    const i = document.createElement("i");
    div.classList = "error-msg";
    div.appendChild(i);
    this.todoListH1Elem.appendChild(div);
    div.innerText = alertMsg;
    setTimeout(() => {
      div.remove();
      i.remove();
    }, miilis);
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
  countTasksHandler(numTasks) {
    if (numTasks === 0) {
      this.countTasksElem.style.visibility = "hidden";
      this.clearAllBtn.style.visibility = "hidden";
    }
    if (numTasks > 0) {
      this.countTasksElem.innerText = `${numTasks} item(s)`;
      this.countTasksElem.style.visibility = "visible";
      this.clearAllBtn.style.visibility = "visible";
    }
    if (numTasks < 2) {
      this.sortBtn.style.visibility = "hidden";
    } else {
      this.sortBtn.style.visibility = "visible";
    }
  }

  sortTasksListByName() {
    const taksElements = [...this.tasksUlElem.childNodes];
    taksElements.sort((task1, task2) => {
      const text1 = task1.querySelector("span").innerHTML;
      const text2 = task2.querySelector("span").innerHTML;
      return text1.toLowerCase().localeCompare(text2.toLowerCase());
    });

    taksElements.forEach((task) => task.remove());
    taksElements.forEach((task) => this.tasksUlElem.appendChild(task));
  }

  addItem(newItemsToRender) {
   // this.countTasksHandler(this.itemManager.itemsArr.length);
    for (const val of newItemsToRender) {
      this.renderItem(val);
    }
  }
  renderItem(val) {
    const liTaskElem = document.createElement("li");
    const textElement = document.createElement("span");
    textElement.classList = "tasks_spans";
    liTaskElem.appendChild(textElement);
    if (val.isPokemon) {
      textElement.innerText = `catch ${val.item.name}`;
      const img = this.getPokemonImage(val.item);
      liTaskElem.appendChild(img);
    } else {
      textElement.innerText = val.item;
    }
    liTaskElem.setAttribute("id", `${val.itemId}`);
    liTaskElem.classList = "new-item";

    this.tasksUlElem.appendChild(liTaskElem); //append new task to the list
    this.createDeleteButton(liTaskElem);
    this.clickOnItem(liTaskElem, textElement);
  }

  getPokemonImage(pokemonObj) {
    const url = pokemonObj.imageUrl;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }

  addOnClickMehodWhenDeleteItem(liTaskElem, deleteButton) {
    deleteButton.addEventListener("click", () => {
      liTaskElem.classList.toggle("removed-item");
      const itemId = liTaskElem.id;
      this.itemManager.deleteItem(itemId);
      this.countTasksHandler(this.itemManager.itemsArr.length);

      setTimeout(() => {
        liTaskElem.remove();
      }, 500);
    });
    return;
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

  createDeleteButton(liTaskElem) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete fa fa-trash";
    liTaskElem.appendChild(deleteButton);
    this.addOnClickMehodWhenDeleteItem(liTaskElem, deleteButton);
  }

  validation(item) {
    const arr = item.split(/\s*,\s*/);
    let flag = false;
    arr.forEach((element) => {
      if (!this.isNum(element)) {
        return;
      }
      flag = true;
    });
    return { isPokemon: flag, arr: arr };
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
