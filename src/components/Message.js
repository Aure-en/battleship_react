import React from 'react'
import shipsData from '../data/shipsData'

function Message({ gameState, changeGameState, currentPlayer, reset, lastShipSunk }) {
  return (
    <div className="text">

      {gameState === 'initialization' &&
      <>
        <div className="instructions">
          Welcome, Lieutenant!<br/>
          In such a battle, preparations are crucial. Take your time to think of the perfect strategy to defend your ships.<br/>
          Drag your ships to place them, and double click on them to rotate them.<br/>
          Engage in combat whenever you feel ready.
        </div>

        <button type='button' onClick={() => changeGameState('game')}>To Battle!</button>
      </>
      }

      {gameState === 'game' &&
      <>
        <div className="text__player">Current player: {currentPlayer}</div>
        {lastShipSunk.player &&
          <div className="text__ship">Lieutenant {lastShipSunk.player}'s {shipsData[lastShipSunk.ship].name} sunk.</div>
        }
      </>
      }

      {gameState === 'end' &&
      <>
        <div className="test__end">
          Congratulations, Lieutenant {currentPlayer} won.<br/>
          Would you like to play again?</div>

      <button type='button' onClick={reset}>Play again</button>
      </>
      }

    </div>
  )
}

export default Message
