import React from 'react';
import shipsData from '../data/shipsData';

function Stats({ player1, player2, gameNumber }) {
  return (
    <div className='stats'>
      <div className='stats__stat'>
        <span className='stats__name'>Accuracy:</span>
        <span className='stats__value'>
          {Math.floor((player2.accuracy / player2.hits) * 100) || 0}
        </span>
        <div className='stats__outer_bar'>
          <div
            className='stats__inner_bar'
            style={{
              width: `${(Math.floor((player2.accuracy / player2.hits) * 100) * 15) /
                100 || 0
                }vh`,
            }}
          ></div>
        </div>
      </div>
      <div className='stats__stat'>
        <span className='stats__name'>Ally Fleet:</span>
        <span className='stats__value'>
          {Math.floor(
            (player1.fleet /
              shipsData.reduce((sum, current) => sum + current.length, 0)) *
            100
          )}
        </span>
        <div className='stats__outer_bar'>
          <div className='stats__inner_bar'
            style={{
              width: `${(Math.floor(
                (player1.fleet /
                  shipsData.reduce((sum, current) => sum + current.length, 0)) *
                100
              ) * 15) /
                100
                }vh`,
            }}></div>
        </div>
      </div>
      <div className='stats__stat'>
        <span className='stats__name'>Enemy Fleet:</span>
        <span className='stats__value'>
          {Math.floor(
            (player2.fleet /
              shipsData.reduce((sum, current) => sum + current.length, 0)) *
            100
          )}
        </span>
        <div className='stats__outer_bar'>
          <div className='stats__inner_bar'
            style={{
              width: `${(Math.floor(
                (player2.fleet /
                  shipsData.reduce((sum, current) => sum + current.length, 0)) *
                100
              ) * 15) /
                100
                }vh`,
            }}></div>
        </div>
      </div>
      <div className='stats__stat'>
        <span className='stats__name'>Fleets defeated:</span>
        <span className='stats__value'>{player2.wins}</span>
        <div className='stats__outer_bar'>
          <div className='stats__inner_bar'
          style={{
            width: `${player2.wins / gameNumber || 0}vh`,
          }}></div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
