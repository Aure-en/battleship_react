import React from 'react'
import shipsData from '../data/shipsData'

function Stats({ player1, player2 }) {
  return (
    <div className="stats">

      <div className="stats__player1">
        <div>Accuracy: {Math.floor(player2.accuracy / player2.hits * 100) || 0}%</div>
        <div>Fleet: {Math.floor(player1.fleet / shipsData.reduce((sum, current) => sum + current.length, 0) * 100)}%</div>
        <div>Lost ships: {player1.shipsSunk.map(ship => {
          return (
            <div key={ship}>{ship}</div>
          )})}
        </div>
        <div>Fleets defeated: {player2.wins}</div>
      </div>

      <div className="stats__player2">
        <div>Accuracy: {Math.floor(player1.accuracy / player2.hits * 100) || 0}%</div>
        <div>Fleet: {Math.floor(player2.fleet / shipsData.reduce((sum, current) => sum + current.length, 0) * 100)}%</div>
        <div>Lost ships: {player2.shipsSunk.map(ship => {
          return (
            <div key={ship}>{ship}</div>
          )})}
        </div>
        <div>Fleets defeated: {player1.wins}</div>
      </div>
      
    </div>
  )
}

export default Stats
