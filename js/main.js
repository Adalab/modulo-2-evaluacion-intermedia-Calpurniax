'use strict';

//variables dentro del HTML
const select = document.querySelector('.js-select');
const btn = document.querySelector('.js-btn');
const btnReset = document.querySelector('.js-reset');
const textResult = document.querySelector('.js-text');
const score = document.querySelector('.js-score');
//variables de puntuación y contador
let scoreGoodguys = 0;
let scoreBadguys = 0;
let i = 0;
//array con las razas malvadas
const badGuysRaces = [
    '',
    {
        name: 'surenos',
        strength: 2,
    },
    {
        name: 'orcos',
        strength: 2,
    },
    {
        name: 'goblins',
        strength: 2,
    },
    {
        name: 'huargos',
        strength: 3,
    },
    {
        name: 'trolls',
        strength: 5,
    },
];
//función para elegir un número entre el 1 y el 5
function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
}
//función para convertir el valor random en una raza
function generateBadGuy() {
    let random = getRandomNumber(5);
    return badGuysRaces[random].strength;
}
//función para la facción bondadosa
function selectGoodGuy() {
    let selectValue = (select.value);
    if (selectValue === '') {
        return selectValue = 0;
    } else {
        return parseInt(selectValue);
    }
}
//funcion para comparar las dos facciones
function compare(good, evil) {
    if (good > evil) {
        scoreGoodguys++;
        renderResult('Ha ganado el Ejército del Bien! Enhorabuena.')
    } else if (good < evil) {
        scoreBadguys++;
        renderResult("Ha ganado el Ejército del Mal! Vuelve a intentarlo.");
        return scoreBadguys
    } else {
        renderResult('Empate')
    }
}
//funcion para pintar en el HTML
function renderResult(result) {
    textResult.innerHTML = result;
}
//función manejadora del evento
function handleClick(event) {
    event.preventDefault();
    const goodGuys = selectGoodGuy();
    if (goodGuys === 0) {
        renderResult('Por favor selecciona una raza')
    } else {
        const badGuys = generateBadGuy();
        i++
        compare(goodGuys, badGuys);
        scoreWriting(scoreGoodguys, scoreBadguys);
        finishGame(i, scoreGoodguys, scoreBadguys);
    }
}
//evento
btn.addEventListener('click', handleClick);

//BONUS//

//función para pintar los puntos de cada facción:
function scoreWriting(goodGuys, badGuys) {
    score.innerHTML = `<li>Jugadora: ${goodGuys}</li><li>Computadora: ${badGuys}</li>`
}
//bucle
function finishGame(i, scoreGoodguys, scoreBadguys) {
    if (i > 9) {
        collapseBtn()
        if (scoreGoodguys > scoreBadguys) {
            renderResult('Has ganado el juego');
        } else {
            renderResult('Has perdido el juego');
        }
    }
}
//collapse boton "Jugar"
function collapseBtn() {
    btn.classList.add('collapse');
    btnReset.classList.remove('collapse');
}
//colapsar el boton de reset
function collapseReset() {
    btn.classList.remove('collapse');
    btnReset.classList.add('collapse');
}
//borrar puntuaciones
function eraseScore() {
    score.innerHTML = '';
}
//función para resetear juego
function resetClick(event) {
    event.preventDefault();
    eraseScore();
    collapseReset();
    scoreGoodguys = 0;
    scoreBadguys = 0;
    i = 0;
    renderResult('¡Comienza la batalla!');
}
//evento de click en reset
btnReset.addEventListener('click', resetClick);

