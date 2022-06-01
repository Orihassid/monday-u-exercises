
import { Command } from "commander";
import {add } from "./addCommand.js";
import { deleteTodo } from "./deleteCommand.js";
import {getList} from "./getCommand.js"




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
