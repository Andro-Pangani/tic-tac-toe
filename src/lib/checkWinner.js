export function checkForWinner(grid, column, cell, player, points, movesLeft) {
  let score = 0;
  let column_lenght = column.length;
  let temp_cell = cell;
  let winnerProps = {};

  let directions = [
    'vertical',
    'horizontal',
    'left_diagonal',
    'right_diagonal',
  ];

  let coords_array = [];
  let columnIndex = player.coords.col;
  let winner = false;
  let score_constant = points;

  if (!winner) {
    for (let d = 0; d < directions.length; d++) {
      let direction = directions[d];
      var skip_direction = false;

      if (direction === 'vertical') {
        checkVertical();
      }

      if (direction === 'horizontal') {
        checkHorizontal();
      }

      if (direction === 'left_diagonal') {
        checkLeftDiagonal();
      }

      if (direction === 'right_diagonal') {
        checkRightDiagonal();
      }

      if (skip_direction) {
        continue;
      }

      if (winner) {
        winnerProps = {
          finished: true,
          sign: player.sign,
          winner_coords: coords_array,
        };
        break;
      } else {
        // refresh coords
        coords_array = [];
      }
    } // directions Cicle end
  } //winner end

  if (winner) {
    return winnerProps;
  }

  if (!winner && movesLeft === 0) {
    return {
      finished: true,
      sign: 'Draw',
    };
  }

  function checkVerticalHelper(score) {
    let temp_cell = cell - 1;

    // inner cicle
    for (temp_cell; temp_cell >= 0; temp_cell--) {
      if (!column[temp_cell] || column[temp_cell] !== player.sign) {
        break;
      } else {
        score++;
        coords_array.push({ col: columnIndex, cell: temp_cell });

        if (score === score_constant) {
          break;
        }
      }
    } // end of inner circle

    return score;
  }

  function checkVertical() {
    let col_length = column.length;
    var temp_cell = cell;
    let score = 0;
    // !!! global variable refresh
    coords_array = [];

    for (temp_cell; temp_cell < col_length; temp_cell++) {
      if (!column[temp_cell] || column[temp_cell] !== player.sign) {
        // start to opposite direction
        // after founded index
        let temp_cell = cell - 1;

        // inner cicle
        for (temp_cell; temp_cell >= 0; temp_cell--) {
          if (!column[temp_cell] || column[temp_cell] !== player.sign) {
            break;
          } else {
            score++;
            coords_array.push({ col: columnIndex, cell: temp_cell });

            if (score === score_constant) {
              winner = true;
              break;
            }
          }
        } // end of inner circle

        if (winner) {
          skip_direction = false;
        } else {
          skip_direction = true;
        }
        // refreshing starting point
        // temp_cell = cell;
        break;
      } else {
        ++score;
        coords_array.push({ col: columnIndex, cell: temp_cell });

        // if started cool but haven't won the game
        // start from start point + 1 and check opposite direction
        if (temp_cell === column_lenght - 1) {
          score = checkVerticalHelper(score);
        }

        if (score === score_constant) {
          winner = true;
          break;
        }
      }
    }
  } // < searchDown end >

  function checkHorizontalHelper(score) {
    let temp_cell = cell;
    let temp_column = columnIndex + 1;
    let row_length = grid.length;

    // inner cicle
    for (temp_column; temp_column < row_length; temp_column++) {
      if (
        !grid[temp_column][temp_cell] ||
        grid[temp_column][temp_cell] !== player.sign
      ) {
        break;
      } else {
        score++;
        coords_array.push({ col: temp_column, cell: temp_cell });

        if (score === score_constant) {
          break;
        }
      }
    } // end of inner circle

    return score;
  }

  function checkHorizontal() {
    let temp_column = columnIndex;
    let row_length = grid.length;
    let temp_cell = cell;
    let score = 0;

    // !!! global variable refresh
    coords_array = [];

    for (temp_column; temp_column >= 0; temp_column--) {
      if (
        !grid[temp_column][temp_cell] ||
        grid[temp_column][temp_cell] !== player.sign
      ) {
        let temp_column = columnIndex + 1;

        for (temp_column; temp_column < row_length; temp_column++) {
          if (
            !grid[temp_column][temp_cell] ||
            grid[temp_column][temp_cell] !== player.sign
          ) {
            break;
          } else {
            score++;
            coords_array.push({ col: temp_column, cell: temp_cell });

            if (score === score_constant) {
              winner = true;
              break;
            }
          }
        } // inner end

        if (winner) {
          skip_direction = false;
        } else {
          skip_direction = true;
        }
        break;
      } else {
        score++;
        coords_array.push({ col: temp_column, cell: temp_cell });

        if (temp_column === 0) {
          score = checkHorizontalHelper(score);
        }

        if (score === score_constant) {
          winner = true;
          break;
        }
      }
    }
  } // < check horizontal end >

  function checkLeftDiagonalHelper(score) {
    // inner start
    let temp_column = columnIndex + 1;
    let temp_cell = cell + 1;
    let row_length = grid.length;

    for (temp_column; temp_column < row_length; temp_column++) {
      if (
        !grid[temp_column][temp_cell] ||
        grid[temp_column][temp_cell] !== player.sign
      ) {
        break;
      } else {
        score++;
        coords_array.push({ col: temp_column, cell: temp_cell });
        temp_cell++;
      }
    } // inner end

    return score;
  }

  function checkLeftDiagonal() {
    // let col_length = column.length;
    let temp_column = columnIndex;
    let temp_cell = cell;
    let score = 0;

    //global variable refresh
    coords_array = [];

    // x left
    for (temp_column; temp_column >= 0; temp_column--) {
      if (
        !grid[temp_column][temp_cell] ||
        grid[temp_column][temp_cell] !== player.sign
      ) {
        // inner start
        let temp_column = columnIndex + 1;
        let temp_cell = cell + 1;
        let row_length = grid.length;

        for (temp_column; temp_column < row_length; temp_column++) {
          if (
            !grid[temp_column][temp_cell] ||
            grid[temp_column][temp_cell] !== player.sign
          ) {
            break;
          } else {
            score++;
            coords_array.push({ col: temp_column, cell: temp_cell });

            if (score === score_constant) {
              winner = true;
              break;
            }

            temp_cell++;
          }
        } // inner end

        if (winner) {
          skip_direction = false;
        } else {
          skip_direction = true;
        }
        break;
      } else {
        score++;
        coords_array.push({ col: temp_column, cell: temp_cell });

        if (temp_column === 0) {
          score = checkLeftDiagonalHelper(score);
        }

        if (score === score_constant) {
          winner = true;
          break;
        }
        // y bottom
        temp_cell--;
      }
    }
  } // < end of checkLeftDiagonal >

  function checkRightDiagonalHelper(score) {
    // inner start
    let temp_column = columnIndex - 1;
    let temp_cell = cell + 1;

    for (temp_column; temp_column >= 0; temp_column--) {
      if (
        !grid[temp_column][temp_cell] ||
        grid[temp_column][temp_cell] !== player.sign
      ) {
        break;
      } else {
        score++;
        coords_array.push({ col: temp_column, cell: temp_cell });
        temp_cell++;
      }
    } // inner end

    return score;
  }

  function checkRightDiagonal() {
    // let col_length = column.length;
    let temp_column = columnIndex;
    let row_length = grid.length;
    let temp_cell = cell;
    let score = 0;

    //global variable refresh
    coords_array = [];

    // x right
    for (temp_column; temp_column < row_length; temp_column++) {
      if (
        !grid[temp_column][temp_cell] ||
        grid[temp_column][temp_cell] !== player.sign
      ) {
        // inner start
        let temp_column = columnIndex - 1;
        let temp_cell = cell + 1;
        let row_length = grid.length;
        // x left
        for (temp_column; temp_column >= 0; temp_column--) {
          if (
            !grid[temp_column][temp_cell] ||
            grid[temp_column][temp_cell] !== player.sign
          ) {
            break;
          } else {
            score++;
            coords_array.push({ col: temp_column, cell: temp_cell });
            if (score === score_constant) {
              winner = true;
              break;
            }
            // y bottom
            temp_cell++;
          }
        } // inner end

        if (winner) {
          skip_direction = false;
        } else {
          skip_direction = true;
        }
        break;
      } else {
        score++;
        coords_array.push({ col: temp_column, cell: temp_cell });

        if (temp_column === row_length - 1) {
          score = checkRightDiagonalHelper(score);
        }

        if (score === score_constant) {
          winner = true;
          break;
        }

        // y top
        temp_cell--;
      }
    }
  } // < end of checkDiagonalRight>
}
