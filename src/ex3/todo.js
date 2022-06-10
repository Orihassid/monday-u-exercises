
import { Command } from "commander";
import {add } from "./addCommand.js";
import { deleteTodo } from "./deleteCommand.js";
import {getList} from "./getCommand.js"
import inquirer from "inquirer";



inquirer
  .prompt([
    {
      type:'list', 
      name:'list',
      message: 'pick from the options',
      choices:['Add a new task','See your current tasks','Delete task']
    }
  ])
  .then((answers) => {
    if(answers.list == 'Add a new task')
    {
      inquirer.prompt([{
        type:'input', 
        name:'add',
        message: 'add your new task'}
       

      ]).then((answers)=>{
        add(answers.add)
      })
      
    }
    else if(answers.list =='See your current tasks'){
      getList();
     
    }

    else{
      inquirer.prompt([{
        type:'input', 
        name:'delete',
        message: 'please put your task id that you want to delete',
        validate:(answer) =>{
          if(isNaN(answer)){
            return 'please enter a valid number'
          }
          return true;

        }
      }
       

      ]).then((answers)=>{
        deleteTodo(answers.delete)
      })

    }
    
  })
  



// i used inquirer instead of commander. but i implemented both:)
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

//const program = getCommanderProgram();
//program.parse();
