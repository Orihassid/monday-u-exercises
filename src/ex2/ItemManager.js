import PokemonClinet from "./PokemonClient.js";
  class ItemManager {
    constructor()   {
        this.itemsArr= [];
        this.pokemonClinet = new PokemonClinet()
    }
    addItem(item){
        this.validation(item)
        

        this.itemsArr.push(item)
        
    }
    deleteItem(item)
    {
      const idx =   this.itemsArr.findIndex((elem)=>{
            return elem === item;
        })
        this.itemsArr.splice(idx,1)
        

    }
   
    validation(item){
    const arr = item.split(',');
    console.log(arr)
    let flag = false;
    arr.forEach(element => {
        if(!this.isNum(element)){return};
        flag = true });
        if(flag){//if the item is pokemon(s)
            const pokemon = this.pokemonClinet.fetchPokemon(arr)
        }
        else{//regular todo item

        }
    console.log(flag)
    }

     isNum(val){
        return !isNaN(val)
      }
      
}

export default ItemManager;