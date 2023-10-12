
const chessboard = document.getElementById("chessboard");
function drawBoard(startCell, targetCell) {
    console.log(startCell)

    const [rowStart, colStart] = startCell
    const [rowTarget, colTarget] = targetCell

    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            const cell = document.createElement("div");
            cell.className = (row + col) % 2 === 0 ? "white" : "black";
            cell.setAttribute(`data-position`, `${col},${9 - row}`);
            cell.classList.add("cell")
            chessboard.appendChild(cell);

            if (rowStart === row &&  colStart===col) {
                cell.classList.add("start-cell")
            }
            if (rowTarget === row &&  colTarget===col) {
                cell.classList.add("target-cell")
            }


        }
    }
}

function clearBoard() {
    chessboard.innerHTML =""
}


export {drawBoard,clearBoard}