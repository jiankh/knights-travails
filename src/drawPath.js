function drawPath(paths,startCell) {
    let num = 2
    paths.forEach((path) => {
      const selectedCell = document.querySelector(`[data-position="${path}"]`) //need to use two different ticks ' "
      selectedCell.classList.add("pathway")
      selectedCell.textContent = num
      num++
    })
    //taking the knight out of the first cell and putting "1" in it
    const startingCell = document.querySelector(`[data-position="${startCell}"]`)
    startingCell.textContent = 1
    startingCell.classList.remove("knight-cell")
    
    const targetCellPosition = paths[ paths.length - 1 ] 
    const targetCell = document.querySelector(`[data-position="${targetCellPosition}"]`)
    targetCell.classList.add("knight-cell")
}

export {drawPath}