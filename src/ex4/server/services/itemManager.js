// The ItemManager should go here. Remember that you have to export it.

import PokemonClinet from "../clients/pokemonClient.js";
import { promises as fs } from "fs";
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.newItems = [];
  }


  

  generateId() {
    let maxId = 0;

    this.itemsArr.forEach((item) => {
      maxId = Math.max(maxId, item.itemId);
    });
    const newId = maxId + 1;
    return newId;
  }

  async addItem(isPokemon, arr) {
    try {
      const todoJsonFile = await fs.readFile("tasksDB.json");
      this.itemsArr = JSON.parse(todoJsonFile);
    } catch (err) {
      await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
    }

    if (!isPokemon) {
      //check pokemon by name
      const res = await PokemonClinet.checkByPokemonName(arr[0]);
      if (res) {
        const isExist = this.isExistInItemsArr(res);
        if (!isExist) {
          const task = this.initTask(
            true,
            res.name,
            res.sprites.front_default,
            res.id
          );
          this.itemsArr.push(task);
          await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
        }
        return;
      }
    }
    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(arr);
      if (filteredArr.length == 0) return;
      try {
        const pokemons = await PokemonClinet.fetchPokemon(filteredArr);
        pokemons.forEach(async (pokemon) => {
          const task = initItem(
            isPokemon,
            pokemon.name,
            pokemon.sprites.front_default,
            pokemon.id
          );
          this.itemsArr.push(task);
          return task;
        });
        await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
      } catch (e) {
        let pokemonId = "";
        filteredArr.forEach((task) => {
          pokemonId += task + " ";
        });
        const task = this.initTask(
          false,
          `pokemon with id: ${pokemonId} was not found`
        );
        await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
        this.itemsArr.push(task);
      }
    } else {
      const task = this.initTask(false, arr[0]);
      this.itemsArr.push(task);
      await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
    }
  }

  initTask(isPokemon, item, imageUrl = "", pokemonId = "") {
    const itemId = this.generateId();
    const task = {
      itemId: itemId,
      isPokemon: isPokemon,
      item: item,
      imageUrl: imageUrl,
      pokemonId: pokemonId,
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
      const todoJsonFile = await fs.readFile("tasksDB.json");
      this.itemsArr = JSON.parse(todoJsonFile);

      const idx = this.itemsArr.findIndex((item) => item.itemId == itemId);

      if (idx == -1) throw "err";

      this.itemsArr.splice(idx, 1);
      await fs.writeFile("tasksDB.json", JSON.stringify(this.itemsArr));
    } catch (err) {
      throw `There is no task with id: ${itemId} `;
    }
  }

  getItemsToAdd(arr) {
    const pokemonsIdArr = this.itemsArr
      .filter((obj) => obj.isPokemon)
      .map((obj) => obj.pokemonId.toString());
    return arr.filter((id) => !pokemonsIdArr.includes(id));
  }
  isExistInItemsArr(obj) {
    return this.itemsArr.some(
      (item) => item.isPokemon && item.item.id === obj.id
    );
  }
}
export default new ItemManager();
