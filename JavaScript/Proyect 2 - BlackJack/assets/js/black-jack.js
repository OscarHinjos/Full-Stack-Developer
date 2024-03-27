/*
- 2C = Two of Clubs (Téboles)
- 2D = Two of Diamons (Diamantes)
- 2H = Two of Hearts (Corazones)
- 2S = Two of Spades (Spadas)
*/

// Funcion anonimas autoinvocadas
// Mejora de seguridad
(() => {
    'use strict';

    const typesCards = ['C', 'D', 'H', 'S'];
    const especialCards = ['A', 'J', 'Q', 'K'];

    let deck = [];
    let pointsPlayer = 0;
    let pointsCrupier = 0;

    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const spanList = document.querySelectorAll('span');
    const playerCards = document.querySelector('.carts-player');
    const crupierCards = document.querySelector('.cards-crupier');

    const createDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let type of typesCards) {
                deck.push(i + type);
            }
        }
        for (let type of typesCards) {
            for (let especialCard of especialCards) {
                deck.push(especialCard + type);
            }
        }
        return shuffle(deck);
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const askCard = () => {
        if (deck.length === 0) {
            throw new Error("No hay cartas en el deck");
        }
        return deck.pop();
    };

    const evaluateCard = (card) => {
        const value = card.substring(0, card.length - 1);
        return (!isNaN(value)) ? parseInt(value) : (value === 'A') ? 11 : 10;
    };

    const showCard = (card, points, container) => {
        points += evaluateCard(card);
        spanList[container].innerText = points;
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList = "card";
        container === 0 ? playerCards.append(imgCard) : crupierCards.append(imgCard);
        return points;
    };

    const endGame = () => {
        setTimeout(() => {
            let message;
            if (pointsCrupier === pointsPlayer) {
                message = "Empate";
            } else if (pointsPlayer > 21 || (pointsCrupier <= 21 && pointsCrupier > pointsPlayer)) {
                message = "Gana el Crupier";
            } else {
                message = "Gana el Jugador";
            }
            alert(message);
        }, 20);
    };

    const init = () => {
        deck = createDeck();
        btnPedir.addEventListener('click', () => {
            pointsPlayer = showCard(askCard(), pointsPlayer, 0);
            if (pointsPlayer > 21 || pointsPlayer === 21) {
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                endGame();
            }
        });

        btnDetener.addEventListener('click', () => {
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            while (pointsCrupier < pointsPlayer && pointsCrupier <= 21) {
                pointsCrupier = showCard(askCard(), pointsCrupier, 1);
            }
            endGame();
        });

        btnNuevo.addEventListener('click', () => {
            deck = [];
            deck = createDeck();
            btnPedir.disabled = false;
            btnDetener.disabled = false;
            spanList.forEach(span => span.innerText = 0);
            playerCards.innerHTML = '';
            crupierCards.innerHTML = '';
            pointsCrupier = 0;
            pointsPlayer = 0;
        });
    };

    init(); // Iniciar el juego cuando se cargue la página por primera vez
})();






