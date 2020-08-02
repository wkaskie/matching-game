import { Subject, Subscription } from 'rxjs';
import { CardDataType } from "../Card/Card";
import { Player } from '../ScoreKeeper/PlayerScore';

export interface stateType {
    grid: CardDataType[],
    players: Player[],
    currentPlayer: number,
    winner: number 
}

export interface GameStoreType {
    state: stateType;
    init: () => void;
    setGrid: (newGrid: CardDataType[]) => void;
    setPlayers: (newPlayers: Player[]) => void;
    setCurrentPlayer: (newCurrentPlayer: number) => void;
    setWinner: (newWinner: number) => void;
    subscribeState: (setState:any) => Subscription;
    initialState: stateType;
}

export const initialState: stateType = {
    grid: [],
    players: [],
    currentPlayer: 1,
    winner: 0
}

let state = initialState;

const gameSubject = new Subject();

const GameStore: GameStoreType = {
    state: initialState,
    init: () => {
        gameSubject.next(initialState);
    },
    setGrid: (newGrid: CardDataType[]) => {
        state = {
            ...state,
            grid: [...newGrid],
        };
        gameSubject.next(state);
    },
    setPlayers: (newPlayers: Player[]) => {
        state = {
            ...state,
            players: [...newPlayers],
        };
        gameSubject.next(state);
    },
    setCurrentPlayer: (cp: number) =>{
        state = {
            ...state,
            currentPlayer: cp
        };
        gameSubject.next(state);
    },
    setWinner: (winner: number)=> {
        state = {
            ...state,
            winner: winner
        };
        gameSubject.next(state);
    },
    subscribeState: (setState:any) => gameSubject.subscribe(setState),
    initialState,
}

export default GameStore;