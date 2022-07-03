// The ItemManager should go here. Remember that you have to export it.
// const  autoDeleteCache  = require("../cache/cache.js");

const pokemonClinet = require("../clients/pokemonClient.js");
const { Item } = require("../DB/models");
const fs = require("fs").promises;
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.taskDbFilePathName = "./server/DB/tasksDB.json";
  }

  async getAllItems() {
    try {
      this.itemsArr = await Item.findAll({ raw: true });
      return this.itemsArr;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteAllItems() {
    try {
      this.itemsArr = [];
      await Item.destroy({
        where: {},
        truncate: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  async checkByPokemonName(pokemon, newItemsToRender) {
    try {
      const isExist = await this.isExistInDb(pokemon.id);
      if (!isExist) {
        const task = this.initTask(
          true,
          pokemon.name,
          pokemon.sprites.front_default,
          pokemon.id
        );
        this.itemsArr.push(task);
        await Item.bulkCreate([task]);
        return [task];
      }
      return newItemsToRender;
    } catch (err) {
      throw new Error(err);
    }
  }

  async fetchPokemonByNumberId(filteredArr, newItemsToRender) {
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
        newItemsToRender.push(task);
      });
      await Item.bulkCreate(newItemsToRender);
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
      newItemsToRender.push(task);
      await Item.bulkCreate(newItemsToRender);
    }
    return newItemsToRender;
  }
  generateId() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  async addItem(isPokemon, inputArr) {
    const newItemsToRender = [];
    if (!isPokemon) {
      //check pokemon by name
      const isPokemon = await pokemonClinet.checkByPokemonName(inputArr[0]);
      if (isPokemon)
        return this.checkByPokemonName(isPokemon, newItemsToRender);
    }
    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(inputArr);

      if (filteredArr.length === 0) return newItemsToRender;
      return this.fetchPokemonByNumberId(filteredArr, newItemsToRender);
    } else {
      const task = this.initTask(false, inputArr[0]);
      this.itemsArr.push(task);
      newItemsToRender.push(task);
      await Item.bulkCreate(newItemsToRender);
      return newItemsToRender;
    }
  }

  initTask(isPokemon, item, imageUrl = null, pokemonId = null) {
    const itemId = this.generateId();
    const task = {
      itemId: itemId,
      itemName: item,
      imageUrl: imageUrl,
      isPokemon: isPokemon,
      pokemonId: pokemonId,
      status: false,
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
      const idx = this.itemsArr.findIndex((item)=>{item.itmId===itemId})
      this.itemsArr.splice(idx,1)
      await Item.destroy({ where: { itemId: itemId } });
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
  async isExistInDb(pokemonId) {
    try {
      const itemFromDb = await Item.findOne({
        where: { pokemonId: pokemonId },
        raw: true,
      });
      if (itemFromDb !== null && itemFromDb.pokemonId === pokemonId)
        return true;
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateStatusInDb(itemId, newStatus) {
    try {
      const status = newStatus;
      await Item.update({ status }, { where: { itemId: itemId } });
    } catch (err) {
      throw new Error(err);
    }
  }

  async editTaskNameInDb(itemId, newTaskName) {
    try {
      const itemName = newTaskName;
      await Item.update({ itemName }, { where: { itemId: itemId } });
    } catch (err) {
      throw new Error(err);
    }
  }
}
module.exports = new ItemManager();
