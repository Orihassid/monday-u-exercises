import { fetchPokemon, checkByPokemonName } from "./pokemonClient.js";
import { promises as fs } from "fs";


export let itemsArr = [];
export let newItems = [];

function deleteAllItems() {
  itemsArr = [];
  newItems = [];
}

function generateId() {
  let max_id = 0;

  itemsArr.forEach((item) => {
    max_id = Math.max(max_id, item.itemId);
  });
  const newId = max_id + 1;
  return newId;
}

export async function addItem(isPokemon, arr) {
  const todoJsonFile = await fs.readFile("tasks.json");
  itemsArr = JSON.parse(todoJsonFile)


  newItems = [];
  if (!isPokemon) {
    //check pokemon by name
    const res = await checkByPokemonName(arr[0]);
    if (res) {
      const isExist = isExistInItemsArr(res);
      if (!isExist) {
        const obj = setObj(true, res.name,res.sprites.front_default,res.id);
        itemsArr.push(obj);
        await fs.writeFile("tasks.json", JSON.stringify(itemsArr));
        newItems.push(obj);
      }
      return;
    }
  }
  if (isPokemon) {
    const filteredArr = getItemsToAdd(arr);
    if (filteredArr.length == 0) {
      return null;
    } else {
      try {
        const pokemons = await fetchPokemon(filteredArr);
        pokemons.forEach(async (pokemon) => {
          const obj = setObj(isPokemon, pokemon.name,pokemon.sprites.front_default,pokemon.id);
          itemsArr.push(obj);
          await fs.writeFile("tasks.json", JSON.stringify(itemsArr));
          newItems.push(obj);
          return obj;
        });
      } catch (e) {
        let str = "";
        filteredArr.forEach((elem) => {
          str += elem + " ";
        });
        const obj = setObj(false, `pokemon with id: ${str} was not found`);
        await fs.writeFile("tasks.json", JSON.stringify(itemsArr));
        itemsArr.push(obj);
        newItems.push(obj);
      }
    }
  } else {
    const obj = setObj(false, arr[0]);
    itemsArr.push(obj);
    newItems.push(obj);
    await fs.writeFile("tasks.json", JSON.stringify(itemsArr));
    return newItems;
  }
}

function setObj(isPokemon, item,imageUrl = '',pokemonId = '') {
  const itemId = generateId();
  const obj = {
    itemId: itemId,
    isPokemon: isPokemon,
    item: item,
    imageUrl:imageUrl,
    pokemonId:pokemonId

  };
  return obj;
}

function deleteItem(itemId) {
  const idx = itemsArr.findIndex((elem) => {
    if (elem.itemId == itemId) return true;
  });
  itemsArr.splice(idx, 1);
}

function getItemsToAdd(arr) {
  const pokemonsIdArr = itemsArr
    .filter((obj) => obj.isPokemon)
    .map((obj) => obj.pokemonId.toString());
  return arr.filter((id) => !pokemonsIdArr.includes(id));
}
function isExistInItemsArr(obj) {
  let res = false;
  itemsArr.forEach((elem) => {
    if (elem.isPokemon) {
      if (elem.pokemonId == obj.id) res = true;
    }
  });
  return res;
}
