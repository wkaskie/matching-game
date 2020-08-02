import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import gamePlay from "../services/gamePlay";

const client = new W3CWebSocket("ws://127.0.0.1:3050");

export class SocketTest extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
      const stringData = message.data.toString() || null;
      if (stringData) {
        try {
          const { card } = JSON.parse(stringData);
          gamePlay.handleCardClicked(card, card.isVisible);
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
