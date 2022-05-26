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
    const itemId = this.generateId();

    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(arr);
      if (filteredArr.length == 0) {
        console.log(filteredArr, "filterded");
        return null;
      } else {
        try {
          const pokemons = await this.pokemonClinet.fetchPokemon(filteredArr);
          this.itemsArr = this.itemsArr.concat(
            pokemons.map((pokemon) => {
              const obj = {
                itemId: itemId,
                isPokemon: isPokemon,
                item: pokemon,
              };
              this.itemsArr.push(obj);
              return obj;
            })
          );
          return { itemId: itemId, isPokemon, items: pokemons };
        } catch (e) {
          console.log(e);
          const obj = {
            itemId: itemId,
            isPokemon: false,
            item: "pokemon not found",
          };
          this.itemsArr.push(obj);

          throw "pokemon not found";
        }
      }
    } else {
      this.itemsArr.push({ isPokemon: false, item: arr[0] });
      return { itemId: itemId, isPokemon, items: arr };
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
