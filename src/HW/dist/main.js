
// Implement the `Main` class here
class Main {
  constructor() {
    this.itemClient = new itemClient();
    this.input = document.getElementById("taskInput");
    this.addButton = document.getElementById("addButton");
    this.watingForTasksElem = this.createWelcomeMsg();
    this.todoListH1Elem = document.querySelector("h1");
    this.sortBtn = document.getElementById("sortBtn");
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.tasksUlElem = document.getElementById("tasks");
    this.countTasksElem = document.getElementById("count");
    this.loader = document.querySelector("#loading");
   
  }
  async init() {

    await this.fetchAllItems();
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

        this.loader.classList.add("display");
        const itemsArr = await this.itemClient.createItem(this.input.value);
        this.loader.classList.remove("display");
       
        this.input.value =""
        this.addItem(itemsArr);
      } catch (err) {
        this.addItem([err], false);
      }
     
    });
  }


  async fetchAllItems()
{
  try{
    const itemsArr = await this.itemClient.fetchItems();
    if (itemsArr.length != 0) {
      this.addItem(itemsArr);
    }
    }
    catch(err)
    {
      throw err;
    }
}
  
 async  clearAllTasks() {
   await this. itemClient.deleteAllItems();
    this.tasksUlElem.classList.toggle("removed-item");
    setTimeout(() => {
     
      this.tasksUlElem.innerHTML = ""; 
      this.tasksUlElem.classList.remove("removed-item");
      this.countTasksHandler();
    }, 500);
   
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
  countTasksHandler() {
    const numTasks = this.tasksUlElem.childElementCount;
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
 
    for (const val of newItemsToRender) {
      this.renderItem(val);
    }
    this.countTasksHandler();
  }
  renderItem(val) {
    
    const liTaskElem = document.createElement("li");
    const textElement = document.createElement("span");
    textElement.classList = "tasks_spans";
    const checkBox = this.createCheckBox(liTaskElem);
    liTaskElem.append(checkBox);
    liTaskElem.appendChild(textElement);
    if (val.isPokemon) {
      textElement.innerText = `catch ${val.itemName}`;
      const img = this.getPokemonImage(val);
      liTaskElem.appendChild(img);
    } else {
      textElement.innerText = val.itemName;
    }
    liTaskElem.setAttribute("id", `${val.itemId}`);
    liTaskElem.classList = "new-item";

    this.tasksUlElem.appendChild(liTaskElem); //append new task to the list
    this.createDeleteButton(liTaskElem);
    this.clickOnItem(liTaskElem, textElement);
  }

  createCheckBox(liTaskElem)
  {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.value = 1;
    this.addOnClickMehodToCheckBox(checkbox,liTaskElem);
    return checkbox;
  }
  addOnClickMehodToCheckBox(checkbox,liTaskElem)
  {
    checkbox.addEventListener('change', async(e) => {

      if (e.target.checked) {
        await this.itemClient.updateStatus(liTaskElem.id,true)
        
      } else {
        await this.itemClient.updateStatus(liTaskElem.id,false)
      }
    });
  }

  getPokemonImage(pokemonObj) {
    
    const url = pokemonObj.imageUrl;
    const img = document.createElement("img");
    img.setAttribute("src", url);
    return img;
  }

  async addOnClickMehodWhenDeleteItem(liTaskElem, deleteButton) {
    deleteButton.addEventListener("click", async () => {
      liTaskElem.classList.toggle("removed-item");
      const itemId = liTaskElem.id;
       await this.itemClient.deleteItem(itemId);
     

      setTimeout(() => {
        liTaskElem.remove();
        this.countTasksHandler();
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


  

}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  // you should create an `init` method in your class
  // the method should add the event listener to your "add" button
  main.init();
});
