
import { Command } from "commander";
import {add } from "./addCommand.js";
import { deleteTodo } from "./deleteCommand.js";
import {getList} from "./getCommand.js"

function solution(T) {
  // write your code in JavaScript (Node.js 8.9.4)
  let myMap = new Map();
  let res =""
  myMap.set('S',0)
  myMap.set('M',0)
  myMap.set('L',0)


  for(const letter of T){
      let val = myMap.get(letter)
       myMap.set(letter,val+1)
  }
 

  for(let i = 0;i< myMap.length; i++)
  {
      for(let j = 0;j<myMap.get(myMap[i]);j++)
      {
          res+=myMap[i]

      }
  }
  console.log(res)
  return res 
}

solution("MSSLS")


function getCommanderProgram() {
  const program = new Command();
  

  program
    .name("todo-app")
    .description("Use the todo list app to add/get your tasks!")
    .version("1.0.0");

  
  program
    .command("add")
    .description("add task to list")
    .argument("<string>", "Task name")
    .action(async (taskName) => {

      add(taskName)
      
    });


    program
    .command("get")
    .description("get all todos")
    .action( () => {
       getList();
    })


    program
    .command("delete")
    .description("delete todo by giving the id task")
    .argument("<number>", "Task id")
    .action( (id,options) => {
      deleteTodo(id)
    })
      
     

  
  return program;
}

const program = getCommanderProgram();
program.parse();
