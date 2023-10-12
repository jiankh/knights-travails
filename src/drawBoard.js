function drawBoard() {
    const chessboard = document.getElementById("chessboard");

    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            const cell = document.createElement("div");
            cell.className = (row + col) % 2 === 0 ? "white" : "black";
            cell.setAttribute(`data-${col}-${9 - row}`, "");
            chessboard.appendChild(cell);
        }
    }
}


export {drawBoard}