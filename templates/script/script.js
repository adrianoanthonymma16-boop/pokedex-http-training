//VARIÁVEIS GLOBAIS
let Offset = 0;
const Limit = 5;

//CLASSE POKEMON (GLOBAL - FORA DE QUALQUER FUNÇÃO)

class Pokemon { 
    constructor(name, primaryType, secondaryType, image) {
        this.name = name;
        this.primaryType = primaryType;
        this.secondaryType = secondaryType || null;
        this.image = image;
    }
}

async function getDetails(offset = Offset, limit = Limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const detailPromises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    Offset += Limit;
    return Promise.all(detailPromises);
}

//FUNÇÃO PARA TRANSFORMAR DADOS DA API EM POKEMON
function transformarEmPokemon(dados) {
    return dados.map(pokemon => {
        const primaryType = pokemon.types[0]?.type?.name || 'unknown';
        const secondaryType = pokemon.types[1]?.type?.name || null; 
        const image = pokemon.sprites.other.dream_world.front_default;
        return new Pokemon(pokemon.name, primaryType, secondaryType, image);
    });
}

function convertPokemonToLi(pokemon) {
    const primaryClass = pokemon.primaryType || 'unknown';
    const secondaryClass = pokemon.secondaryType ? `pokemon-type ${pokemon.secondaryType}` : '';

    const li = document.createElement('li');
    li.className = `card-type-${primaryClass}`;
    li.innerHTML = `
        <span class="pokemon-card">
            <h2 class="pokemon-name">${pokemon.name}</h2>
            <p class="pokemon-type ${primaryClass}">${pokemon.primaryType}</p>
            ${pokemon.secondaryType ? `<p class="pokemon-type ${pokemon.secondaryType}">${pokemon.secondaryType}</p>` : ''}
            <img src="${pokemon.image}" alt="${pokemon.name}">
        </span>
    `;
    return li;
}

function insertPokemonIntoList(pokemonList) {
    const pokedex = document.getElementById('pokedex');
    pokemonList.forEach(pokemon => {
        const li = convertPokemonToLi(pokemon);
        pokedex.appendChild(li);
    });
}

async function Main() {
    const pokemons = await getDetails();
    const listaPokemon = transformarEmPokemon(pokemons);
    insertPokemonIntoList(listaPokemon);
}

//INICIALIZA O BOTÃO
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreButton = document.getElementById('loadMore');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', async () => {
            const pokemons = await getDetails();
            const listaPokemon = transformarEmPokemon(pokemons);
            insertPokemonIntoList(listaPokemon);
        });
    } else {
        console.error("❌ Botão 'loadMore' não encontrado!");
    }
});

//CARREGA OS PRIMEIROS POKÉMON
Main();