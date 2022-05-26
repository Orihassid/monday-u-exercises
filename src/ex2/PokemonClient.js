class PokemonClinet {
  constructor() {}
  fetchPokemon(arr) {
    const respones = [];
    arr.forEach((id) => {
      const data = fetch(`https:pokeapi.co/api/v2/pokemon/${id}`);
      respones.push(data);
    });
    return Promise.all(respones).then((res) =>
      Promise.all(res.map((r) => r.json()))
    );
  }
  async checkByPokemonName(name) {
    const response = await fetch(
      `https:pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
    const pokemonsArrList = await response.json();
      let res= null
    for (const obj of pokemonsArrList.results) {
      if (obj.name === name.toLowerCase()) {
        const response = await fetch(obj.url);
        const pokemonObj = await response.json();
        res= pokemonObj;
      }
    }
    console.log(res,'heyyu')
    return res
  }
}

export default PokemonClinet;
