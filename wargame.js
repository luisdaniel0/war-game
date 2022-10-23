class Card { // this just creates new cards for the game
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

class Deck { // use let ___ = new Deck() to call this class and all of its inside functions 
  constructor() {
    this.cards = []
    this.createDeck()
    this.shuffle()
  }

  createDeck() { // this creates a new deck with cards going up to 13 in 4 different suits 
    let suits = ["Heart", "Spade", "Club", "Diamond"];
    let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], j + 2))
      }
    }

    return this.cards
  }

  shuffle() { // this shuffles the deck, not too knowledgable on it but it works 
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

class GameofWar { // this is going to start/setup the game, we call this and assign it when we want the game to start
  constructor() {
    this.playerOne = [] // this array is will hold player 1's 26 cards 
    this.playerTwo = [] // this array will hold player 2's 26 cards 
    this.pile = [] // this array is just the pile of cards 
    this.gameSetup() // this is the function that will basically do everything for the game 
  }

  gameSetup() {
    let gameDeck = new Deck()
    console.log('Starting Number of Cards:', gameDeck.cards.length) // making gameDeck a copy of the Deck class and all its functions
    let cards = gameDeck.cards // this.gameDeck.cards to access the deck of cards for the game
    this.playerOne.push(...cards.slice(0, cards.length / 2)) // split the game deck in half and gave those cards to player one
    // console.log(this.playerOne)
    this.playerTwo.push(...cards.slice(cards.length / 2)) // split the deck again and gave these cards to player 2 
    // console.log(this.playerTwo)
  }

  startGame() {
    while (this.playerOne.length > 0 && this.playerTwo.length > 0) {
      let p1card = this.playerOne.pop()
      let p2card = this.playerTwo.pop()


      if (p1card.score > p2card.score) {
        this.playerOne.unshift(p1card, p2card, ...this.pile) // gives the card to player if they win
        console.log('Player One Wins!', `Player One : ${this.playerOne.length} | Player Two: ${this.playerTwo.length}`)
        console.log(this.playerOne.length, this.playerTwo.length)
        this.pile.length = 0 // so the cards dont duplicate
      } else if (p2card.score > p1card.score) {
        this.playerTwo.unshift(p2card, p1card, ...this.pile) // gives the card to the player if they win
        console.log('Player Two Wins!', `Player One : ${this.playerOne.length} | Player Two: ${this.playerTwo.length}`)
        console.log(this.playerOne.length, this.playerTwo.length)
        this.pile.length = 0 // so the cards do not duplicate
      } else if (p1card.score === p2card.score) {
        console.log("WAR")
        this.war(p1card, p2card)
      }
    }
    if (this.playerOne.length <= 0) {
      console.log("Player Two Wins the Game of War!", this.playerTwo.length)
    } else {
      console.log("Player One Wins the Game of War!", this.playerOne.length)
    }
  }

  war(card1, card2) {
    this.pile.push(card1, card2)

    if (this.playerOne.length >= 4 && this.playerTwo.length >= 4) {
      let pile1 = this.playerOne.splice(this.playerOne.length - 3, 3) // pushing cards into the pile for war 
      let pile2 = this.playerTwo.splice(this.playerTwo.length - 3, 3) // pushing cards into the pile for war 
      this.pile.push(...pile1, ...pile2)
    } else if (this.playerOne.length < 4 && this.playerTwo.length >= 4) { // dumb impossible situation that cant happen 
      this.playerTwo.unshift(...this.pile)
      this.playerTwo.unshift(...this.playerOne.splice(0, this.playerOne.length))
      // this.playerOne.length = 0;
      this.pile.length = 0;
    } else if (this.playerTwo.length < 4 && this.playerOne.length >= 4) {
      this.playerOne.unshift(...this.pile)
      this.playerOne.unshift(...this.playerTwo.splice(0, this.playerTwo.length))
      this.playerTwo.length = 0;
      this.pile.length = 0;
    }
  }
}
let game = new GameofWar()
game.startGame()
