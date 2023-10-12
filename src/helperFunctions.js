import Cell from "./Cell"

function getPath(startRow,startCol,targetRow,targetCol) {
    const startCell = new Cell(startRow,startCol)
    const queue = [startCell] //BFS queue and start with the first cell

    const visitedCells = new Set() //to avoid looping 

    while (queue.length > 0) {
        //Remove cell from queue
        const cell = queue.shift()
        const {row, col, steps} = cell

        //Process Cell
        if (row === targetRow && col === targetCol) {
            return steps
        }

        visitedCells.add(cell.getPositionString()) 
        //instead of directly using the cell in the set, where some cells will actually be the same row/col with diff steps.

        //Add neighbor cells / next step cells.
        for (const neighbor of getNeighbors(row, col)) {
            const [neighborRow, neighborCol] = neighbor
            const neighborCell = new Cell(neighborRow,neighborCol,  [...steps, [neighborRow, neighborCol]])

            if (visitedCells.has(neighborCell.getPositionString())) {continue}

            queue.push(neighborCell)
        }
    }
}

function getNeighbors(row, col) {
    // Implement your logic to get valid neighbors here.
    // For example, assuming all 8 possible knight's moves are valid:
    const moves = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1]
    ];

    const neighbors = [];
    for (const move of moves) {
        const [dx, dy] = move;
        const newRow = row + dx;
        const newCol = col + dy;
        if (isValid(newRow, newCol)) {
            neighbors.push([newRow, newCol]);
        }
    }

    return neighbors;
}

function isValid(row, col) {
    // Implement your logic to check if a cell is within the grid bounds.
    return row > 0 && row < 9 && col > 0 && col < 9;
}


export {getPath,
        getNeighbors,
        isValid}