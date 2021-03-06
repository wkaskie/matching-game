import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import gamePlay from '../services/gamePlay';

const server = process.env.REACT_APP_SERVER_URL || 'ws://localhost:3050';
export const client = new W3CWebSocket(server);

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
    return <span>SERVER: {server} {process.env.REACT_APP_SERVER_URL} in {process.env.NODE_ENV}</span>;
  }
}
