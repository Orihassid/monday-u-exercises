// The ItemManager should go here. Remember that you have to export it.

import pokemonClinet from "../clients/pokemonClient.js";
import { promises as fs } from "fs";
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.newItems = [];
    this.jsonFile = "tasksDB.json";
  }

  async getAllItems() {
    try {
      const todoJsonFile = await fs.readFile(this.jsonFile);
      this.itemsArr = JSON.parse(todoJsonFile);
      return this.itemsArr;
    } catch (err) {
      return this.itemsArr;
    }
  }

  async deleteAllItems() {
    this.itemsArr = [];
    this.newItems = [];
    await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
  }

  async readFile() {
    try {
      const todoJsonFile = await fs.readFile(this.jsonFile);
      this.itemsArr = JSON.parse(todoJsonFile);
    } catch (err) {
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
    }
  }

  async checkByPokemonName(pokemon) {
    const isExist = this.isExistInItemsArr(pokemon);
    if (!isExist) {
      const task = this.initTask(
        true,
        pokemon.name,
        pokemon.sprites.front_default,
        pokemon.id
      );
      this.itemsArr.push(task);

      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
      return [task];
    }
    return this.newItems;
  }
  async fetchPokemonByNumberId(filteredArr) {
    try {
      const pokemons = await pokemonClinet.fetchPokemon(filteredArr);

      pokemons.forEach((pokemon) => {
        const task = this.initTask(
          true,
          pokemon.name,
          pokemon.sprites.front_default,
          pokemon.id
        );
        this.itemsArr.push(task);
        this.newItems.push(task);
      });
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
    } catch (e) {
      let pokemonId = "";
      filteredArr.forEach((task) => {
        pokemonId += task + " ";
      });
      const task = this.initTask(
        false,
        `pokemon with id: ${pokemonId} was not found`
      );
      this.itemsArr.push(task);
      this.newItems.push(task);
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
    }
    return this.newItems;
  }
  generateId() {
    let maxId = 0;

    this.itemsArr.forEach((item) => {
      maxId = Math.max(maxId, item.itemId);
    });
    const newId = maxId + 1;
    return newId;
  }

  async addItem(isPokemon, inputArr) {
    this.newItems = [];
    this.readFile();
    if (!isPokemon) {
      //check pokemon by name
      const isPokemon = await pokemonClinet.checkByPokemonName(inputArr[0]);
      if (isPokemon) return this.checkByPokemonName(isPokemon);
    }
    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(inputArr);
      if (filteredArr.length === 0) return this.newItems;
      return this.fetchPokemonByNumberId(filteredArr);
    } else {
      const task = this.initTask(false, inputArr[0]);
      this.itemsArr.push(task);
      this.newItems.push(task);
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
      return this.newItems;
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
      this.readFile();
      const idx = this.itemsArr.findIndex((item) => item.itemId === itemId);
      if (idx === -1) throw "err";
      this.itemsArr.splice(idx, 1);
      await fs.writeFile(this.jsonFile, JSON.stringify(this.itemsArr));
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
      (item) => item.isPokemon && item.pokemonId === obj.id
    );
  }
}
export default new ItemManager();
