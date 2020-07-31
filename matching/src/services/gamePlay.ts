import { CardDataType } from '../components/Card/Card';
import { Player } from '../components/ScoreKeeper/PlayerScore';

function* playerTurn(players: Player[]) {
  let index = 0;
  while (true) {
    yield players[index].name;
    index = index < players.length - 1 ? index + 1 : 0;
  }
}

const helper = {
  randomNum: (max: number) => {
    return Math.floor(Math.random() * max);
  },

  randomSet: (count: number): Set<number> => {
    // create a unique set of random numbers
    const unique = new Set<number>();
    while (unique.size < count) {
      const randomNumber = helper.randomNum(count);
      unique.add(randomNumber); // add it to the set. Sets will not allow dupes
    }

    return unique;
  },

  shuffleCards: (gameDeck: CardDataType[]) => {
    const theNewOrder = helper.randomSet(gameDeck.length);
    const newOrderArray = Array.from(theNewOrder);
    let shuffledArray: CardDataType[] = new Array(gameDeck.length);
    gameDeck.forEach((card, index) => {
      shuffledArray.splice(newOrderArray[index], 1, card);
    });
    return shuffledArray;
  },
};

class GamePlay {
  players = [{name: 1, score: 0},{name: 2, score: 0}]; // TODO: pull scores from server
  playerTurnTracker: Generator<number> = playerTurn(this.players);

  nextTurn(): number {
    return this.playerTurnTracker.next().value;
  }

  compareVisibleCards(cards: CardDataType[]) {
    return cards[0].id === cards[1].id;
  }

  hideFoundCards(cardsToHide: CardDataType[]) {
    return cardsToHide.map(card => {
      card.isFound = true;
      card.isVisible = false;
      return card;
    });
  }
  //TODO: Make this work with various deck sizes
  selectCards(totalCardCount: number) {
    // based on a 52-card deck
    const cardPairs = [...new Array(totalCardCount / 2)].map((val, index) => {
      // val is undefined until we assign it below
      // divide 100 by the number to get a percentage
      const newCardValue = helper.randomNum(12) * (100 / 12);
      const newCardFace = helper.randomNum(4) * (100 / 3); // Hearts - Clubs based on our sprite
      return { id: `card-${index}`, xPos: newCardValue, yPos: newCardFace };
    });

    return helper.shuffleCards([
      ...cardPairs,
      ...JSON.parse(JSON.stringify(cardPairs)), // need to double the cards so that there's a match
    ]);


  }

  newGame(): CardDataType[] {
    return this.selectCards(10);
  }
}

const game = new GamePlay(); // create a new instance to return
export default game;
