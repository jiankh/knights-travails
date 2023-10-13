# Knights-Travails
The famous Knights Travails exercise where the Knight in Chess can move through the chessboard to any location. Using Breadth First Search, we can find the shortest path towards the destination. 
<p> Live site: <a href="https://jiankh.github.io/knights-travails/"> link </a> </p>
<img src="/dist/images/knight-travails.png">

<h2> Insights and Takeaways From the Project</h2>
<hr>
<br>
<ul>
<li>
   Adding an eventListener to a container element instead of adding individual eventListeners to every single element inside the container. In this case it would have been 64 cell with 64 eventListeners!!!
  Another big advantage with this approach was that everytime the chessboard was redrawn (basically deleted the board and re-made it with each change), the eventListeners that were place at the beginning page load would also be deleted. Using this other method of adding the eventListener to the container would prevent this, and the eventListener will always be present no matter how many times the board gets re-rendered.
</li>
<li>
   Using the <em>stringdata.split(",").map(Number)</em> to split a String between the "," and map it into a real Array. 
</li>
</ul>

```javascript
chessboard.addEventListener("click", (event) => {
    const clickedCell = event.target
    if (clickedCell.classList.contains("cell")) {
        if (activeButton === "start") {
            let stringdata = clickedCell.getAttribute("data-position")
            startCell = stringdata.split(",").map(Number)
        } else if (activeButton === "end") {
            let stringdata = clickedCell.getAttribute("data-position")
            endCell = stringdata.split(",").map(Number)
        }
        clearBoard()
        drawBoard(startCell, endCell)
        }
})
```


<hr>
<ul>
<li>
  The main function of the project was the Breadth First Traversal: the <em>getPath()</em> function. It the classic BFS but with an added argument of <em>steps=[]</em> which is initialized as a default as an empty array.
</li>

  <li>
    The <em>visitedCells</em> array that keeps track of the visited cells to avoid going over the same cells again and infinite looping.
    I used Strings of the positions (ex. "2,4") instead of adding the Cell object because it might potentially not working since the Cell objects have the <em>steps</em> variable inside them which can be different steps but the same cell.
  </li>
  <li>
     The line <em>"const neighborCell = new Cell(neighborRow,neighborCol,  [...steps, [neighborRow, neighborCol]])"</em>.
     The spread operator was used to place the items inside the original steps into it, and then adding the new step that was just made.
  </li>

</ul>

```javascript

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
        //instead of directly using the Cell in the set, we use string because the Cells would have also different "paths" and might not work when checking if it was visited or not.

        //Add neighbor cells / next step cells.
        for (const neighbor of getNeighbors(row, col)) {
            const [neighborRow, neighborCol] = neighbor
            const neighborCell = new Cell(neighborRow,neighborCol,  [...steps, [neighborRow, neighborCol]])

            if (visitedCells.has(neighborCell.getPositionString())) {continue}

            queue.push(neighborCell)
        }
    }
}
```
