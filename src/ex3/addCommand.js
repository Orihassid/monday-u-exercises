import { addItem } from "./itemManager.js";

import chalk from "chalk";


export async function add(taskName) {
  const { isPokemon, arr } = validation(taskName);


  try {
    const itemToRender = await addItem(isPokemon, arr);
    if (itemToRender === null) {
      console.log('Task already added!!')
      return;
    }
  } catch (err) {
    console.log(err);
  }

  console.log("new todo added successfully!");
}

export function validation(item) {
  const arr = item.split(/\s*,\s*/);
  let flag = false;
  arr.forEach((element) => {
    if (!isNum(element)) {
      return;
    }
    flag = true;
  });
  console.log(flag, arr, "validation");
  return { isPokemon: flag, arr: arr };
}

function isNum(val) {
  return !isNaN(val);
}
