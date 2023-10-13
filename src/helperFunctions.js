

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

function updateDestination(startCell,endCell) {
    const destinationContainer = document.querySelector(".destination-container")
    destinationContainer.innerHTML = `[${startCell}] → [${endCell}]`
}

function updateSteps(arr,startCell) {
    const movesContainer = document.querySelector(".moves-list")
    movesContainer.innerHTML ="" //clear the list first
    const firstEl = document.createElement("li")
    firstEl.textContent = `[${startCell}]`
    movesContainer.appendChild(firstEl)
  
    arr.forEach((path) => {
      const listEl = document.createElement("li")
      listEl.textContent = `[${path}]`
      movesContainer.appendChild(listEl)
    })
}

function deactivateButtons(startBtnElement,endBtnElement) {
    startBtnElement.classList.remove("active-btn")
    endBtnElement.classList.remove("active-btn")
}
  


export {getNeighbors,
        isValid,
        updateDestination,
        deactivateButtons,
        updateSteps}