/*
- 2C = Two of Clubs (Téboles)
- 2D = Two of Diamons (Diamantes)
- 2H = Two of Hearts (Corazones)
- 2S = Two of Spades (Spadas)
*/

const typesCards = ['C', 'D', 'H', 'S'];
const especialCards = ['A', 'J', 'Q', 'K'];

let deck = [];
let pointsPlayer = 0;
let pointsCrupier = 0;

// HTML References
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const spanList = document.querySelectorAll('span')
const playerCards = document.querySelector('.carts-player')
const crupierCards = document.querySelector('.cards-crupier')




// Crea una nueva baraja
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

    deck = _.shuffle(deck); // Randomizamos la baraja

    return deck;
};

deck = createDeck();

// Esta función permite tomar una carta
const askCard = (deck) => {
    if (deck.length === 0) {
        throw "No hay cartas en el deck";
    }
    const card = deck.pop();

    return card;
};


const evalueCard = (card) => {
    const value = card.substring(0, card.length - 1);
    return (!isNaN(value)) ? parseInt(value) :
        (value === 'A') ? 11 : 10;
};


const turnCrupier = (pointsPlayer) => {
    do {
        const card = askCard(deck);
        pointsCrupier += evalueCard(card);
        spanList[1].innerText = pointsCrupier;
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList = "card";
        crupierCards.append(imgCard);
        if (pointsPlayer > 21) {
            break;
        }

    } while ((pointsCrupier < pointsPlayer) && (pointsCrupier <= 21));


    setTimeout(() => {
        if(pointsCrupier === pointsPlayer){
            alert("Empate")
        }else if(pointsPlayer > 21){
            alert("Gana el Crupier")
        }else if(pointsCrupier > 21){
            alert("Gana el jugador")
        }else{
            alert("Gana el Crupier")
        }
    }, 20);


}


// Events 

// Player
btnPedir.addEventListener('click', () => {
    const card = askCard(deck);
    pointsPlayer += evalueCard(card);
    spanList[0].innerText = pointsPlayer;
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.classList = "card";
    playerCards.append(imgCard);

    if (pointsPlayer > 21) {
        console.warn("Lo siento mucho, perdiste");
        btnPedir.disabled = true;
        btnDetener.disabled = true
        turnCrupier(pointsPlayer)
    } else if (pointsPlayer === 21) {
        console.warn("21, Genial!");
        btnPedir.disabled = true;
        btnDetener.disabled = true
        turnCrupier(pointsPlayer)
    }
});

// Crupier

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true
    btnPedir.disabled = true
    turnCrupier(pointsPlayer)

});


btnNuevo.addEventListener('click', () => {
    // Resetear todo
    deck = []
    deck = createDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false
    for(let i = 0 ; i < spanList.length ; i++){
        spanList[i].innerText = 0
    }

    playerCards.innerHTML = '';
    crupierCards.innerHTML = '';
    pointsCrupier = 0
    pointsPlayer = 0


});




