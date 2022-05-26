import PokemonClinet from "./PokemonClient.js";
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.pokemonClinet = new PokemonClinet();
    this.newItems = [];
  }

  deleteAllItems() {
    this.itemsArr = [];
    this.newItems = [];
  }

  generateId() {
    let max_id = 0;

    this.itemsArr.forEach((item) => {
      max_id = Math.max(max_id, item.itemId);
    });
    const newId = max_id + 1;
    return newId;
  }


  async addItem(isPokemon, arr) {
    this.newItems = [];
    if(!isPokemon)//check pokemon by name
    {
      const res =  await this.pokemonClinet.checkByPokemonName(arr[0])
      if(res){
      const itemId = this.generateId();
      this.itemsArr.push({ itemId: itemId, isPokemon: true, item: res });
      this.newItems.push({ itemId: itemId, isPokemon: true, item: res });
      return;
      }
    }
    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(arr);
      if (filteredArr.length == 0) {
        return null;
      } else {
        try {
          const pokemons = await this.pokemonClinet.fetchPokemon(filteredArr);
          pokemons.forEach((pokemon) => {
            const itemId = this.generateId();
            const obj = {
              itemId: itemId,
              isPokemon: true,
              item: pokemon,
            };
            this.itemsArr.push(obj);
            this.newItems.push(obj);
            return obj;
          });
        } catch (e) {
          let str = "";
          const itemId = this.generateId();
          filteredArr.forEach((elem) => {
            str += elem + " ";
          });
          const obj = {
            itemId: itemId,
            isPokemon: false,
            item: `pokemon with id: ${str} was not found`,
          };
          this.itemsArr.push(obj);
          this.newItems.push(obj);
        }
      }
    } else{
      const itemId = this.generateId();
      this.itemsArr.push({ itemId: itemId, isPokemon: false, item: arr[0] });
      this.newItems.push({ itemId: itemId, isPokemon: false, item: arr[0] });
    }
  
  }

  deleteItem(itemId) {
    const idx = this.itemsArr.findIndex((elem) => {
      if (elem.itemId == itemId) return true;
    });
    this.itemsArr.splice(idx, 1);
  }

  getItemsToAdd(arr) {
    const pokemonsIdArr = this.itemsArr
      .filter((obj) => obj.isPokemon)
      .map((obj) => obj.item.id.toString());
    return arr.filter((id) => !pokemonsIdArr.includes(id));
  }
}

export default ItemManager;
