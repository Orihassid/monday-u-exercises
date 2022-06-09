import { fetchPokemon, checkByPokemonName } from "./pokemonClient.js";
import { promises as fs } from "fs";

let itemsArr = [];

function generateId() {
  let maxId = 0;

  itemsArr.forEach((item) => {
    maxId = Math.max(maxId, item.itemId);
  });
  const newId = maxId + 1;
  return newId;
}

export async function addItem(isPokemon, arr) {
  try {
    const todoJsonFile = await fs.readFile("tasksDB.json");
    itemsArr = JSON.parse(todoJsonFile);
  } catch (err) {
    await fs.writeFile("tasksDB.json", JSON.stringify(itemsArr));
  }

  if (!isPokemon) {
    //check pokemon by name
    const res = await checkByPokemonName(arr[0]);
    if (res) {
      const isExist = isExistInItemsArr(res);
      if (!isExist) {
        const task = initItem(
          true,
          res.name,
          res.sprites.front_default,
          res.id
        );
        itemsArr.push(task);
        await fs.writeFile("tasksDB.json", JSON.stringify(itemsArr));
      }
      return;
    }
  }
  if (isPokemon) {
    const filteredArr = getItemsToAdd(arr);
    if (filteredArr.length == 0) return;
    try {
      const pokemons = await fetchPokemon(filteredArr);
      pokemons.forEach(async (pokemon) => {
        const task = initItem(
          isPokemon,
          pokemon.name,
          pokemon.sprites.front_default,
          pokemon.id
        );
        itemsArr.push(task);
        return task;
      });
      await fs.writeFile("tasksDB.json", JSON.stringify(itemsArr));
    } catch (e) {
      let pokemonId = "";
      filteredArr.forEach((task) => {
        pokemonId += task + " ";
      });
      const task = initItem(
        false,
        `pokemon with id: ${pokemonId} was not found`
      );
      await fs.writeFile("tasksDB.json", JSON.stringify(itemsArr));
      itemsArr.push(task);
    }
  } else {
    const task = initItem(false, arr[0]);
    itemsArr.push(task);
    await fs.writeFile("tasksDB.json", JSON.stringify(itemsArr));
  }
}

function initItem(isPokemon, item, imageUrl = "", pokemonId = "") {
  const itemId = generateId();
  const task = {
    itemId: itemId,
    isPokemon: isPokemon,
    item: item,
    imageUrl: imageUrl,
    pokemonId: pokemonId,
  };
  return task;
}

export async function deleteItem(itemId) {
  try {
    const todoJsonFile = await fs.readFile("tasksDB.json");
    itemsArr = JSON.parse(todoJsonFile);

    const idx = itemsArr.findIndex((item) => item.itemId === itemId);
    if (idx == -1) throw "err";

    itemsArr.splice(idx, 1);
    await fs.writeFile("tasksDB.json", JSON.stringify(itemsArr));
  } catch (err) {
    throw `There is no task with id: ${itemId} `;
  }
}

function getItemsToAdd(arr) {
  const pokemonsIdArr = itemsArr
    .filter((obj) => obj.isPokemon)
    .map((obj) => obj.pokemonId.toString());
  return arr.filter((id) => !pokemonsIdArr.includes(id));
}
function isExistInItemsArr(obj) {
  return itemsArr.some((item) => item.isPokemon && item.item.id === obj.id);
}
