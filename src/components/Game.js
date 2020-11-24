import React from 'react'
import Gameboard from './Gameboard'

function Game() {
  return (
    <div className="game">
      <div className="game__boards">
        <Gameboard size={10} />
        <Gameboard size={10} />
      </div>
    </div>
  )
}

export default Game
