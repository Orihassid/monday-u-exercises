import { promises as fs } from "fs";
import asciifyImage from "asciify-image";
import chalk from "chalk";

export async function getList() {
  try {
    const todoJsonFile = await fs.readFile("tasks.json");
    const listArr = JSON.parse(todoJsonFile);
    if (listArr.length === 0) {
      console.log(chalk.greenBright("Your list is empty"));
    }
    listArr.forEach((element) => {
      if (element.isPokemon) {
        const obj = {
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
        console.log(chalk.blue(`${obj.itemId}. ${obj.itemString}`));
      } else {
        const obj = {
          itemId: element.itemId,
          itemString: `${element.item}`,
        };
        console.log(
          chalk.yellow(`${obj.itemId}. ${obj.itemString}`),
          ` ${obj.itemAsciiUrl || ""}`
        );
      }
    });
  } catch (err) {
    console.log(chalk.greenBright("Your list is empty"));
  }
}
