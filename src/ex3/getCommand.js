




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
      };
     
      
    }
      else{
        const obj = {
            itemId: element.itemId,
            itemString: `${element.item}`,
      }
     
    
    }
    console.log(`${elem.itemId}. ${elem.itemStr}`)
    
  });
  
}
}
