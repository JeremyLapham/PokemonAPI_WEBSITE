import { saveToLocalStorageByName, getLocalStoage, removeFromLocalStorage } from './localStorage.js';

let pokeAPI = document.getElementById('pokeAPI');
let openBtn = document.getElementById('openBtn');
let page = document.getElementById('page');
let favBtn = document.getElementById('favBtn');
let FAVTXT = document.getElementById('FAVTXT');
let DISPLAYID = document.getElementById('DISPLAYID');

let pokeName = '';
let id = '';
let mappedMoves = '';
let mappedAbilities = '';

let name = document.getElementById('name');
let pokemon = document.getElementById('pokemon');
let location = document.getElementById('location');
let movesID = document.getElementById('moves');
let ablities = document.getElementById('ablities');
let typeBG1 = document.getElementById('typeBG1');
let typeBG2 = document.getElementById('typeBG2');
let typeByselfBG = document.getElementById('typeByselfBG');
let typeByselfTxt = document.getElementById('typeByselfTxt');
let type1 = document.getElementById('type1');
let type2 = document.getElementById('type2');

let pokeNorm = document.getElementById('pokeNorm');
let pokeShin = document.getElementById('pokeShin');
let EVOTXT = document.getElementById('evoOne');

let rndBtn = document.getElementById('rndBtn');

rndBtn.addEventListener('click', function () {
    let rndNum = Math.floor(Math.random() * 649)+1;
    getData(rndNum);
    pokemon.value = '';

    if (!pokemon.value) {
        pokemon.value = rndNum;
    }
});

let audio = new Audio("/src/assets/pokeBall.mp3")


openBtn.addEventListener('click', function () {
    pokeAPI.classList.add('hide');
    openBtn.classList.add('hide');
    page.classList.remove('hide');
    audio.play();
});

pokemon.addEventListener('keydown', function (e) {
    pokeName = pokemon.value.toLowerCase();
    if (e.key === 'Enter') {
        getData(pokeName)
    }
})

