'use strict';

// Selecting elements

const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new')
const btnRollDice = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
//multiple ways to select by id
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Initialize Game
let playing, currentScore, activePlayer, scores;
init();

btnNewGame.addEventListener('click', init());

btnRollDice.addEventListener('click', function() {
    if (playing) {
        const dice = Math.trunc(Math.random()*6)+1;
        diceElement.classList.remove('hidden');
        diceElement.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        if (scores[activePlayer] >= 50) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        }
        else {
            switchPlayer();
        }
    }
})

function switchPlayer() {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = (activePlayer === 0) ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

function init() {
    playing = true;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    diceElement.classList.add('hidden');
}