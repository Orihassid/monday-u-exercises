

import { promises as fs } from "fs";
import asciifyImage from "asciify-image"


export async  function getList() {
  const todoJsonFile = await fs.readFile("tasks.json");
  const listArr = JSON.parse(todoJsonFile)
  if( listArr.length == 0){
    console.log('Your List is Empty')
    return;
  }
    else{
  listArr.forEach((element) => {
    if (element.isPokemon) {
      const obj = {
        itemId: element.itemId,
        itemString: `Catch ${element.item}`,
        itemAsciiUrl: asciifyImage(element.imageUrl,{fit:"original"},(err,convertedImage)=>{
          console.log(convertedImage)
        })
      };
      console.log(`${obj.itemId}. ${obj.itemString}`)
      
    }
      else{
        const obj = {
            itemId: element.itemId,
            itemString: `${element.item}`,
      }
      console.log(`${obj.itemId}. ${obj.itemString} ${obj.itemAsciiUrl||''}`)
    
    }
   
    
  });
  
}
}
