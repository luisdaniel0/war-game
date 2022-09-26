class Card {
  constructor(suit, rank, score){
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

/* DECK AND RANKS OF CARDS */

class Deck {
  constructor() {
    this.cards = []
    this.createDeck()
    this.shuffle();
  }

  createDeck() {
    let suits = [
      "Heart",
      "Spade",
      "Club",
      "Diamond"
    ];


    let ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A"
    ];
    /* LOOP SUITS AND RANKS */

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], j + 2))
      }
  
    }


  }




  

  /* SHUFFLE DECK */
  shuffle() {
    let currentIndex = this.cards.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex], this.cards[currentIndex]];
    }
  
    return this.cards;
  }
}

class GameOfWar {
  constructor() {
    this.p1 = []
    this.p2 = []
    this.pile = []
    this.setup();
  }
  
  setup() {
    let deck = new Deck()
    let cards = deck.cards
    this.p1.push(...cards.slice(0, cards.length / 2))
    this.p2.push(...cards.slice(cards.length / 2))
  }

  start() {
    while (this.p1.length > 0 && this.p2.length > 0) {
      let playerOneCard = this.p1.pop();
      let playerTwoCard = this.p2.pop();
      //console.log("cards: " + playerOneCard.score +
      //  " card2 " + playerTwoCard.score)//

      if (playerOneCard.score > playerTwoCard) {
        this.p1.unshift(playerOneCard, playerTwoCard, ...this.pile);
        this.pile.length = 0;
      } else if (playerOneCard.score < playerTwoCard) {
        this.p2.unshift(playerTwoCard, playerOneCard, ...this.pile)
        this.pile.length = 0;
      } else if (playerOneCard.score === playerTwoCard.score) {
        this.war(playerOneCard, playerTwoCard);
      }
    }

    if (this.p1.length == 0) {
      console.log("P1 WINS")
    } else if (this.p2.length == 0) {
      console.log("P2 WINS")
    }
  }
  war(x, y) {
    this.pile.push(x, y)
    
    if (this.p1.length >= 4 && this.p2.length >= 4) {
      this.pile.push(...this.p1.splice(this.p1.length - 3, 3));
      this.pile.push(...this.p2.splice(this.p2.length - 3, 3));
    } else if (this.p1.length < 3) {
      this.p2.unshift(...this.pile)
      this.pile.length = 0
    } else if (this.p2.length < 3) {
      this.p1.unshift(...this.pile)
      this.pile.length = 0;
    }
  }

  
}
let game = new GameOfWar();
game.start();
