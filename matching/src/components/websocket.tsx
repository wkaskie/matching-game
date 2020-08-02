import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import gamePlay from '../services/gamePlay';

export const client = new W3CWebSocket('ws://127.0.0.1:3050');

export class SocketTest extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const stringData = message.data.toString() || null;

      if (stringData) {
        try {
          const dataObj = JSON.parse(stringData);
          if (dataObj.card) {
            const { card } = dataObj;
            gamePlay.handleCardClicked(card.uniqueId, card.isVisible, true);
          } else if (dataObj.playerId) {
            const { playerId } = dataObj;
            gamePlay.setSelf(playerId);
          } else if (dataObj.gameGrid) {
            const { gameGrid } = dataObj;
            gamePlay.newRemoteGame(gameGrid);
          }
        } catch {
          console.log(stringData);
        }
      }
    };
  }

  render() {
    return <span></span>;
  }
}
