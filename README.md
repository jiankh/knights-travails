# Knights-Travails
The famous Knights Travails exercise where the Knight in Chess can move through the chessboard to any location. Using Breadth First Search, we can find the shortest path towards the destination. 
<p> Live site: <a href="https://jiankh.github.io/knights-travails/"> link </a> </p>
<img src="/dist/images/knight-travails.png">

<h2> Insights and Takeaways From the Project</h2>
<br>
<p>
  1. Adding an eventListener to a container element instead of adding individual eventListeners to every single element inside the container. In this case it would have been 64 cell with 64 eventListeners!!!
  Another big advantage with this approach was that everytime the chessboard was redrawn (basically deleted the board and re-made it with each change), the eventListeners that were place at the beginning page load would also be deleted. Using this other method of adding the eventListener to the container would prevent this, and the eventListener will always be present no matter how many times the board gets re-rendered.
</p>
<p>
  2. Using the <em>stringdata.split(",").map(Number)</em> to split a String between the "," and map it into a real Array. 
</p>

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
