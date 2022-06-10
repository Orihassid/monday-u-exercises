import { promises as fs } from "fs";
import asciifyImage from "asciify-image";
import chalk from "chalk";

export async function getList() {
  try {
    const todoJsonFile = await fs.readFile("tasksDB.json");
    const listArr = JSON.parse(todoJsonFile);
    if (listArr.length === 0) {
      console.log(chalk.greenBright("Your list is empty"));
    }
    listArr.forEach((element) => {
      if (element.isPokemon) {
        const task = {
          itemId: element.itemId,
          itemString: `Catch ${element.item}`,
          itemAsciiUrl: asciifyImage(
            element.imageUrl,
            { fit: "original" },
            (err, convertedImage) => {
              console.log(convertedImage);
            }
          ),
        };
        console.log(chalk.blue(`${task.itemId}. ${task.itemString}`));
      } else {
        const task = {
          itemId: element.itemId,
          itemString: `${element.item}`,
        };
        console.log(
          chalk.yellow(`${task.itemId}. ${task.itemString}`),
          ` ${task.itemAsciiUrl || ""}`
        );
      }
    });
  } catch (err) {
    console.log(chalk.greenBright("Your list is empty"));
  }
}
