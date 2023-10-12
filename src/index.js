import { drawBoard, clearBoard } from "./drawBoard"
import { getPath } from "./helperFunctions"



// const cell = document.querySelector("[data-4-4]")
// cell.innerHTML = `<img src="images/knight.png">`
// console.log(getPath(1,1,8,8))

let activeButton
let startCell =[0,0]
let endCell = [0,0]
drawBoard(startCell,endCell)

const cells = document.querySelectorAll(".cell")
const startButton = document.querySelector(".start-cell-btn")
const endButton = document.querySelector(".end-cell-btn")
const travailButton = document.querySelector(".travail-btn")

const chessboard = document.querySelector(".chessboard")


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
        const dataPosition = clickedCell.getAttribute("data-position");
        console.log("Clicked on cell with data-position: " + dataPosition);
    }
});

// cells.forEach((cell) => {
//     cell.addEventListener("click", () => {
//         if (activeButton === "start") {
//             startCell = [cell.getAttribute("data-position")]
//         } else if (activeButton === "end") {
//             endCell = [cell.getAttribute("data-position")]
//         }
//         console.log(startCell)
//     })
// })

