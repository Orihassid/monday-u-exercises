class PokemonClinet {
  constructor() {}
  fetchPokemon(arr) {
    if (arr.length === 1) {
      console.log("here", arr);
      this.getSinglePokemon(arr);
    } else this.getMultiPokemons(arr);
  }
  async getSinglePokemon(arr) {
    const response = await fetch("https:pokeapi.co/api/v2/pokemon/" + arr[0]);
    const pokemon = await response.json();
    console.log(pokemon);
    //return pokemon
  }
  getMultiPokemons(arr) {
    const responses = [];
    const result = [];
    arr.forEach((id) => {
      const data = fetch("https:pokeapi.co/api/v2/pokemon/" + id);
      console.log(data);
      responses.push(data);
    });
    Promise.all(responses).then((res) => {
      res.forEach((elem) => {
        elem.json().then((data) => result.push(data.name));
      });
    });
    console.log(result)

  }
}

export default PokemonClinet;
