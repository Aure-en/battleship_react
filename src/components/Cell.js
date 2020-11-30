import React from 'react';

function Cell({
  x,
  y,
  wasHit,
  containsShip,
  isShipSunk,
  playerPlay,
  gameState,
  player,
  board,
}) {
  return (
    <div
      className={
        `cell + cell--${player}` +
        (board ? ' cell--board' : '') +
        (isShipSunk ? ' cell--sunk' : '') +
        (player === 1 && containsShip ? ' cell--ship' : '')
      }
      data-x={x}
      data-y={y}
      onClick={(event) => {
        if (gameState === 'game') {
          playerPlay(event);
        }
      }}
    >
      {wasHit && containsShip && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-circle mark--o'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke={player === 1 || (player === 2 && isShipSunk) ? '#00131a' : '#02ffff'}
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <circle cx='12' cy='12' r='9' />
        </svg>
      )}
      {wasHit && !containsShip && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-x mark--x'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='#02ffff'
          fill='none'
          stroke-linecap='round'
          stroke-linejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      )}
    </div>
  );
}

export default Cell;
