import React, { useState, useEffect, useRef } from 'react';
import Ship from './Ship';
import shipsData from '../data/shipsData';

function Gameboard({ size, gameState }) {

  // -- STATE VARIABLES AND REFS --

  const [shipsChart, setShipsChart] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  
    /* board is an array that initially contains:
    - null if the space is empty
    - a number (=the ship id) if it contains a ship
    */
  
  const [ships, setShips] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);

    /* ships is an array that contains ship objects.
    A ship looks something like this:
     {
      id: 1,
      coordinates: {x: 0, y: 0},
      length: 5,
      width: 1
     }
    */

  const boardRef = useRef(null);
  const shipsRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // -- FLEET PLACEMENT --

  /* 1. Placing ships randomly :
    - Generate random coordinates until available coordinates are found
    - Update board state variable to place the ship on it
    - Visually display the ship on its right place with useEffect.
  */

  // Generate random orientation.
  const generateOrientation = (length) =>
    Math.random() > 0.5 ? { length: 1, width: length } : { length, width: 1 };

  // Generate random first coordinates while taking the ship's length into account.
  // Return {x:..., y:... }.
  const generateCoordinates = ({ length, width }) => ({
    x: Math.floor(Math.random() * (size - length + 1)),
    y: Math.floor(Math.random() * (size - width + 1)),
  });

  // Check if the ship can be placed on those spaces or if they are already occupied.
  // Return true if the spaces are available, false otherwise.
  const checkSpacesAvailability = (board, coordinates, length, width) => {
    for (let row = coordinates.x; row < coordinates.x + length; row += 1) {
      for (let col = coordinates.y; col < coordinates.y + width; col += 1) {
        if (board[row][col] !== null) {
          return false;
        }
      }
    }
    return true;
  };

  // Place one ship randomly
  const randomPlaceShip = (board, ship) => {
    const orientation = generateOrientation(ship.length);

    let coordinates;
    do {
      coordinates = generateCoordinates(orientation);
    } while (
      !checkSpacesAvailability(
        board,
        coordinates,
        orientation.length,
        orientation.width
      )
    );

    const placedShip = {};
    placedShip.id = ship.id;
    placedShip.coordinates = coordinates;
    placedShip.length = orientation.length;
    placedShip.width = orientation.width;
    return placedShip;
  };

  // Loops to place all the ships randomly
  const randomPlaceFleet = (board, ships) => {
    const boardCopy = board;
    const placedShips = [];
    for (const ship of ships) {
      const placedShip = randomPlaceShip(boardCopy, ship);
      placedShips.push(placedShip);
      for (
        let { x } = placedShip.coordinates;
        x < placedShip.coordinates.x + placedShip.length;
        x += 1
      ) {
        for (
          let { y } = placedShip.coordinates;
          y < placedShip.coordinates.y + placedShip.width;
          y += 1
        ) {
          boardCopy[x][y] = placedShip.id;
        }
      }
    }

    // Update board and ships states.
    setShips(placedShips);
    setShipsChart(boardCopy);
  };

  // Once the ships coordinates are determined,
  // they are displayed on their right place on the board.
  const displayShip = (shipElem, ship) => {
    shipElem.current.style.gridArea = `${ship.coordinates.x + 1} / ${
      ship.coordinates.y + 1
    } / ${ship.coordinates.x + ship.length + 1} / ${
      ship.coordinates.y + ship.width + 1
    }`;
    shipElem.current.style.flexDirection =
      ship.length > ship.width ? 'column' : 'row';
  };

  useEffect(() => {
    ships.forEach((ship, index) => {
      if (!ship.coordinates) return;
      displayShip(shipsRef[index], ship);
    });
  }, [ships]);

  useEffect(() => {
    randomPlaceFleet(shipsChart, shipsData);
  }, []);

  /* 2. Manually placing the ships.
  Once the ships have been placed automatically at the start,
  the user can choose to move / rotate them manually before starting the game.
  */

  // Allow players to drag their ships to place them
  const dragOnMouseDown = (event) => {
    // Initializing : gets ship, board position, cell size
    if (!event.target.closest('.ship')) return;
    const boardCoords = boardRef.current.getBoundingClientRect();
    const cell = boardRef.current.clientWidth / size;
    const target = event.target.closest('.ship');
    const id = +target.id;
    event.preventDefault();

    // Prepare the ship for moving
    shipsRef[id].current.style.zIndex = 1000;

    // Remember where we click on the ship
    const shiftX =
      event.clientX - shipsRef[id].current.getBoundingClientRect().left;
    const shiftY =
      event.clientY - shipsRef[id].current.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      let left = pageX - shiftX - boardCoords.left;
      let top = pageY - shiftY - boardCoords.top;
      shipsRef[id].current.style.gridArea = '';

      // Limits draggable area to the board
      if (left < 0) {
        left = 0;
      }

      if (
        left >
        boardRef.current.clientWidth - shipsRef[id].current.offsetWidth
      ) {
        left = boardRef.current.clientWidth - shipsRef[id].current.offsetWidth;
      }

      if (top < 0) {
        top = 0;
      }

      if (
        top >
        boardRef.current.offsetHeight - shipsRef[id].current.offsetHeight
      ) {
        top = boardRef.current.offsetHeight - shipsRef[id].current.offsetHeight;
      }

      shipsRef[id].current.style.left = `${left}px`;
      shipsRef[id].current.style.top = `${top}px`;
    };

    const dragOnMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    const dragOnMouseUp = () => {
      // Calculate the current position
      let coordinates = {
        x: Math.round(
          (shipsRef[id].current.getBoundingClientRect().top - boardCoords.top) /
            cell
        ),
        y: Math.round(
          (shipsRef[id].current.getBoundingClientRect().left -
            boardCoords.left) /
            cell
        ),
      };

      // Checks if the spaces are available. If they aren't, find the next available space and place the ship there.
      if (
        !checkSpacesAvailability(
          shipsChart.map((subArr) =>
            subArr.map((cell) => (cell === id ? null : cell))
          ),
          coordinates,
          ships[id].length,
          ships[id].width
        )
      ) {
        coordinates = findNextAvailableSpace(
          shipsChart.map((subArr) =>
            subArr.map((cell) => (cell === id ? null : cell))
          ),
          coordinates,
          ships[id].length,
          ships[id].width
        );
      }

      // Update ships state variable and board with the new coordinates
      const ship = Object.assign({}, ships[id]);
      ship.coordinates = coordinates;

      updateShips(ship);
      updateBoard(ship);

      // Finish dragging
      shipsRef[id].current.style.left = '';
      shipsRef[id].current.style.top = '';
      shipsRef[id].current.style.zIndex = '';

      document.removeEventListener('mousemove', dragOnMouseMove);
      document.removeEventListener('mouseup', dragOnMouseUp);
      shipsRef[id].current.onMouseDown = null;
    };

    document.addEventListener('mousemove', dragOnMouseMove);
    document.addEventListener('mouseup', dragOnMouseUp);
  };

  // Find next available space if the player put the ship on an occupied space
  const findNextAvailableSpace = (
    board,
    originalCoordinates,
    length,
    width
  ) => {
    let coordinates = originalCoordinates;
    let radius = 1;

    // Looks at all the adjacent spaces.
    // If they are all occupied, expands the search radius and looks at the further spaces, etc.
    while (!checkSpacesAvailability(board, coordinates, length, width)) {
      for (let i = 0; i <= radius; i += 1) {
        if (
          coordinates.x - i > 0 &&
          coordinates.y - (radius - i) > 0 &&
          checkSpacesAvailability(
            board,
            { x: coordinates.x - i, y: coordinates.y - (radius - i) },
            length,
            width
          )
        ) {
          coordinates = {
            x: coordinates.x - i,
            y: coordinates.y - (radius - i),
          };
        } else if (
          coordinates.x - i > 0 &&
          coordinates.y + (radius - i) < size - length &&
          checkSpacesAvailability(
            board,
            { x: coordinates.x - i, y: coordinates.y + (radius - i) },
            length,
            width
          )
        ) {
          coordinates = {
            x: coordinates.x - i,
            y: coordinates.y + (radius - i),
          };
        } else if (
          coordinates.x + i < size - length &&
          coordinates.y - (radius - i) > 0 &&
          checkSpacesAvailability(
            board,
            { x: coordinates.x + i, y: coordinates.y - (radius - i) },
            length,
            width
          )
        ) {
          coordinates = {
            x: coordinates.x + i,
            y: coordinates.y - (radius - i),
          };
        } else if (
          coordinates.x + i < size - length &&
          coordinates.y + (radius - i) < size - length &&
          checkSpacesAvailability(
            board,
            { x: coordinates.x + i, y: coordinates.y + (radius - i) },
            length,
            width
          )
        ) {
          coordinates = {
            x: coordinates.x + i,
            y: coordinates.y + (radius - i),
          };
        }
      }
      radius += 1;
    }
    return coordinates;
  };

  /* 3. Ships can be rotated on double click
  - To rotate a ship, we swap its length and width.
  - If swapping them causes the ship to overflow from the board, we change the coordinates to fit the board.
  - If rotating causes the ship to overlap on another ship, we place it on the next available space.
  */
  const rotate = (event) => {
    // Initializing
    if (!event.target.closest('.ship')) return;
    const target = event.target.closest('.ship');
    const id = +target.id;

    // Swap width and length
    let ship = Object.assign({}, ships[id])
    let tempLength = ship.length
    ship.length = ship.width
    ship.width = tempLength

    // If the ship overflows from the board, its coordinate change to fit the board.
    if (ship.coordinates.x + ship.length > size) ship.coordinates.x = size - ship.length
    if (ship.coordinates.y + ship.width > size) ship.coordinates.y = size - ship.width

    // If the ship rotated on an occupied space, it is placed on the next available space instead.
    if (
      !checkSpacesAvailability(
        shipsChart.map((subArr) =>
          subArr.map((cell) => (cell === ship.id ? null : cell))
        ),
        ship.coordinates,
        ship.length,
        ship.width
      )
    ) {
      ship.coordinates = findNextAvailableSpace(
        shipsChart.map((subArr) =>
          subArr.map((cell) => (cell === ship.id ? null : cell))
        ),
        ship.coordinates,
        ship.length,
        ship.width
      );
    }

    // Update ships and board state variables
    updateShips(ship)
    updateBoard(ship)

  };

  // Helper functions to update ships and board state variables when we move a specific ship / board.
  const updateShips = (ship) => {
    setShips(prevShips => prevShips.map(prevShip => {
      if (prevShip.id === ship.id) {
        return ship
      } else {
        return prevShip
      }
    }))
  }

  const updateBoard = (ship) => {
    setShipsChart((prevBoard) => {
      const board = [...prevBoard].map((subArr) =>
        subArr.map((cell) => (cell === ship.id ? null : cell))
      );
      for (
        let x = ship.coordinates.x;
        x < ship.coordinates.x + ship.length;
        x += 1
      ) {
        for (
          let y = ship.coordinates.y;
          y < ship.coordinates.y + ship.width;
          y += 1
        ) {
          board[x][y] = ship.id;
        }
      }
      return board;
    });
  }

  return (
    <div 
      className='container' 
      onMouseDown={(event) => {
        if (gameState === 'initialization') {
          dragOnMouseDown(event)
        }
      }} 
      onDoubleClick={(event) => {
        if (gameState === 'initialization') {
          rotate(event)
        }
      }} 
      ref={boardRef}
    >
      <div className='board'>
        {shipsChart.map((x, xIndex) => (
          <React.Fragment key={xIndex}>
            {x.map((y, yIndex) => (
              <div
                key={`${xIndex}-${yIndex}`}
                className='cell'
                data-x={xIndex}
                data-y={yIndex}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {shipsData.map((ship, index) => (
        <Ship
          length={ship.length}
          id={ship.id}
          key={ship.id}
          ref={shipsRef[index]}
        />
      ))}
    </div>
  );
}

export default Gameboard;
