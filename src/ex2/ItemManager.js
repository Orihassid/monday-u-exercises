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
    if (!isPokemon) {
      //check pokemon by name
      const res = await this.pokemonClinet.checkByPokemonName(arr[0]);
      if (res) {
        const isExist = this.isExistInItemsArr(res);
        if (!isExist) {
          const obj = this.setObj(true, res);
          this.itemsArr.push(obj);
          this.newItems.push(obj);
        }
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
            const obj = this.setObj(isPokemon, pokemon);
            this.itemsArr.push(obj);
            this.newItems.push(obj);
            return obj;
          });
        } catch (e) {
          let str = "";
          filteredArr.forEach((elem) => {
            str += elem + " ";
          });
          const obj = this.setObj(
            false,
            `pokemon with id: ${str} was not found`
          );

          this.itemsArr.push(obj);
          this.newItems.push(obj);
        }
      }
    } else {
      const obj = this.setObj(false, arr[0]);
      this.itemsArr.push(obj);
      this.newItems.push(obj);
    }
  }

  

  setObj(isPokemon, item) {
    const itemId = this.generateId();
    const obj = {
      itemId: itemId,
      isPokemon: isPokemon,
      item: item,
    };
    return obj;
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
  isExistInItemsArr(obj) {
    let res = false;
    this.itemsArr.forEach((elem) => {
      if (elem.isPokemon) {
        if (elem.item.id === obj.id) res = true;
      }
    });
    return res;
  }
}

export default ItemManager;
