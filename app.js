const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const inputSearchPokemon = document.querySelector("#search_Pokemon");

const generatePokemonPromises = () =>
  Array(150)
    .fill()
    .map((_, index) => {
      return fetch(getPokemonUrl(index + 1)).then((response) =>
        response.json()
      );
    });

const generateHTML = (pokemons) =>
  pokemons.reduce((acumalador, { name, id, types }) => {
    const ElementTypes = types.map((typeInfo) => typeInfo.type.name);

    acumalador += `
            <li class="card ${ElementTypes[0]}">
                <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                <h2 class="card-title">${id}. <span class="nome_pokemon">${name}</span></h2>
                <p class="card-subtitle">${ElementTypes.join(" | ")}</p>
            </li>`;

    return acumalador;
  }, "");

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPage);

const printPokemonScreen = (inputValue) => (card) => {
  const pokemon = card
    .querySelector(".nome_pokemon")
    .textContent.toLocaleLowerCase();

  const cardContainsInputValue = pokemon.includes(inputValue);

  if (cardContainsInputValue) {
    card.style.display = "block";
    return;
  }

  card.style.display = "none";
};

const filterPokemon = (e) => {
  e.preventDefault();

  let searchPokemon = e.target.value.toLocaleLowerCase();

  const cards = document.querySelectorAll(".card");

  cards.forEach(printPokemonScreen(searchPokemon));
};

inputSearchPokemon.addEventListener("input", filterPokemon);

// const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

// const generatePokemonPromises = async () => Array(150).fill().map(async (_, index) => {
//     const pokemons = await fetch(getPokemonUrl(index + 1));
//     return pokemons.json();
// });

// const generateHTML = pokemons => pokemons.reduce((acumalador, { name, id, types }) => {
//     const ElementTypes = types.map(typeInfo => typeInfo.type.name);

//     acumalador += `
//             <li class="card ${ElementTypes[0]}">
//                 <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
//                 <h2 class="card-title">${id}. ${name}</h2>
//                 <p class="card-subtitle">${ElementTypes.join(" | ")}</p>
//             </li>`;

//     return acumalador
// }, "");

// const insertPokemonsIntoPage = pokemons => {
//     const ul = document.querySelector('[data-js="pokedex"]');
//     ul.innerHTML = pokemons
// }

// // const pokemonPromises = generatePokemonPromises();

// // Promise.all(pokemonPromises)
// //     .then(generateHTML)
// //     .then(insertPokemonsIntoPage)

// async function getDatePokemons() {
//     let pokemonPromises = await Promise.all(await generatePokemonPromises())
//     let pokemons = generateHTML(pokemonPromises);
//     insertPokemonsIntoPage(pokemons);
// }

// getDatePokemons()
