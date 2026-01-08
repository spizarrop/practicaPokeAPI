
/**
 * Ejercicio 1: Buscar y mostrar información del Pokemon con FETCH
 */
/**
 * Función para buscar pokemon ejercicio 1 y 2.
 * 
*/

/* async function buscarPokemon() {

    const pokeNombre = document.getElementById('pokemon-input').value;
    const url = "https://pokeapi.co/api/v2/pokemon/"+pokeNombre;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Estado de la respuesta: ${respuesta.status}`);
        }

        const pokeJson = await respuesta.json();

        const pokemonData = document.getElementById('pokemon-data');
        pokemonData.innerHTML = '';

        const nombre = pokemonData.appendChild(document.createElement("p"));
        const id = pokemonData.appendChild(document.createElement("p"));
        const sprite = pokemonData.appendChild(document.createElement("img"));

        nombre.textContent = pokeJson.name;
        id.textContent = pokeJson.id;
        sprite.src = pokeJson.sprites.front_default;
        sprite.style.width = '200px';

    } catch (error) {
        console.error(error.message);
    }
} */

/* function buscarPokemon() {

    const pokeNombre = document.getElementById('pokemon-input').value;
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeNombre;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(
            pokeJson => {

                const pokemonData = document.getElementById('pokemon-data');
                pokemonData.innerHTML = '';

                const nombre = pokemonData.appendChild(document.createElement("p"));
                const id = pokemonData.appendChild(document.createElement("p"));
                const sprite = pokemonData.appendChild(document.createElement("img"));

                nombre.textContent = pokeJson.name;
                id.textContent = pokeJson.id;
                sprite.src = pokeJson.sprites.front_default;
                sprite.style.width = '200px';
            }
        )
        .catch(error => console.error(error));
} */

/**
 *  Descomentar para hacer uso de la función.
 */
//document.getElementById('search-btn').addEventListener('click',buscarPokemon);


/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */

function buscarPokemonJQueryAJAX() {

    const pokeNombre = $('#pokemon-input').val();
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeNombre;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (pokeJson) {
            const pokemonData = $('#pokemon-data');
            pokemonData.html('');

            const nombre = $('<p> Nombre: ').text(pokeJson.name);
            const id = $('<p> ID: ').text(pokeJson.id);
            const sprite = $('<img>')
                .attr('src', pokeJson.sprites.front_default)
                .css('width', '200px');

            pokemonData.append(nombre, id, sprite);
        },
        error: function (xhr) {
            console.error(`Estado de la respuesta: ${xhr.status}`);
        }
    });


}

/**
 * Haciendo uso de JQuery, descomentar para usar la función buscarPokemonJQueryAJAX
*/
$(document).ready(function () {
    $('#search-btn').on('click', buscarPokemonJQueryAJAX);
});

