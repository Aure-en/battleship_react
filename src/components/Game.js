import React, { useState } from 'react';
import Gameboard from './Gameboard';
import Message from './Message';
import Stats from './Stats';
import shipsData from '../data/shipsData';

function Game() {
  /* Game has 3 possible game states :
  1. Initialization: fleet placing
  2. Game: actual gameplay, spaces selection until one of the fleet sinks.
  3. End: display the result / winner.
  */
  const [gameState, setGameState] = useState('initialization');
  const [difficulty, setDifficulty] = useState('normal');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [lastShipSunk, setLastShipSunk] = useState({ player: '', ship: '' });
  const [player1Stats, setPlayer1Stats] = useState({
    hits: 0,
    accuracy: 0,
    fleet: shipsData.reduce((sum, current) => sum + +current.length, 0),
    shipsSunk: [],
    wins: 0,
  });
  const [player2Stats, setPlayer2Stats] = useState({
    hits: 0,
    accuracy: 0,
    fleet: shipsData.reduce((sum, current) => sum + +current.length, 0),
    shipsSunk: [],
    wins: 0,
  });

  const changeGameState = (gameState) => {
    setGameState(gameState);
  };

  const changeCurrentPlayer = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
  };

  const changeLastShipSunk = (player, ship) => {
    setLastShipSunk({ player, ship });
  };

  const reset = () => {
    setGameState('initialization');
    setCurrentPlayer(1);
  };

  const changePlayer1Stats = (stats) => {
    setPlayer1Stats(stats);
  };

  const changePlayer2Stats = (stats) => {
    setPlayer2Stats(stats);
  };

  return (
    <div className='game'>
      <Gameboard
        size={10}
        gameState={gameState}
        player={1}
        changeGameState={changeGameState}
        changeCurrentPlayer={changeCurrentPlayer}
        currentPlayer={currentPlayer}
        changeLastShipSunk={changeLastShipSunk}
        changePlayerStats={changePlayer1Stats}
        difficulty={difficulty}
      />
      <Gameboard
        size={10}
        gameState={gameState}
        player={2}
        changeGameState={changeGameState}
        changeCurrentPlayer={changeCurrentPlayer}
        currentPlayer={currentPlayer}
        changeLastShipSunk={changeLastShipSunk}
        changePlayerStats={changePlayer2Stats}
        difficulty={difficulty}
      />
      <div className="settings">
        <Stats player1={player1Stats} player2={player2Stats}/>
        <button onClick={() => setDifficulty(difficulty === 'normal' ? 'easy' : 'normal')}>{difficulty}</button>
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
