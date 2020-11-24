import React, { useState, useEffect, useRef } from 'react'
import Ship from './Ship'
import shipsData from '../data/shipsData'

function Gameboard({ size }) {

  const [board, setBoard] = useState(Array(size).fill(null).map(subArr => Array(size).fill(null)))
  const [ships, setShips] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
  const shipsRef = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]

  // -- FLEET PLACEMENT --

  /* 1. Placing ships randomly :
    - Generate random coordinates until available coordinates are found
    - Update board state variable to place the ship on it
    - Visually display the ship on its right place with useEffect.
  */

  useEffect(() => {
    randomPlaceFleet(board, shipsData)
  }, [])

  // Generate random orientation.
  const generateOrientation = (length) => {
    return Math.random() > 0.5 ? { length: 1, width: length } : { length: length, width: 1 }
  }

  // Generate random first coordinate while taking the ship's length into account. Return {x:..., y:... }.
  const generateCoordinate = ( { length, width } ) => {
    return {
      x: Math.floor(Math.random() * (size - length + 1)),
      y: Math.floor(Math.random() * (size - width + 1))
    }
  }

  // Check if the ship can be placed on those spaces or if they are already occupied.
  // Return true if the spaces are available, false otherwise.
  const checkSpacesAvailability = (board, coordinate, length, width) => {
    for (let x = coordinate.x ; x < coordinate.x + length ; x +=1 ) {
      for (let y = coordinate.y ; y < coordinate.y + width ; y +=1 ) { 
        if (board[x][y] !== null) {
          return false
        }
      }
    }
    return true
  }

  // Place one ship randomly
  const randomPlaceShip = (board, ship) => {
    const orientation = generateOrientation(ship.length)

    let coordinate;
    do {
      coordinate = generateCoordinate(orientation)
    } while (!checkSpacesAvailability(board, coordinate, orientation.length, orientation.width))

    const placedShip = {}
    placedShip.id = ship.id
    placedShip.coordinate = coordinate
    placedShip.length = orientation.length
    placedShip.width = orientation.width
    return placedShip
  }

  // Loops to place all the ships randomly
  const randomPlaceFleet = (board, ships) => {
    const boardCopy = board;
    let placedShips = []

    /* ship looks something like this:
     {
      id: 1,
      coordinate: {x: 0, y: 0},
      length: 5,
      width: 1
     }
    */
    for (let ship of ships) {
      const placedShip = randomPlaceShip(boardCopy, ship)
      placedShips.push(placedShip)
      for (let x = placedShip.coordinate.x ; x < placedShip.coordinate.x + placedShip.length ; x+= 1) {
        for (let y = placedShip.coordinate.y ; y < placedShip.coordinate.y + placedShip.width ; y+= 1) {
          boardCopy[x][y] = placedShip.id
        }
      }
    }

    // Update board and ships states.
    setShips(placedShips)
    setBoard(boardCopy)
  }

  // Once the ships coordinates are determined, they are displayed on their right place on the board.

  const displayShip = (shipElem, ship) => {
    shipElem.current.style.gridArea = `${ship.coordinate.x + 1} / ${ship.coordinate.y + 1} / ${ship.coordinate.x + ship.length + 1} / ${ship.coordinate.y + ship.width + 1}`
    shipElem.current.style.flexDirection = ship.length > ship.width ? 'column' : 'row'
  }

  useEffect(() => {
    ships.forEach((ship, index) => {
      if (!ship.coordinate) return
      displayShip(shipsRef[index], ship)
    })
  }, [ships])

  return (

    <div className="container">

      <div className="board">
        {
          board.map((x, xIndex) => {
            return <React.Fragment key={xIndex}>
              {
                x.map((y, yIndex) => {
                  return <div key={`${xIndex}-${yIndex}`} className="cell" data-x={xIndex} data-y={yIndex}></div>
                })
              }
            </React.Fragment>
          })
        }
      </div>

      {
        shipsData.map((ship, index) => {
          return (
            <Ship
              length={ship.length}
              id={ship.id}
              key={ship.id}
              ref={shipsRef[index]}
            />
          )
        })
      }

    </div>
    
  )
}

export default Gameboard
