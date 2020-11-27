import React from 'react'

function Stats({ player1, player2 }) {
  return (
    <div className="stats">

      <div className="stats__player1">
        <div>Accuracy: {player1.accuracy}</div>
        <div>Fleet: {player1.fleetHP}</div>
        <div>Lost ships: {player1.shipsSunk.map(ship => {
          return (
            <div>{ship}</div>
          )})}
        </div>
        <div>Fleets defeated: {player1.win}</div>
      </div>

      <div className="stats__player2">
        <div>Accuracy: {player2.accuracy}</div>
        <div>Fleet: {player2.fleetHP}</div>
        <div>Lost ships: {player2.shipsSunk.map(ship => {
          return (
            <div>{ship}</div>
          )})}
        </div>
        <div>Fleets defeated: {player2.win}</div>
      </div>
      
    </div>
  )
}

export default Stats
