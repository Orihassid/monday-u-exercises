import PokemonClinet from "./PokemonClient.js";

let itemsArr = [];
const pokemonClinet = new PokemonClinet();
newItems = [];

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

async function addItem(isPokemon, arr) {
  newItems = [];
  if (!isPokemon) {
    //check pokemon by name
    const res = await pokemonClinet.checkByPokemonName(arr[0]);
    if (res) {
      const isExist = isExistInItemsArr(res);
      if (!isExist) {
        const obj = setObj(true, res);
        itemsArr.push(obj);
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
        const pokemons = await pokemonClinet.fetchPokemon(filteredArr);
        pokemons.forEach((pokemon) => {
          const obj = setObj(isPokemon, pokemon);
          itemsArr.push(obj);
          newItems.push(obj);
          return obj;
        });
      } catch (e) {
        let str = "";
        filteredArr.forEach((elem) => {
          str += elem + " ";
        });
        const obj = setObj(false, `pokemon with id: ${str} was not found`);

        itemsArr.push(obj);
        newItems.push(obj);
      }
    }
  } else {
    const obj = setObj(false, arr[0]);
    itemsArr.push(obj);
    newItems.push(obj);
  }
}

function setObj(isPokemon, item) {
  const itemId = generateId();
  const obj = {
    itemId: itemId,
    isPokemon: isPokemon,
    item: item,
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
    .map((obj) => obj.item.id.toString());
  return arr.filter((id) => !pokemonsIdArr.includes(id));
}
function isExistInItemsArr(obj) {
  let res = false;
  itemsArr.forEach((elem) => {
    if (elem.isPokemon) {
      if (elem.item.id === obj.id) res = true;
    }
  });
  return res;
}

module.exports = {
  addItem: addItem,
};
