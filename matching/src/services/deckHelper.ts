import { CardDataType } from "../components/Card/Card";

const deckHelper = {
  randomNum: (max: number) => {
    return Math.floor(Math.random() * max);
  },

  randomSet: (count: number): Set<number> => {
    // create a unique set of random numbers
    const unique = new Set<number>();
    while (unique.size < count) {
      const randomNumber = deckHelper.randomNum(count);
      unique.add(randomNumber); // add it to the set. Sets will not allow dupes
    }

    return unique;
  },

  shuffleCards: (gameDeck: CardDataType[]) => {
    const theNewOrder = deckHelper.randomSet(gameDeck.length);
    const newOrderArray = Array.from(theNewOrder);
    let shuffledArray: CardDataType[] = new Array(gameDeck.length);
    gameDeck.forEach((card, index) => {
      shuffledArray.splice(newOrderArray[index], 1, card);
    });
    return shuffledArray;
  },
};

export default deckHelper;