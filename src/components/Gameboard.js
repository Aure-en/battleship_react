import React, { useState, useEffect, useRef } from 'react';
import Ship from './Ship';
import Cell from './Cell';
import shipsData from '../data/shipsData';

function Gameboard({
  size,
  gameState,
  player,
  changeGameState,
  changeCurrentPlayer,
  currentPlayer,
  changeLastShipSunk,
  changePlayerStats,
  difficulty
}) {
  // -- STATE VARIABLES AND REFS --

  const [board, setBoard] = useState(
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

  const [shipsChart, setShipsChart] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );

  /* shipsChart is a copy of board that only contains ships positions
   */

  const [playerStats, setPlayerStats] = useState({
    hits: 0,
    accuracy: 0,
    fleet: shipsData.reduce((sum, current) => sum + +current.length, 0),
    shipsSunk: [],
    wins: 0,
  });

  const boardRef = useRef(null);
  const shipsRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // States variables used to improve computer's plays
  const [firstHit, setFirstHit] = useState({ x: '', y: '' });
  const [previousHit, setPreviousHit] = useState({ x: '', y: '' });
  const [directions, setDirections] = useState([]);
  const [previousDirection, setPreviousDirection] = useState({});

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
  const randomPlaceFleet = (ships) => {
    const boardCopy = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
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
    setBoard(boardCopy);
  };

  // Once the ships coordinates are determined,
  // they are displayed on their right place on the board.
  const displayShip = (shipElem, ship) => {
    shipElem.current.style.gridArea = `${ship.coordinates.x + 1} / ${
      ship.coordinates.y + 1
    } / ${ship.coordinates.x + ship.length + 1} / ${
      ship.coordinates.y + ship.width + 1
    }`;
    ship.length > ship.width ? shipElem.current.classList.add('ship--vertical') : shipElem.current.classList.remove('ship--vertical');
  };

  useEffect(() => {
    player === 1 &&
      ships.forEach((ship, index) => {
        if (!ship.coordinates) return;
        displayShip(shipsRef[index], ship);
      });
  }, [ships]);

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
          board.map((subArr) =>
            subArr.map((cell) => (cell === id ? null : cell))
          ),
          coordinates,
          ships[id].length,
          ships[id].width
        )
      ) {
        coordinates = findNextAvailableSpace(
          board.map((subArr) =>
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
    let ship = Object.assign({}, ships[id]);
    let tempLength = ship.length;
    ship.length = ship.width;
    ship.width = tempLength;

    // If the ship overflows from the board, its coordinate change to fit the board.
    if (ship.coordinates.x + ship.length > size)
      ship.coordinates.x = size - ship.length;
    if (ship.coordinates.y + ship.width > size)
      ship.coordinates.y = size - ship.width;

    // If the ship rotated on an occupied space, it is placed on the next available space instead.
    if (
      !checkSpacesAvailability(
        board.map((subArr) =>
          subArr.map((cell) => (cell === ship.id ? null : cell))
        ),
        ship.coordinates,
        ship.length,
        ship.width
      )
    ) {
      ship.coordinates = findNextAvailableSpace(
        board.map((subArr) =>
          subArr.map((cell) => (cell === ship.id ? null : cell))
        ),
        ship.coordinates,
        ship.length,
        ship.width
      );
    }

    // Update ships and board state variables
    updateShips(ship);
    updateBoard(ship);
  };

  // Helper functions to update ships and board state variables when we move a specific ship / board.
  const updateShips = (ship) => {
    setShips((prevShips) =>
      prevShips.map((prevShip) => {
        if (prevShip.id === ship.id) {
          return ship;
        } else {
          return prevShip;
        }
      })
    );
  };

  const updateBoard = (ship) => {
    setBoard((prevBoard) => {
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
  };

  // When the game starts, the ship positions alone is saved in shipsChart
  useEffect(() => {
    if (gameState !== 'game') return;
    setShipsChart(() => {
      const chart = Array(size)
        .fill(null)
        .map(() => Array(size).fill(null));
      for (let ship of ships) {
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
            chart[x][y] = ship.id;
          }
        }
      }
      return chart;
    });
  }, [gameState]);

  // -- GAME --

  /* To play a turn :
  - Get valid coordinates
  - Play turn, mark the board, checks if a ship sunk, checks if there was a victory
  - If there was no victory, change the player.
  */

  const playerPlay = (event) => {
    if (
      board[event.target.dataset.x][event.target.dataset.y] === 'X' ||
      board[event.target.dataset.x][event.target.dataset.y] === 'O'
    )
      return;
    handleTurn(event.target.dataset.x, event.target.dataset.y);
  };

  const computerEasyPlay = () => {
    let coordinates;
    do {
      coordinates = generateRandomPlay();
    } while (
      board[coordinates.x][coordinates.y] === 'X' ||
      board[coordinates.x][coordinates.y] === 'O'
    );
    // Small setTimeout to simulate "thinking" time.
    setTimeout(() => handleTurn(coordinates.x, coordinates.y), 300);
  };

  const generateRandomPlay = () => {
    return {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
  };

  const handleTurn = (x, y) => {
    // Nothing happens if the player choose a cell he already chose.
    if (board[x][y] === 'X' || board[x][y] === 'O') return;

    // If the cell is empty, we mark the cell as played on and move to the next turn.
    if (board[x][y] === null) {
      setBoard((prevBoard) => {
        prevBoard[x][y] = 'X';
        return prevBoard;
      });
    }

    /* If the cell contains a ship:
    1. The cell is marked with a 'O'
    2. Check if the ship sunk
    3. If it sunk, check if it was the last ship.
    */

    if (typeof board[x][y] === 'number') {
      // Marks the cell with a 'O'
      const currentBoard = [...board];
      currentBoard[x][y] = 'O';
      setBoard(currentBoard);

      // Check if the ship sunk
      // If it didn't sink, we keep on playing normally.
      // If it sunk, we checked if there are ships left.
      // We also announce that a ship fell.
      if (!currentBoard.flat().includes(shipsChart[x][y])) {
        changeLastShipSunk(player, shipsChart[x][y]);
        // There are ships left: we go to the next turn.
        if (
          currentBoard.flat().filter((item) => typeof item === 'number')
            .length === 0
        ) {
          changeGameState('end');
          setPlayerStats((prevStats) => {
            const stats = Object.assign({}, prevStats);
            stats.wins = prevStats.wins + 1;
            return stats;
          });
        }
      }
    }

    // At the end of each turn, swap player and update stats.
    changeCurrentPlayer();
    setPlayerStats((prevStats) => {
      const stats = Object.assign({}, prevStats);
      stats.hits = prevStats.hits + 1;
      stats.accuracy = board.flat().filter((cell) => cell === 'O').length;
      stats.fleet =
        shipsData.reduce((sum, current) => sum + +current.length, 0) -
        board.flat().filter((cell) => cell === 'O').length;
      stats.shipsSunk = Array.from(
        new Set(
          shipsChart.flat().filter((ship) => !board.flat().includes(ship))
        )
      );
      return stats;
    });
  };

  const computerNormalPlay = () => {
    let coordinates;
    let currentDirections = [...directions];

    do {
      // If the computer has no indication about a potential ship position, it just hits random spaces.
      if (currentDirections.length === 0) {
        coordinates = generateRandomPlay();

        // Otherwise, we follow the first direction of the directions array.
      } else {
        if (JSON.stringify(previousHit) === JSON.stringify(firstHit)) {
          coordinates = {
            x: firstHit.x + currentDirections[0].x,
            y: firstHit.y + currentDirections[0].y,
          };
        } else {
          // If the computer found a ship on an adjacent space, it keeps going in the same direction.
          if (currentDirections[0] === previousDirection) {
            coordinates = {
              x: previousHit.x + currentDirections[0].x,
              y: previousHit.y + currentDirections[0].y,
            };
            // If the computer didn't find a ship when he went in the previous direction, it tries another adjacent space.
          } else {
            coordinates = {
              x: firstHit.x + currentDirections[0].x,
              y: firstHit.y + currentDirections[0].y,
            };
          }
        }
        if (
          coordinates.x < 0 ||
          coordinates.x > size ||
          coordinates.y < 0 ||
          coordinates.y > size ||
          board[coordinates.x][coordinates.y] === 'X' ||
          board[coordinates.x][coordinates.y] === 'O'
        ) {
          currentDirections = currentDirections.slice(1);
        }
      }
    } while (
      coordinates.x < 0 ||
      coordinates.x > size ||
      coordinates.y < 0 ||
      coordinates.y > size ||
      board[coordinates.x][coordinates.y] === 'X' ||
      board[coordinates.x][coordinates.y] === 'O'
    );
    setDirections(currentDirections);
    setPreviousDirection(currentDirections[0]);
    handleComputerTurn(coordinates.x, coordinates.y);
  };

  const handleComputerTurn = (x, y) => {
    // If the cell is empty:
    // - We mark the cell as played.
    // - If checking this cell was the result of searching adjacents spaces, we delete the direction we were searching in.
    if (board[x][y] === null) {
      setBoard((prevBoard) => {
        prevBoard[x][y] = 'X';
        return prevBoard;
      });
      setDirections((prevDirections) => {
        let directions = [...prevDirections];
        directions = directions.slice(1);
        return directions;
      });
    }

    /* If the cell contains a ship:
    1. The cell is marked with a 'O'
    2. Check if the ship sunk
    3. If it sunk, check if it was the last ship.
    */

    if (typeof board[x][y] === 'number') {
      // Marks the cell with a 'O'
      const currentBoard = [...board];
      currentBoard[x][y] = 'O';
      setBoard(currentBoard);

      // If finding the ship was the result of a random attack:
      // - Tells the computer to remember this space
      // - Tells the computer to search in adjacent spaces during the next few turns (top, bottom, left, right)
      // If it was the result of searching adjacents spaces:
      // - The computer keeps going in the same direction by remembering the direction it came from and the space it's just hit.
      if (directions.length === 0) {
        setFirstHit({ x, y });
        setDirections([
          { x: 0, y: 1 },
          { x: 0, y: -1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
        ]);
      }

      // Check if the ship sunk
      // If it didn't sink, we keep on playing normally.
      // If it sunk, we check if there are ships left.
      // We also announce that a ship fell.
      // Tells the computer to not look in adjacent spaces anymore.
      if (!currentBoard.flat().includes(shipsChart[x][y])) {
        changeLastShipSunk(player, shipsChart[x][y]);
        setDirections([]);
        setFirstHit({ x: '', y: '' });
        setPreviousHit({ x: '', y: '' });

        // There are ships left: we go to the next turn.
        if (
          currentBoard.flat().filter((item) => typeof item === 'number')
            .length === 0
        ) {
          changeGameState('end');
          setPlayerStats((prevStats) => {
            const stats = Object.assign({}, prevStats);
            stats.wins = prevStats.wins + 1;
            return stats;
          });
        }
      }
    }

    // Remember the computer's latest hit
    setPreviousHit({ x, y });

    // At the end of each turn, swap player and update stats.
    changeCurrentPlayer();
    setPlayerStats((prevStats) => {
      const stats = Object.assign({}, prevStats);
      stats.hits = prevStats.hits + 1;
      stats.accuracy = board.flat().filter((cell) => cell === 'O').length;
      stats.fleet =
        shipsData.reduce((sum, current) => sum + +current.length, 0) -
        board.flat().filter((cell) => cell === 'O').length;
      stats.shipsSunk = Array.from(
        new Set(
          shipsChart.flat().filter((ship) => !board.flat().includes(ship))
        )
      );
      return stats;
    });
  };

  // After the player plays, the computer plays.
  // 2nd condition is added so that the computer only plays on its opponent's board.
  useEffect(() => {
    if (currentPlayer === 2 && player === 1) {
      difficulty === 'normal' ? computerNormalPlay() : computerEasyPlay();
    }
  }, [currentPlayer]);

  // -- GAME (RE)START --
  // - Make player 1 the first player to play
  // - Reset ships positions
  // - Reset stats

  // If the current player is player 2, swap it to player 1.
  useEffect(() => {
    if (gameState !== 'initialization') return;
    currentPlayer === 2 && changeCurrentPlayer();
  }, [gameState]);

  // Place the ships randomly every time a new game begins.
  useEffect(() => {
    if (gameState !== 'initialization') return;
    randomPlaceFleet(shipsData);
    setShipsChart(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(null))
    );
  }, [gameState]);

  // Reset all stats except the number of wins
  useEffect(() => {
    if (gameState !== 'initialization') return;
    setPlayerStats((prevStats) => {
      const stats = Object.assign({}, prevStats);
      stats.hits = 0;
      stats.accuracy = 0;
      stats.fleet = shipsData.reduce(
        (sum, current) => sum + +current.length,
        0
      );
      stats.shipsSunk = [];
      return stats;
    });
  }, [gameState]);

  // -- STATS --
  // After the stats are updated, the data is sent to <Game /> to be displayed.
  useEffect(() => {
    changePlayerStats(playerStats);
  }, [playerStats]);

  return (
    <div
      className={`container container--${player}`}
      onMouseDown={(event) => {
        if (gameState === 'initialization') {
          dragOnMouseDown(event);
        }
      }}
      onDoubleClick={(event) => {
        if (gameState === 'initialization') {
          rotate(event);
        }
      }}
      ref={boardRef}
    >
      <div className='board'>
        {board.map((x, xIndex) => (
          <React.Fragment key={xIndex}>
            {x.map((y, yIndex) => (
              <Cell
                key={`${xIndex}-${yIndex}`}
                x={xIndex}
                y={yIndex}
                wasHit={
                  board[xIndex][yIndex] === 'X' || board[xIndex][yIndex] === 'O'
                }
                containsShip={shipsChart[xIndex][yIndex] !== null}
                isShipSunk={
                  shipsChart[xIndex][yIndex] !== null &&
                  !board.flat().includes(shipsChart[xIndex][yIndex])
                }
                playerPlay={playerPlay}
                gameState={gameState}
                player={player}
                board={true}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/*Ships components are only used before the game, to place the ships.*/}
      {player === 1 &&
        gameState === 'initialization' &&
        shipsData.map((ship, index) => (
          <Ship
            length={ship.length}
            id={ship.id}
            key={ship.id}
            ref={shipsRef[index]}
            player={player}
          />
        ))}
    </div>
  );
}

export default Gameboard;
