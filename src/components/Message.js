import React from 'react'

function Message({ gameState, changeGameState, currentPlayer }) {
  return (
    <div>
      <div className="instructions">
        Welcome, Lieutenant!<br/>
        In such a battle, preparations are crucial. Take your time to think of the perfect strategy to defend your ships.<br/>
        Drag your ships to place them, and double click on them to rotate them.<br/>
        Engage in combat whenever you feel ready.
      </div>

      {gameState === 'initialization' && <button type='button' onClick={() => changeGameState('game')}>To Battle!</button>}

    </div>
  )
}

export default Message
