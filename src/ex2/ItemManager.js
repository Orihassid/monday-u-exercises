import PokemonClinet from "./PokemonClient.js";
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.pokemonClinet = new PokemonClinet();
  }
  addItem(item) {
    const isPokemon = this.validation(item)
    console.log(isPokemon)
     const pokemonNames = isPokemon == true ? this.getPokemonNames(item) :this.itemsArr.push(item)
     if(pokemonNames){
    
     }
    
  }
  deleteItem(item) {
    const idx = this.itemsArr.findIndex((elem) => {
      return elem === item;
    });
    this.itemsArr.splice(idx, 1);
  }

  validation(item) {
    const arr = item.split(",");
    let flag = false;
    arr.forEach((element) => {
      if (!this.isNum(element)) {
        return;
      }
      flag = true;
    });
    return flag;
  }
  getPokemonNames(item) {
    const arr = item.split(",");
    console.log('mewo',arr)
    const pokemonNames = this.pokemonClinet.fetchPokemon(arr);
    console.log('mew3',pokemonNames)
    return pokemonNames
    
    
   
  }

  isNum(val) {
    return !isNaN(val);
  }

}

export default ItemManager;
