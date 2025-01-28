const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const pokemonType = document.querySelector('#spec');
const pokemonAbilities = document.querySelector("#skills");
const pokemonEvolution = document.querySelector("#evo");

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.button.btn-prev');
const buttonNext = document.querySelector('.button.btn-next');
const troll = document.querySelector('pokemon_name')



let searchPokemon = 1


const fetchPokemon = async(pokemon) =>{

 const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status == 200){
        const data = await APIresponse.json();
        return(data);

    }


}


const fetchEvolutionChain = async (speciesUrl) => {
    // A URL de species fornece a URL da cadeia evolutiva
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const evolutionUrl = speciesData.evolution_chain.url;

    

    // Agora pegamos a URL da cadeia de evolução
    const evolutionResponse = await fetch(evolutionUrl);
    const evolutionData = await evolutionResponse.json();
    
    return evolutionData;

    
};



const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonAbilities.innerHTML = data['abilities']['0']['ability']['name'];
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonType.innerHTML = data['types']['0']['type']['name']

        const evolutionData = await fetchEvolutionChain(data.species.url);
        const evolutionChain = [];
        let currentEvolution = evolutionData.chain;

        // Extraindo as evoluções da cadeia
        while (currentEvolution) {
            evolutionChain.push(currentEvolution.species.name);
            currentEvolution = currentEvolution.evolves_to ? currentEvolution.evolves_to[0] : null;
        }

        // Exibindo a cadeia evolutiva
        pokemonEvolution.innerHTML = ` ${evolutionChain.join(' → ')}`;



        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonName.innerHTML = 'Não Encontrado'

        pokemonNumber.innerHTML = '';
        pokemonImg.src = '';
        pokemonAbilities.innerHTML = 'Não Informado';
        pokemonEvolution.innerHTML = 'Não Informado';
        input.value = '';
    }   
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
 
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
    searchPokemon -=1;
    renderPokemon(searchPokemon)
    }
 });

 buttonNext.addEventListener('click', () => {
    searchPokemon +=1;
    renderPokemon(searchPokemon)
 });





 