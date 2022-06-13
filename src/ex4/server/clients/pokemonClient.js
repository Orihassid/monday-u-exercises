// The Pokemon Client (using axios) goes here
import axios from "axios";

class PokemonClinet {
  constructor() {}

  async fetchPokemon(arr) {
    try {
      const respones = arr.map((id) =>
        axios.get(`https:pokeapi.co/api/v2/pokemon/${id}`)
      );
      return Promise.all(respones).then((res) =>
        Promise.all(res.map((r) => r.json()))
      );
    } catch (err) {
      console.log("failed to fetch pokemon by id");
    }
  }

  async checkByPokemonName(name) {
    console.log('checkbyname')
    let respones = [];
    try {
      respones = await axios.get(
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
}



export default new PokemonClinet();
