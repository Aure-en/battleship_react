import React from 'react'

function Cell({ x, y, wasHit, containsShip, isShipSunk, playerPlay, gameState }) {
  return (
    <div 
      className={'cell' + (isShipSunk ? ' cell--sunk' : '')}
      data-x={x} 
      data-y={y}
      onClick={(event) => {
        if (gameState === 'game') {
          playerPlay(event)
        }
      }}
    >
      {(wasHit && containsShip) && 'O'}
      {(wasHit && !containsShip) && 'X'}
    </div>
  )
}

export default Cell
