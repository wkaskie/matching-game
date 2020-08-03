import { CardDataType } from '../components/Card/Card';
import { Player } from '../components/ScoreKeeper/PlayerScore';
import { client } from '../components/websocket';
import helper from './deckHelper';
import GameStore, { stateType } from '../components/Game/GameStore';
import deckHelper from './deckHelper';

function* playerTurn(players: Player[]) {
  let index = 0;
  while (true) {
    yield players[index].name;
    index = index < players.length - 1 ? index + 1 : 0;
  }
}

const fakePlayers = [
  { name: 1, score: 0 },
  { name: 2, score: 0 },
];

class GamePlay {
  constructor() {
    console.log('CREATING A GAME');
    const _this = this;
    GameStore.subscribeState((state: stateType) => {
      _this._grid = state.grid;
      _this._currentPlayer = state.currentPlayer;
      _this._players = state.players;
      _this._theWinner = state.winner;
      _this._self = state.self;
    });
  }

  _players = fakePlayers; // TODO: pull scores from server
  playerTurnTracker: Generator<number> = playerTurn(this._players);
  _grid: CardDataType[] = [];
  _currentPlayer: number = 0;
  _theWinner: number | undefined = undefined;
  _self: number = 1;

  setSelf(playerId: number) {
    // handle incoming server message
    GameStore.setSelf(playerId);
  }

  // Update the local UI, message the server, determine next (win, lose, etc)
  handleCardClicked(
    cardId: string,
    visibilityState: boolean,
    fromServer?: boolean
  ) {
    if (!fromServer) {
      const messageData = {
        card: { uniqueId: cardId, isVisible: visibilityState },
        self: this._self,
      }
      const message = JSON.stringify(messageData);
      client.send(message);
    }
    const card = this._grid.find((c) => c.uniqueId === cardId);
    debugger;
    if (card) {
      card.isVisible = visibilityState;
      const visibleCards = this._grid.filter((card) => card.isVisible);
      if (visibleCards.length === 2) {
        const cardsMatch = this.compareVisibleCards(visibleCards);
        if (cardsMatch) {
          setTimeout(() => {
            this.handleCollectClick();
          }, 1000); // keep the match visible for a second
        } else {
          setTimeout(() => {
            this.handleNextClick();
          }, 1000); // keep the match visible for a second
        }
      }
      GameStore.setGrid([...this._grid]);
    }
  }

  handleCollectClick() {
    this._grid
      .filter((card) => card.isVisible) /* grab all visible cards */
      .forEach((card) => {
        // Hide the card and mark it found
        card.isVisible = false;
        card.isFound = true;
      });
    GameStore.setGrid([...this._grid]);

    // give the current player some points
    this.handleIncrementScore();
    if (!this._grid.some((card) => !card.isFound)) {
      GameStore.setWinner(this.identifyWinner());
    }
  }

  handleNextClick() {
    this._grid
      .filter((card) => card.isVisible)
      .forEach((card) => (card.isVisible = false));
    GameStore.setGrid([...this._grid]);
    GameStore.setCurrentPlayer(this.nextTurn());
  }

  handleIncrementScore() {
    const updatedPlayers = [...this._players];
    const playerId = this._currentPlayer;
    const playerInTheList = updatedPlayers.find(
      (player) => player.name === playerId
    );
    if (playerInTheList) ++playerInTheList.score; // the if statement is to make TS happy
    GameStore.setPlayers(updatedPlayers);
  }

  identifyWinner() {
    return this._players.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    ).name;
  }

  nextTurn(): number {
    return this.playerTurnTracker.next().value;
  }

  compareVisibleCards(cards: CardDataType[]) {
    return cards[0].id === cards[1].id;
  }

  //TODO: Make this work with various deck sizes
  selectCards(totalCardCount: number) {
    const usedCards = new Set();
    // based on a 52-card deck
    const cardPairs = [...new Array(totalCardCount / 2)].map((val, index) => {
      // val is undefined until we assign it below
      // divide 100 by the number to get a percentage
      const {cardSuit, cardValue } = deckHelper.getUniquePair(usedCards);
      usedCards.add(`${cardSuit}-${cardValue}`); // 
      return { uniqueId: index + 1, id: `card-${index}`, xPos: cardValue, yPos: cardSuit };
    });

    // need to double the cards so that there's a match
    const matchingCards = JSON.parse(JSON.stringify(cardPairs)).map((card: CardDataType, index:number) => {
      card.uniqueId = ((index + 12)*52).toString(16);
      console.log(card.uniqueId);
      
      return card;
    });
    const gameDeck = helper.shuffleCards([
      ...cardPairs,
      ...matchingCards,
    ]);

    GameStore.setGrid(gameDeck);
  }

  newGame() {
    GameStore.setPlayers(fakePlayers);
    this.selectCards(10);
    const message = JSON.stringify({ gameGrid: this._grid });
    client.send(message);
  }

  newRemoteGame(grid: CardDataType[]) {
    GameStore.setGrid([...grid]);
    GameStore.setPlayers(fakePlayers);
  }
}

const game = new GamePlay();
export default game;
