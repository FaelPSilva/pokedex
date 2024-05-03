const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const pokemonType = document.querySelector('#spec');

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

const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        pokemonType.innerHTML = data['types']['0']['type']['name']
        input.value = '';
        searchPokemon = data.id;

    } else {
        pokemonName.innerHTML = 'Não Encontrado'
        pokemonNumber.innerHTML = '';
        pokemonImg.src = '';
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





 