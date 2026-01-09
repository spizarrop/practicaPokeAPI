// Variables globales
const coleccion = [];

/**
 * Ejercicio 1: Función para buscar pokemon
 * 
*/
/* async function buscarPokemon() {
    // Obtenemos el nombre del pokemon introducido en el campo de texto
    let pokeNombre = document.getElementById('pokemon-input').value;
    // Por defecto el pokemon no es shiny (esta parte es mia)
    let shiny = false;
    // Comprobamos si el nombre del pokemon lleva un * al final para ver si es shiny
    if (pokeNombre.slice(-1) == '*') {
        pokeNombre = pokeNombre.slice(0, -1);
        shiny = true;
    }
    // Establecemos la url para buscar el pokemon en la API
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeNombre;

    try {
        // Realizamos un fetch a la API para obtener los datos del Pokemon
        const respuesta = await fetch(url);
        // Si no se encuentra el nompre del pokemon indicamos el error
        if (!respuesta.ok) {
            throw new Error(`No es un Pokémon`);
        }

        // Guardamos en una variable el json obtenido con la llamada a la API
        const pokeJson = await respuesta.json();

        // Obtenemos mediante DOM el div donde mostraremos el pokemon
        const pokemonData = document.getElementById('pokemon-data');
        // Lo vaciamos por si contiene algun pokemon de otra busqueda
        pokemonData.innerHTML = '';

        // Creamos los hijos necesarios para el div anterior para el nombre e imagen del pokemon, asi como un botón para agregarlo a la coleccion
        const nombre = pokemonData.appendChild(document.createElement("p"));
        const sprite = pokemonData.appendChild(document.createElement("img"));
        const agregar = pokemonData.appendChild(document.createElement("button"));

        // Establecemos el nombre del pokemon y su id
        nombre.textContent = `${pokeJson.name} (#${pokeJson.id})`;

        // Para la imagen mostramos la correspondiente dependiendo si es shiny o no
        if (shiny) {
            sprite.src = pokeJson.sprites.front_shiny;
        } else {
            sprite.src = pokeJson.sprites.front_default;
        }
        // Establecemos el ancho de la imagen
        sprite.style.width = '200px';

        // Declaramos el nombre del botón y su id
        agregar.textContent = "Agregar a la colección";
        agregar.id = "coleccion-btn";
        // Agregamos un event listener al botón para agregar el pokemon (objeto) al array de colección
        agregar.addEventListener('click', () => agregarColeccion(pokeJson));

    } catch (error) {
        // Si no se trata de un pokemon podria tratarse del tipo de pokemon, por lo que llamamos al método de busqueda por tipo
        buscarPorTipo(pokeNombre);
    }
} */

/**
 * Ejercicio 2: Integración de promesas en el ejercicio 1
 */
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

                if (shiny) {
                    sprite.src = pokeJson.sprites.front_shiny;
                } else {
                    sprite.src = pokeJson.sprites.front_default;
                }

                sprite.style.width = '200px';

                // Declaramos el nombre del botón y su id
                agregar.textContent = "Agregar a la colección";
                agregar.id = "coleccion-btn";
                // Agregamos un event listener al botón para agregar el pokemon (objeto) al array de colección
                agregar.addEventListener('click', () => agregarColeccion(pokeJson));
            }
        )
        .catch(error => buscarPorTipo(pokeNombre));
} */

/**
 *  Descomentar para hacer uso de la función.
 */
/* document.getElementById('search-btn').addEventListener('click', buscarPokemon); */


/**
 * Ejercicio 3: buscar pokemon con JQuery AJAX.
 */
function buscarPokemonJQueryAJAX() {

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

            const nombre = $('<p>').text(pokeJson.name + ' (#' + pokeJson.id + ')');
            const sprite = $('<img>');
            const agregar = $('<button>').attr('id', 'coleccion-btn').text('Agregar');

            if (shiny) {
                sprite.attr('src', pokeJson.sprites.front_shiny);

            } else {
                sprite.attr('src', pokeJson.sprites.front_default);
            }
            sprite.css('width', '200px');

            pokemonData.append(nombre, sprite, agregar);

            // Agregamos un event listener al botón para agregar el pokemon (objeto) al array de colección
            agregar.addEventListener('click', () => agregarColeccion(pokeJson));
        },
        error: function (error) {
            buscarPorTipo(pokeNombre);
        }
    });
}

/**
 * Haciendo uso de JQuery, descomentar para usar la función buscarPokemonJQueryAJAX
*/
$(document).ready(function () {
    $('#search-btn').on('click', buscarPokemonJQueryAJAX);
});

/**
 * Función para agregar un pokemon a la coleción
 */
function agregarColeccion(pokeJson) {
    coleccion.push({
        name: pokeJson.name,
        id: pokeJson.id,
        sprite: shiny
            ? pokeJson.sprites.front_shiny
            : pokeJson.sprites.front_default
    });
    // Mostramos una alerta cuando se agrege el pokemon a la colección
    alert(`${pokeJson.name} agregado a la colección`);
}

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