async function getData(pokeName) {
    let letters = /^[A-Za-z-]+$/;
    if (pokeName <= 649 || pokeName.match(letters)) {
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        const data = await promise.json();
        name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        id = data.id;


        DISPLAYID.textContent = 'Id:' + id;

        mappedMoves = '';
        data.moves.map(mov => {
            mappedMoves += mov.move.name + ', ';
        });
        movesID.textContent = mappedMoves.replace(/-/g, ' ');

        mappedAbilities = '';
        data.abilities.map(abill => {
            mappedAbilities += abill.ability.name + ' ';
        });
        ablities.textContent = mappedAbilities;

        if (data.types.length === 1) {
            typeByselfTxt.textContent = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            typeByselfBG.classList.remove('hide');
            typeBG1.classList.add('hide');
            typeBG2.classList.add('hide');
            sayOutLoud(`${data.name} is a ${data.types[0].type.name} type.`);

            const typeClassMap = {
                fire: 'fireType',
                grass: 'grassType',
                poison: 'poisonType',
                normal: 'normalType',
                water: 'waterType',
                electric: 'electicType',
                fighting: 'fightingType',
                ice: 'iceType',
                ground: 'groundType',
                flying: 'flyingType',
                psychic: 'psychicType',
                bug: 'bugType',
                dark: 'darkType',
                dragon: 'dragonType',
                ghost: 'ghostType',
                rock: 'rockType',
                steel: 'stealType',
                fairy: 'fairyType'
            };

            typeByselfTxt.className = typeClassMap[data.types[0].type.name] || '';
        }
        else {
            typeByselfBG.classList.add('hide');
            typeBG1.classList.remove('hide');
            typeBG2.classList.remove('hide');
            type1.textContent = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
            type2.textContent = data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1);
            sayOutLoud(`${data.name} is a ${data.types[0].type.name} type and a ${data.types[1].type.name} type.`);

            const typeClassMap = {
                fire: 'fireType',
                grass: 'grassType',
                poison: 'poisonType',
                normal: 'normalType',
                water: 'waterType',
                electric: 'electicType',
                fighting: 'fightingType',
                ice: 'iceType',
                ground: 'groundType',
                flying: 'flyingType',
                psychic: 'psychicType',
                bug: 'bugType',
                dark: 'darkType',
                dragon: 'dragonType',
                ghost: 'ghostType',
                rock: 'rockType',
                steel: 'stealType',
                fairy: 'fairyType'
            };
            type1.className = typeClassMap[data.types[0].type.name] || '';

            const typeClassMapTwo = {
                fire: 'fireType',
                grass: 'grassType',
                poison: 'poisonType',
                normal: 'normalType',
                water: 'waterType',
                electric: 'electicType',
                fighting: 'fightingType',
                ice: 'iceType',
                ground: 'groundType',
                flying: 'flyingType',
                psychic: 'psychicType',
                bug: 'bugType',
                dark: 'darkType',
                dragon: 'dragonType',
                ghost: 'ghostType',
                rock: 'rockType',
                steel: 'stealType',
                fairy: 'fairyType'
            };
            type2.className = typeClassMapTwo[data.types[1].type.name] || '';
        }

        const promise2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
        const data2 = await promise2.json();

        if (data2.length === 0) {
            location.textContent = 'N/A';
        } else {
            location.textContent = data2[0].location_area.name.replaceAll('-', ' ');
        }

        let img1 = document.createElement('img');
        img1.style.width = '250px';

        img1.alt = 'Pokemon Regular but if you see this that means the API broke';
        img1.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + id + ".png";

        pokeNorm.innerHTML = '';
        pokeNorm.append(img1);

        let img2 = document.createElement('img');
        img2.style.width = '250px';

        img2.alt = 'Pokemon Shiny but if you see this that means the API broke';
        img2.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/" + id + ".png";
        pokeShin.innerHTML = '';
        pokeShin.append(img2);


        const promise3 = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id + '/');
        const data3 = await promise3.json();
        let evo = data3.evolution_chain.url

        const promise4 = await fetch(evo);
        const data4 = await promise4.json();

        let evolutionChain = data4.chain;

        while (EVOTXT.firstChild) {
            EVOTXT.removeChild(EVOTXT.firstChild);
        }

        function displayEvolution(evoChain) {
            EVOTXT.style.flexWrap = 'wrap';

            let id = evoChain.species.url.split("/")[6];
            let span = document.createElement('span');
            span.textContent = evoChain.species.name;
            span.style.display = "block";

            let img = document.createElement("img");
            img.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" + id + ".png";
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.display = "inline-block";

            EVOTXT.appendChild(span);
            EVOTXT.appendChild(img);
            EVOTXT.appendChild(document.createElement("br"));

            evoChain.evolves_to.forEach(evo => {
                displayEvolution(evo);
            })
        }
        displayEvolution(evolutionChain);
    }

    else {
        alert('Please enter a number less than 649');
    }
}

favBtn.addEventListener('click', function () {
    if (pokemon.value !== '') {
        let localStorageData = getLocalStoage();
        if (!localStorageData.includes(pokemon.value)) {
            saveToLocalStorageByName(pokemon.value)
            setInterval(function () {
                CreateElements()
            }, 1000);
        }
    } else {
        alert('Enter something to save');
    }

});

setInterval(function () {
    CreateElements()
}, 1000);

function CreateElements() {
    let favorites = getLocalStoage();

    while (FAVTXT.firstChild) {
        FAVTXT.removeChild(FAVTXT.firstChild);
    }

    if (FAVTXT.childElementCount === 0) {
        let limit = Math.min(favorites.length, 649);
        for (let i = 0; i < limit; i++) {
            let pokemon = favorites[i];
            let container = document.createElement('div');
            container.style.display = "inline-block";
            container.style.width = `calc((100% - 30rem) / 10)`;
            container.style.marginRight = '5rem';
            container.style.marginBottom = '3rem';

            let p = document.createElement('p');
            p.textContent = pokemon;

            let deleteBtn = document.createElement('button');
            deleteBtn.className = 'faveNoFill';
            deleteBtn.type = 'button';
            deleteBtn.addEventListener('click', function () {
                removeFromLocalStorage(pokemon);
                getLocalStoage();
            });

            container.appendChild(p);
            container.appendChild(deleteBtn);
            FAVTXT.appendChild(container);
        }
    }
}

function sayOutLoud(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}