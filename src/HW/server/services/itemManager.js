// The ItemManager should go here. Remember that you have to export it.
// const  autoDeleteCache  = require("../cache/cache.js");
const  fsExists  =  require("fs.promises.exists");
const  pokemonClinet  = require( "../clients/pokemonClient.js");
const {Item} = require('../DB/models')
const fs = require("fs").promises
class ItemManager {
  constructor() {
    this.itemsArr = [];
    this.newItems = [];
    this.taskDbFilePathName = "./server/DB/tasksDB.json";
  }

  async getAllItems() {
    try {
      this.itemsArr = await Item.findAll()
      return this.itemsArr;
    } catch (err) {
      throw new Error(err);
    }
  }
  async isPokemonIdInCache(pokemonIdArr) {
    const cacheFilePath = "./server/DB/cache.json";
    let cacheData = [];
    try {
      if (!(await fsExists(cacheFilePath))) {
        pokemonIdArr.forEach((pokemonId) => {
          cacheData.push(parseInt(pokemonId));
        });
        await this.writeTofile(cacheFilePath, cacheData);
       // autoDeleteCache();
        return false;
      } else {
        cacheData = JSON.parse(await fs.readFile(cacheFilePath));
        const isPokemonExist = cacheData.some(
          (pokemonId) => pokemonId === parseInt(pokemonIdArr[0])
        );
        if (isPokemonExist) return true;
        else {
          cacheData.push(parseInt(pokemonIdArr[0]));
          await this.writeTofile(cacheFilePath, cacheData);
          //autoDeleteCache();
          return false;
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteAllItems() {
    this.itemsArr = [];
    this.newItems = [];
    Item.destroy({
      where: {},
      truncate: true
    })
    await this.writeTofile(this.taskDbFilePathName, this.itemsArr);
  }

  async readFile() {
    try {
      if (await fsExists(this.taskDbFilePathName)) {
        const todoJsonFile = await fs.readFile(this.taskDbFilePathName);
        this.itemsArr = JSON.parse(todoJsonFile.toString());
      } else {
        await this.writeTofile(this.taskDbFilePathName, this.itemsArr);
      }
    } catch (err) {
      throw new Error(err);
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
      await Item.bulkCreate([task]);
      return [task];
    }
    return this.newItems;
  }

  async writeTofile(fileName, data) {
    try {
      await fs.writeFile(fileName, JSON.stringify(data));
    } catch (err) {
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
      // await this.writeTofile(this.taskDbFilePathName, this.itemsArr);
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
      Item.bulkCreate(this.newItems);
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
    await this.readFile();
    if (!isPokemon) {
      //check pokemon by name
      const isPokemon = await pokemonClinet.checkByPokemonName(inputArr[0]);
      if (isPokemon) return this.checkByPokemonName(isPokemon);
    }
    if (isPokemon) {
      const filteredArr = this.getItemsToAdd(inputArr);

      if (filteredArr.length === 0) return this.newItems;
      // const res = await this.isPokemonIdInCache(filteredArr);
      // if (res == true) return this.newItems;
      return this.fetchPokemonByNumberId(filteredArr);
    } else {
      const task = this.initTask(false, inputArr[0]);
      this.itemsArr.push(task);
      this.newItems.push(task);
      await Item.bulkCreate(this.newItems);
      //await this.writeTofile(this.taskDbFilePathName, this.itemsArr);
      return this.newItems;
    }
  }

  initTask(isPokemon, item, imageUrl = "", pokemonId = "") {
    const itemId = this.generateId();
    const task = {
      itemId: itemId,
      itemName: item,
      imageUrl: imageUrl,
      pokemonId: pokemonId,
      isPokemon: isPokemon,
      status:false
    };
    return task;
  }

  async deleteItem(itemId) {
    try {
      const idx = this.itemsArr.findIndex((item) => item.itemId === itemId);
      if (idx === -1) throw "err";
      this.itemsArr.splice(idx, 1);
      Item.destroy({ where: { itemId: itemId } })
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
module.exports  =  new ItemManager();
