import PokemonClinet from "./PokemonClient.js";
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.pokemonClinet = new PokemonClinet();
    this.newItems = [];
  }

  clearAllTasks() {
    this.itemsArr = [];
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
    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(arr);
      if (filteredArr.length == 0) {
        console.log(filteredArr, "filterded");
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
              this.newItems.push(obj)
              return obj;
            })
          
        } catch (e) {
          const itemId = this.generateId();
          const obj = {
            itemId: itemId,
            isPokemon: false,
            item: "pokemon not found",
          };
          this.itemsArr.push(obj);
          this.newItems.push(obj)
        }
      }
    } else {
      const itemId = this.generateId();
      this.itemsArr.push({ itemId:itemId, isPokemon: false, item: arr[0] });
      this.newItems.push( { itemId:itemId, isPokemon: false, item: arr[0] } )
    }
    console.log('itemsArr',this.itemsArr)
    console.log('newItens',this.newItems)
  }

  deleteItem(itemId) {
    console.log("delete", itemId);
    const idx = this.itemsArr.findIndex((elem) => {
      if (elem.itemId == itemId) return true;
    });
    this.itemsArr.splice(idx, 1);
    console.log(idx, this.itemsArr);
  }

  getItemsToAdd(arr) {
    const pokemonsIdArr = this.itemsArr
      .filter((obj) => obj.isPokemon)
      .map((obj) => obj.item.id.toString());
    console.log(this.itemsArr);
    console.log(pokemonsIdArr);
    return arr.filter((id) => !pokemonsIdArr.includes(id));
  }
}

export default ItemManager;
