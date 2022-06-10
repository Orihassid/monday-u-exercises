import fetch from "node-fetch";
export async function fetchPokemon(arr) {
  try{
  const respones = arr.map((id) => fetch(`https:pokeapi.co/api/v2/pokemon/${id}`));
  return Promise.all(respones).then((res) =>
    Promise.all(res.map((r) => r.json()))
  );
  }
  catch(err)
  {
    console.log('failed to fetch pokemon by id')
  }
}

export async function checkByPokemonName(name) {

  let respones = [];
  try {
    respones = await fetch(
      `https:pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
  } catch (err) {
    console.log("failed to fetch pokemon list");
  }
  try {
    const pokemonsArrList = await respones.json();

    let res = null;
    for (const obj of pokemonsArrList.results) {
      if (obj.name === name.toLowerCase()) {
        const response = await fetch(obj.url);
        const pokemonObj = await response.json();
        res = pokemonObj;
      }
    }
    return res;
  } catch (err) {
    console.log("failed to fetch pokemon by his name");
  }
}
