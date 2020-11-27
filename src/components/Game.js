import React, { useState } from 'react';
import Gameboard from './Gameboard';
import Message from './Message';

function Game() {
  /* Game has 3 possible game states :
  1. Initialization: fleet placing
  2. Game: actual gameplay, spaces selection until one of the fleet sinks.
  3. End: display the result / winner.
  */
  const [gameState, setGameState] = useState('initialization');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [lastShipSunk, setLastShipSunk] = useState({player: '', ship: ''})

  const changeGameState = (gameState) => {
    setGameState(gameState);
  };

  const changeCurrentPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  };

  const changeLastShipSunk = (player, ship) => {
    setLastShipSunk({ player, ship })
  }

  const reset = () => {
    setGameState('initialization');
    setCurrentPlayer(1);
  }

  return (
    <div className='game'>
      <div className='game__boards'>
        <Gameboard
          size={10}
          gameState={gameState}
          player={1}
          changeGameState={changeGameState}
          changeCurrentPlayer={changeCurrentPlayer}
          currentPlayer={currentPlayer}
          changeLastShipSunk={changeLastShipSunk}
          lastShipSunk={lastShipSunk}
        />
        <Gameboard
          size={10}
          gameState={gameState}
          player={2}
          changeGameState={changeGameState}
          changeCurrentPlayer={changeCurrentPlayer}
          currentPlayer={currentPlayer}
          changeLastShipSunk={changeLastShipSunk}
          lastShipSunk={lastShipSunk}
        />
      </div>
      <Message
        gameState={gameState}
        currentPlayer={currentPlayer}
        lastShipSunk={lastShipSunk}
        changeGameState={changeGameState}
        reset={reset}
      />
    </div>
  );
}

export default Game;
