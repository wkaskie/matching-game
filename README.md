# matching-game
A multiplayer matching game

## Notes
This is a work in progress and is not yet fully playable.
The frontend lives in the `matching` folder. The app was instantiated using create-react-app. 

The backend lives in the server folder. It is a simple Node/Express server for managing routing and the websockets.

## Future features
* Build out the websockets to put the player control with the server
* Build out two player game play (two browsers)
* Aesthetic adjustments including animations, bkgrnd, etc.
* Add more cards
* Add deck options
* Add difficulty levels (more or less cards)
* Add multiplayer
* Handle win condition
* Keep score
* 

## To Run the Frontend
* Clone the project
* cd into the matching folder
* Run `yarn`
* Run `yarn start`

## To Run the Backend
* cd into the server folder
* run `npm i` to install dependencies
* run `node index.js` to start the server
