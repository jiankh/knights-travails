
const chessboard = document.getElementById("chessboard");
function drawBoard(startCell, targetCell) {

    const [rowStart, colStart] = startCell
    const [rowTarget, colTarget] = targetCell

    console.log(startCell)
    console.log(rowStart)
    console.log(colStart)

    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            const cell = document.createElement("div");
            cell.className = (row + col) % 2 === 0 ? "white" : "black";
            cell.setAttribute(`data-position`, `${col},${9 - row}`);
            cell.classList.add("cell")
            chessboard.appendChild(cell);

            // console.log(`${rowStart} == ${row} and ${colStart} == ${col}`)
            // console.log(`${startCell}, ${targetCell}`)

            if (rowStart === col && colStart===(9-row)) { //i think i just mixed up row/col but this works.
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