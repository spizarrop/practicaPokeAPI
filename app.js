
/**
 * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH
 */
/**
 * Función para buscar pokemon ejercicio 1 y 2.
 * 
*/
const coleccion = [];

async function buscarPokemon() {

    let pokeNombre = document.getElementById('pokemon-input').value;
    let shiny = false;
    if (pokeNombre.slice(-1) == '*') {
        pokeNombre = pokeNombre.slice(0, -1);
        shiny = true;
    }
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeNombre;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`No es un Pokémon`);
        }

        const pokeJson = await respuesta.json();

        const pokemonData = document.getElementById('pokemon-data');
        pokemonData.innerHTML = '';

        const nombre = pokemonData.appendChild(document.createElement("p"));
        const sprite = pokemonData.appendChild(document.createElement("img"));
        const agregar = pokemonData.appendChild(document.createElement("button"));

        nombre.textContent = `${pokeJson.name} (#${pokeJson.id})`;

        if (shiny) {
            sprite.src = pokeJson.sprites.front_shiny;
        } else {
            sprite.src = pokeJson.sprites.front_default;
        }
        sprite.style.width = '200px';

        agregar.textContent = "Agregar a la colección";
        agregar.id = "coleccion-btn";
        agregar.addEventListener('click', () => {
            coleccion.push({
                name: pokeJson.name,
                id: pokeJson.id,
                sprite: shiny
                    ? pokeJson.sprites.front_shiny
                    : pokeJson.sprites.front_default
            });
            alert(`${pokeJson.name} agregado a la colección`);
        });

    } catch (error) {
        buscarPorTipo(pokeNombre);
    }
}

/* function buscarPokemon() {

    let pokeNombre = document.getElementById('pokemon-input').value;
    let shiny = false;
    if (pokeNombre.slice(-1) == '*') {
        pokeNombre = pokeNombre.slice(0, -1);
        shiny = true;
    }
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeNombre;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(
            pokeJson => {

                const pokemonData = document.getElementById('pokemon-data');
                pokemonData.innerHTML = '';

                const nombre = pokemonData.appendChild(document.createElement("p"));
                const sprite = pokemonData.appendChild(document.createElement("img"));

                nombre.textContent = `${pokeJson.name} (#${pokeJson.id})`;

                if(shiny){
                    sprite.src = pokeJson.sprites.front_shiny;
                } else{
                    sprite.src = pokeJson.sprites.front_default;
                }

                sprite.style.width = '200px';
            }
        )
        .catch(error => pokemonData.innerHTML = `<p>No es un Pokémon ni un tipo válido</p>`;);
} */

/**
 *  Descomentar para hacer uso de la función.
 */
document.getElementById('search-btn').addEventListener('click', buscarPokemon);


/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */

/* function buscarPokemonJQueryAJAX() {

    let pokeNombre = $('#pokemon-input').val();
    let shiny = false;
    if (pokeNombre.slice(-1) == '*') {
        pokeNombre = pokeNombre.slice(0, -1);
        shiny = true;
    }
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeNombre;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (pokeJson) {
            const pokemonData = $('#pokemon-data');
            pokemonData.html('');

            const nombre = $('<p>').text(pokeJson.name + ' (#' + pokeJson.id +')');
            const sprite = $('<img>');

            if (shiny) {
                sprite.attr('src', pokeJson.sprites.front_shiny);

            } else {
                sprite.attr('src', pokeJson.sprites.front_default);
            }
            sprite.css('width', '200px');

            pokemonData.append(nombre, sprite);
        },
        error: function (error) {
            pokemonData.innerHTML = `<p>No es un Pokémon ni un tipo válido</p>`;
        }
    });
} */

/**
 * Haciendo uso de JQuery, descomentar para usar la función buscarPokemonJQueryAJAX
*/
/* $(document).ready(function () {
    $('#search-btn').on('click', buscarPokemonJQueryAJAX);
});
 */
/**
 * Mostrar colección
 */
document.getElementById('view-collection-btn').addEventListener('click', () => {
    const collectionList = document.getElementById('collection-list');
    collectionList.innerHTML = '';

    coleccion.forEach(pokemon => {
        const card = document.createElement('div');

        const nombre = document.createElement('p');
        const img = document.createElement('img');

        nombre.textContent = `${pokemon.name} (#${pokemon.id})`;
        img.src = pokemon.sprite;
        img.style.width = '100px';

        card.appendChild(nombre);
        card.appendChild(img);
        collectionList.appendChild(card);
    });

    document.getElementById('collection-section').classList.remove('hidden');
});

/**
 * Buscar por tipo de pokemon
 */
async function buscarPorTipo(tipo) {
    const pokemonData = document.getElementById('pokemon-data');

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
        if (!respuesta.ok) throw new Error("Tipo no válido");

        const data = await respuesta.json();

        const primerosCinco = data.pokemon.slice(0, 5);

        const promesas = [];

        for (const p of primerosCinco) {
            const promesa = fetch(p.pokemon.url)
                .then(res => res.json());

            promesas.push(promesa);
        }

        const pokemons = await Promise.all(promesas);

        pokemonData.innerHTML = '';

        pokemons.forEach(pokemon => {
            const card = document.createElement('div');
            const name = document.createElement('p');
            const img = document.createElement('img');

            name.textContent = `${pokemon.name} (#${pokemon.id})`;
            img.src = pokemon.sprites.front_default;
            img.style.width = '120px';

            card.append(name, img);
            pokemonData.appendChild(card);
        });

    } catch (error) {
        pokemonData.innerHTML = `<p>No es un Pokémon ni un tipo válido</p>`;
    }
}