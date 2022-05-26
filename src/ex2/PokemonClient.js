class PokemonClinet {
  constructor() {}
  fetchPokemon(arr) {
    const respones = [];
    arr.forEach((id) => {
      const data = fetch("https:pokeapi.co/api/v2/pokemon/"+ id);
      respones.push(data);
    });
     return Promise.all(respones)
      .then((res) => Promise.all(res.map((r) => r.json())))
     

}
}

export default PokemonClinet;
