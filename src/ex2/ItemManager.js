import PokemonClinet from "./PokemonClient.js";
import UiLogics from "./UiLogics.js";
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.pokemonClinet = new PokemonClinet();
    this.uiLogics = new UiLogics();
  }

  clearAllTasks()
  {
    this.itemsArr = [];
    this.uiLogics.deleteAllTasks();
  }



  addItem(item) {
    if(item.trim()===''){return}
    const { isPokemon, arr } = this.validation(item);
    if (isPokemon) {
      const pokemonsObjectArray = this.pokemonClinet.fetchPokemon(arr);
      //push to items arr
      this.uiLogics.addItem(pokemonsObjectArray);
    } else {
      //push to itemsarr regular todo
      this.uiLogics.addItem(arr); 
    }

    
  }
  deleteItem(item) {
    console.log("here", item);
    const idx = this.itemsArr.findIndex((elem) => {
      if (elem == item) return true;
    });
    this.itemsArr.splice(idx, 1);
    console.log(idx, this.itemsArr);
  }

  validation(item) {
    const arr = item.split(/\s*,\s*/);
    console.log("here455", arr);
    let flag = false;
    arr.forEach((element) => {
      if (!this.isNum(element)) {
        return;
      }
      flag = true;
    });
   
    return { isPokemon: flag, arr: arr };
  }

  isNum(val) {
    return !isNaN(val);
  }
}

export default ItemManager;
