import React from 'react'
import shipsData from '../data/shipsData'

function Message({ gameState, changeGameState, currentPlayer, reset, lastShipSunk, gameResult }) {
  return (
    <div className="text">

      {gameState === 'initialization' &&
      <>
        <div className="instructions">
          Welcome, Lieutenant!<br/>
          In such a battle, preparations are crucial. <br />
          Take your time to think of the perfect strategy to defend your ships.<br/>
          Drag your ships to place them, and double click to rotate them.<br/>
          Engage in combat whenever you feel ready.
        </div>

        <button type='button' className="btn" onClick={() => changeGameState('game')}>To Battle!</button>
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
          {gameResult}<br/>
          Would you like to play again?</div>

      <button type='button' className="btn" onClick={reset}>Play again</button>
      </>
      }

    </div>
  )
}

export default Message
