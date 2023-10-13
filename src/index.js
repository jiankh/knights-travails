import { drawBoard, clearBoard } from "./drawBoard"
import { getPath } from "./getPath"
import {updateDestination, updateSteps, deactivateButtons} from "./helperFunctions"

let activeButton
let startCell =[0,0]
let endCell = [0,0]
drawBoard(startCell,endCell)

const chessboard = document.querySelector(".chessboard")
const startButton = document.querySelector(".start-cell-btn")
const endButton = document.querySelector(".end-cell-btn")
const travailButton = document.querySelector(".travail-btn")

startButton.addEventListener("click", (e) => {
    e.preventDefault()
    activeButton = "start"
    endButton.classList.remove("active-btn")
    startButton.classList.add("active-btn")
})

endButton.addEventListener("click", (e) => {
    e.preventDefault()
    activeButton = "end"
    startButton.classList.remove("active-btn")
    endButton.classList.add("active-btn")
})

chessboard.addEventListener("click", (event) => {
  const clickedCell = event.target;
  if (clickedCell.classList.contains("cell")) {
    // Handle the click on the cell here
    // You can use clickedCell to identify the specific cell that was clicked
    // For example, you can access its data attributes or class names.
    // const dataPosition = clickedCell.getAttribute("data-position");
    // console.log(dataPosition);
    if (activeButton === "start") {
      let stringdata = clickedCell.getAttribute("data-position");
      startCell = stringdata.split(",").map(Number);
      //inputString.split(",") splits the input string at the comma, resulting in an array of substrings ["2", "3"].
      //.map(Number) converts each substring to a number, creating the final array [2, 3].
    } else if (activeButton === "end") {
      let stringdata = clickedCell.getAttribute("data-position");
      endCell = stringdata.split(",").map(Number);
    }
    clearBoard();
    drawBoard(startCell, endCell);
    console.log(`start: ${startCell}, target: ${endCell}`);
  }
});

travailButton.addEventListener("click", (e) => {
  e.preventDefault()
  deactivateButtons(startButton,endButton)
  if (startCell[0] === 0 && startCell[1] === 0 || endCell[0] === 0 && endCell[1] === 0) {return}
  //cant do startCell === [0,0] bc it compares memory not values

  const [startRow, startCol] = startCell
  const [targetRow, targetCol] = endCell
  const paths = getPath(startRow,startCol,targetRow,targetCol)
  console.log(paths)
  updateDestination(startCell,endCell)
  updateSteps(paths,startCell)
  drawPath(paths,startCell)

})

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