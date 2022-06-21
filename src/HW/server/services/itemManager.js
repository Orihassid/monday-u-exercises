// The ItemManager should go here. Remember that you have to export it.
// const  autoDeleteCache  = require("../cache/cache.js");

const fsExists = require("fs.promises.exists");
const pokemonClinet = require("../clients/pokemonClient.js");
const { Item } = require("../DB/models");
const fs = require("fs").promises;
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.newItems = [];
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
    try{
    this.itemsArr = [];
    this.newItems = [];
    await Item.destroy({
      where: {},
      truncate: true,
    });
  }
    catch(err){
      throw new Error(err);
    }
  }

  async checkByPokemonName(pokemon) {
    try{
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
    return this.newItems;
  }
  catch(err){
  throw new Error(err);
  }
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
      await Item.bulkCreate(this.newItems);
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
      await Item.bulkCreate(this.newItems);
    }
    return this.newItems;
  }
  generateId() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  async addItem(isPokemon, inputArr) {
    this.newItems = [];
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
      await Item.bulkCreate(this.newItems);
      return this.newItems;
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
      status:false
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
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
      if (itemFromDb!==null&& itemFromDb.pokemonId === pokemonId) return true;
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }
  async  updateStatusInDb(itemId, newStatus){
  try{
    let status = newStatus
    await Item.update({status},{ where: { itemId: itemId } })
  }
  catch(err)
  {
  throw new Error(err)
  }
  
  }
}
module.exports = new ItemManager();
