/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Cell.js":
/*!*********************!*\
  !*** ./src/Cell.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Cell {
    constructor(row, col, steps =[]) {
        this.row = row
        this.col = col
        this.steps = steps
    }

    getPositionString() {
        return `${this.row}-${this.col}`
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cell);

/***/ }),

/***/ "./src/drawBoard.js":
/*!**************************!*\
  !*** ./src/drawBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearBoard: () => (/* binding */ clearBoard),
/* harmony export */   drawBoard: () => (/* binding */ drawBoard)
/* harmony export */ });

const chessboard = document.getElementById("chessboard");
function drawBoard(startCell, targetCell) {

    const [rowStart, colStart] = startCell
    const [rowTarget, colTarget] = targetCell

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
                cell.classList.add("knight-cell")
            }
            if (rowTarget === col && colTarget===(9-row)) {
                cell.classList.add("target-cell")
            }
        }
    }
}

function clearBoard() {
    chessboard.innerHTML =""
}




/***/ }),

/***/ "./src/getPath.js":
/*!************************!*\
  !*** ./src/getPath.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPath: () => (/* binding */ getPath)
/* harmony export */ });
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ "./src/Cell.js");
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");



function getPath(startRow,startCol,targetRow,targetCol) {
    const startCell = new _Cell__WEBPACK_IMPORTED_MODULE_0__["default"](startRow,startCol)
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
        for (const neighbor of (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_1__.getNeighbors)(row, col)) {
            const [neighborRow, neighborCol] = neighbor
            const neighborCell = new _Cell__WEBPACK_IMPORTED_MODULE_0__["default"](neighborRow,neighborCol,  [...steps, [neighborRow, neighborCol]])

            if (visitedCells.has(neighborCell.getPositionString())) {continue}

            queue.push(neighborCell)
        }
    }
}



/***/ }),

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deactivateButtons: () => (/* binding */ deactivateButtons),
/* harmony export */   getNeighbors: () => (/* binding */ getNeighbors),
/* harmony export */   isValid: () => (/* binding */ isValid),
/* harmony export */   updateDestination: () => (/* binding */ updateDestination),
/* harmony export */   updateSteps: () => (/* binding */ updateSteps)
/* harmony export */ });


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
  




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _drawBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawBoard */ "./src/drawBoard.js");
/* harmony import */ var _getPath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getPath */ "./src/getPath.js");
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");




let activeButton
let startCell =[0,0]
let endCell = [0,0]
;(0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell,endCell)

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
    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();
    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell, endCell);
    console.log(`start: ${startCell}, target: ${endCell}`);
  }
});

travailButton.addEventListener("click", (e) => {
  e.preventDefault()
  ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.deactivateButtons)(startButton,endButton)
  if (startCell[0] === 0 && startCell[1] === 0 || endCell[0] === 0 && endCell[1] === 0) {return}
  //cant do startCell === [0,0] bc it compares memory not values

  const [startRow, startCol] = startCell
  const [targetRow, targetCol] = endCell
  const paths = (0,_getPath__WEBPACK_IMPORTED_MODULE_1__.getPath)(startRow,startCol,targetRow,targetCol)
  console.log(paths)
  ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.updateDestination)(startCell,endCell)
  ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.updateSteps)(paths,startCell)
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUyxHQUFHLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ1pmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0IsMEJBQTBCLFNBQVM7QUFDbkM7QUFDQTtBQUNBLGtEQUFrRCxJQUFJLEdBQUcsUUFBUTtBQUNqRTtBQUNBO0FBQ0EsOEJBQThCLFVBQVUsS0FBSyxLQUFLLE1BQU0sVUFBVSxLQUFLLElBQUk7QUFDM0UsOEJBQThCLFVBQVUsSUFBSSxXQUFXO0FBQ3ZEO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ3lCO0FBQ3FCO0FBQzlDO0FBQ0E7QUFDQSwwQkFBMEIsNkNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4REFBWTtBQUMzQztBQUNBLHFDQUFxQyw2Q0FBSTtBQUN6QztBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLFVBQVUsT0FBTyxRQUFRO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixVQUFVO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM0RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNoQjtBQUNnRDtBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFVO0FBQ2QsSUFBSSxxREFBUztBQUNiLDBCQUEwQixVQUFVLFlBQVksUUFBUTtBQUN4RDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9FQUFpQjtBQUNuQix5RkFBeUY7QUFDekY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaURBQU87QUFDdkI7QUFDQSxFQUFFLG9FQUFpQjtBQUNuQixFQUFFLDhEQUFXO0FBQ2I7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxLQUFLO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGlFQUFpRSxVQUFVO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELG1CQUFtQjtBQUNsRjtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL0NlbGwuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9kcmF3Qm9hcmQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9nZXRQYXRoLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENlbGwge1xyXG4gICAgY29uc3RydWN0b3Iocm93LCBjb2wsIHN0ZXBzID1bXSkge1xyXG4gICAgICAgIHRoaXMucm93ID0gcm93XHJcbiAgICAgICAgdGhpcy5jb2wgPSBjb2xcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHNcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3NpdGlvblN0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5yb3d9LSR7dGhpcy5jb2x9YFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDZWxsIiwiXHJcbmNvbnN0IGNoZXNzYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoZXNzYm9hcmRcIik7XHJcbmZ1bmN0aW9uIGRyYXdCb2FyZChzdGFydENlbGwsIHRhcmdldENlbGwpIHtcclxuXHJcbiAgICBjb25zdCBbcm93U3RhcnQsIGNvbFN0YXJ0XSA9IHN0YXJ0Q2VsbFxyXG4gICAgY29uc3QgW3Jvd1RhcmdldCwgY29sVGFyZ2V0XSA9IHRhcmdldENlbGxcclxuXHJcbiAgICBmb3IgKGxldCByb3cgPSAxOyByb3cgPCA5OyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDE7IGNvbCA8IDk7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IChyb3cgKyBjb2wpICUgMiA9PT0gMCA/IFwid2hpdGVcIiA6IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoYGRhdGEtcG9zaXRpb25gLCBgJHtjb2x9LCR7OSAtIHJvd31gKTtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKVxyXG4gICAgICAgICAgICBjaGVzc2JvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtyb3dTdGFydH0gPT0gJHtyb3d9IGFuZCAke2NvbFN0YXJ0fSA9PSAke2NvbH1gKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtzdGFydENlbGx9LCAke3RhcmdldENlbGx9YClcclxuXHJcbiAgICAgICAgICAgIGlmIChyb3dTdGFydCA9PT0gY29sICYmIGNvbFN0YXJ0PT09KDktcm93KSkgeyAvL2kgdGhpbmsgaSBqdXN0IG1peGVkIHVwIHJvdy9jb2wgYnV0IHRoaXMgd29ya3MuXHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1jZWxsXCIpXHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJrbmlnaHQtY2VsbFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyb3dUYXJnZXQgPT09IGNvbCAmJiBjb2xUYXJnZXQ9PT0oOS1yb3cpKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YXJnZXQtY2VsbFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckJvYXJkKCkge1xyXG4gICAgY2hlc3Nib2FyZC5pbm5lckhUTUwgPVwiXCJcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7ZHJhd0JvYXJkLGNsZWFyQm9hcmR9IiwiaW1wb3J0IENlbGwgZnJvbSBcIi4vQ2VsbFwiXHJcbmltcG9ydCB7Z2V0TmVpZ2hib3JzfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxuZnVuY3Rpb24gZ2V0UGF0aChzdGFydFJvdyxzdGFydENvbCx0YXJnZXRSb3csdGFyZ2V0Q29sKSB7XHJcbiAgICBjb25zdCBzdGFydENlbGwgPSBuZXcgQ2VsbChzdGFydFJvdyxzdGFydENvbClcclxuICAgIGNvbnN0IHF1ZXVlID0gW3N0YXJ0Q2VsbF0gLy9CRlMgcXVldWUgYW5kIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGNlbGxcclxuXHJcbiAgICBjb25zdCB2aXNpdGVkQ2VsbHMgPSBuZXcgU2V0KCkgLy90byBhdm9pZCBsb29waW5nIFxyXG5cclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy9SZW1vdmUgY2VsbCBmcm9tIHF1ZXVlXHJcbiAgICAgICAgY29uc3QgY2VsbCA9IHF1ZXVlLnNoaWZ0KClcclxuICAgICAgICBjb25zdCB7cm93LCBjb2wsIHN0ZXBzfSA9IGNlbGxcclxuXHJcbiAgICAgICAgLy9Qcm9jZXNzIENlbGxcclxuICAgICAgICBpZiAocm93ID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2wpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ZXBzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aXNpdGVkQ2VsbHMuYWRkKGNlbGwuZ2V0UG9zaXRpb25TdHJpbmcoKSkgXHJcbiAgICAgICAgLy9pbnN0ZWFkIG9mIGRpcmVjdGx5IHVzaW5nIHRoZSBjZWxsIGluIHRoZSBzZXQsIHdoZXJlIHNvbWUgY2VsbHMgd2lsbCBhY3R1YWxseSBiZSB0aGUgc2FtZSByb3cvY29sIHdpdGggZGlmZiBzdGVwcy5cclxuXHJcbiAgICAgICAgLy9BZGQgbmVpZ2hib3IgY2VsbHMgLyBuZXh0IHN0ZXAgY2VsbHMuXHJcbiAgICAgICAgZm9yIChjb25zdCBuZWlnaGJvciBvZiBnZXROZWlnaGJvcnMocm93LCBjb2wpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFtuZWlnaGJvclJvdywgbmVpZ2hib3JDb2xdID0gbmVpZ2hib3JcclxuICAgICAgICAgICAgY29uc3QgbmVpZ2hib3JDZWxsID0gbmV3IENlbGwobmVpZ2hib3JSb3csbmVpZ2hib3JDb2wsICBbLi4uc3RlcHMsIFtuZWlnaGJvclJvdywgbmVpZ2hib3JDb2xdXSlcclxuXHJcbiAgICAgICAgICAgIGlmICh2aXNpdGVkQ2VsbHMuaGFzKG5laWdoYm9yQ2VsbC5nZXRQb3NpdGlvblN0cmluZygpKSkge2NvbnRpbnVlfVxyXG5cclxuICAgICAgICAgICAgcXVldWUucHVzaChuZWlnaGJvckNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldFBhdGh9IiwiXHJcblxyXG5mdW5jdGlvbiBnZXROZWlnaGJvcnMocm93LCBjb2wpIHtcclxuICAgIC8vIEltcGxlbWVudCB5b3VyIGxvZ2ljIHRvIGdldCB2YWxpZCBuZWlnaGJvcnMgaGVyZS5cclxuICAgIC8vIEZvciBleGFtcGxlLCBhc3N1bWluZyBhbGwgOCBwb3NzaWJsZSBrbmlnaHQncyBtb3ZlcyBhcmUgdmFsaWQ6XHJcbiAgICBjb25zdCBtb3ZlcyA9IFtcclxuICAgICAgICBbLTIsIC0xXSxcclxuICAgICAgICBbLTIsIDFdLFxyXG4gICAgICAgIFstMSwgLTJdLFxyXG4gICAgICAgIFstMSwgMl0sXHJcbiAgICAgICAgWzEsIC0yXSxcclxuICAgICAgICBbMSwgMl0sXHJcbiAgICAgICAgWzIsIC0xXSxcclxuICAgICAgICBbMiwgMV1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3JzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IG1vdmUgb2YgbW92ZXMpIHtcclxuICAgICAgICBjb25zdCBbZHgsIGR5XSA9IG1vdmU7XHJcbiAgICAgICAgY29uc3QgbmV3Um93ID0gcm93ICsgZHg7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sID0gY29sICsgZHk7XHJcbiAgICAgICAgaWYgKGlzVmFsaWQobmV3Um93LCBuZXdDb2wpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFtuZXdSb3csIG5ld0NvbF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkKHJvdywgY29sKSB7XHJcbiAgICAvLyBJbXBsZW1lbnQgeW91ciBsb2dpYyB0byBjaGVjayBpZiBhIGNlbGwgaXMgd2l0aGluIHRoZSBncmlkIGJvdW5kcy5cclxuICAgIHJldHVybiByb3cgPiAwICYmIHJvdyA8IDkgJiYgY29sID4gMCAmJiBjb2wgPCA5O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVEZXN0aW5hdGlvbihzdGFydENlbGwsZW5kQ2VsbCkge1xyXG4gICAgY29uc3QgZGVzdGluYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc3RpbmF0aW9uLWNvbnRhaW5lclwiKVxyXG4gICAgZGVzdGluYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gYFske3N0YXJ0Q2VsbH1dIOKGkiBbJHtlbmRDZWxsfV1gXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVN0ZXBzKGFycixzdGFydENlbGwpIHtcclxuICAgIGNvbnN0IG1vdmVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb3Zlcy1saXN0XCIpXHJcbiAgICBtb3Zlc0NvbnRhaW5lci5pbm5lckhUTUwgPVwiXCIgLy9jbGVhciB0aGUgbGlzdCBmaXJzdFxyXG4gICAgY29uc3QgZmlyc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgZmlyc3RFbC50ZXh0Q29udGVudCA9IGBbJHtzdGFydENlbGx9XWBcclxuICAgIG1vdmVzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpcnN0RWwpXHJcbiAgXHJcbiAgICBhcnIuZm9yRWFjaCgocGF0aCkgPT4ge1xyXG4gICAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIilcclxuICAgICAgbGlzdEVsLnRleHRDb250ZW50ID0gYFske3BhdGh9XWBcclxuICAgICAgbW92ZXNDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEVsKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGVhY3RpdmF0ZUJ1dHRvbnMoc3RhcnRCdG5FbGVtZW50LGVuZEJ0bkVsZW1lbnQpIHtcclxuICAgIHN0YXJ0QnRuRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWJ0blwiKVxyXG4gICAgZW5kQnRuRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWJ0blwiKVxyXG59XHJcbiAgXHJcblxyXG5cclxuZXhwb3J0IHtnZXROZWlnaGJvcnMsXHJcbiAgICAgICAgaXNWYWxpZCxcclxuICAgICAgICB1cGRhdGVEZXN0aW5hdGlvbixcclxuICAgICAgICBkZWFjdGl2YXRlQnV0dG9ucyxcclxuICAgICAgICB1cGRhdGVTdGVwc30iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGRyYXdCb2FyZCwgY2xlYXJCb2FyZCB9IGZyb20gXCIuL2RyYXdCb2FyZFwiXHJcbmltcG9ydCB7IGdldFBhdGggfSBmcm9tIFwiLi9nZXRQYXRoXCJcclxuaW1wb3J0IHt1cGRhdGVEZXN0aW5hdGlvbiwgdXBkYXRlU3RlcHMsIGRlYWN0aXZhdGVCdXR0b25zfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIlxyXG5cclxubGV0IGFjdGl2ZUJ1dHRvblxyXG5sZXQgc3RhcnRDZWxsID1bMCwwXVxyXG5sZXQgZW5kQ2VsbCA9IFswLDBdXHJcbmRyYXdCb2FyZChzdGFydENlbGwsZW5kQ2VsbClcclxuXHJcbmNvbnN0IGNoZXNzYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZXNzYm9hcmRcIilcclxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWNlbGwtYnRuXCIpXHJcbmNvbnN0IGVuZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kLWNlbGwtYnRuXCIpXHJcbmNvbnN0IHRyYXZhaWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRyYXZhaWwtYnRuXCIpXHJcblxyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgYWN0aXZlQnV0dG9uID0gXCJzdGFydFwiXHJcbiAgICBlbmRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1idG5cIilcclxuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtYnRuXCIpXHJcbn0pXHJcblxyXG5lbmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGFjdGl2ZUJ1dHRvbiA9IFwiZW5kXCJcclxuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbiAgICBlbmRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1idG5cIilcclxufSlcclxuXHJcbmNoZXNzYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IGNsaWNrZWRDZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gIGlmIChjbGlja2VkQ2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJjZWxsXCIpKSB7XHJcbiAgICAvLyBIYW5kbGUgdGhlIGNsaWNrIG9uIHRoZSBjZWxsIGhlcmVcclxuICAgIC8vIFlvdSBjYW4gdXNlIGNsaWNrZWRDZWxsIHRvIGlkZW50aWZ5IHRoZSBzcGVjaWZpYyBjZWxsIHRoYXQgd2FzIGNsaWNrZWRcclxuICAgIC8vIEZvciBleGFtcGxlLCB5b3UgY2FuIGFjY2VzcyBpdHMgZGF0YSBhdHRyaWJ1dGVzIG9yIGNsYXNzIG5hbWVzLlxyXG4gICAgLy8gY29uc3QgZGF0YVBvc2l0aW9uID0gY2xpY2tlZENlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGFQb3NpdGlvbik7XHJcbiAgICBpZiAoYWN0aXZlQnV0dG9uID09PSBcInN0YXJ0XCIpIHtcclxuICAgICAgbGV0IHN0cmluZ2RhdGEgPSBjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpO1xyXG4gICAgICBzdGFydENlbGwgPSBzdHJpbmdkYXRhLnNwbGl0KFwiLFwiKS5tYXAoTnVtYmVyKTtcclxuICAgICAgLy9pbnB1dFN0cmluZy5zcGxpdChcIixcIikgc3BsaXRzIHRoZSBpbnB1dCBzdHJpbmcgYXQgdGhlIGNvbW1hLCByZXN1bHRpbmcgaW4gYW4gYXJyYXkgb2Ygc3Vic3RyaW5ncyBbXCIyXCIsIFwiM1wiXS5cclxuICAgICAgLy8ubWFwKE51bWJlcikgY29udmVydHMgZWFjaCBzdWJzdHJpbmcgdG8gYSBudW1iZXIsIGNyZWF0aW5nIHRoZSBmaW5hbCBhcnJheSBbMiwgM10uXHJcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZUJ1dHRvbiA9PT0gXCJlbmRcIikge1xyXG4gICAgICBsZXQgc3RyaW5nZGF0YSA9IGNsaWNrZWRDZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIik7XHJcbiAgICAgIGVuZENlbGwgPSBzdHJpbmdkYXRhLnNwbGl0KFwiLFwiKS5tYXAoTnVtYmVyKTtcclxuICAgIH1cclxuICAgIGNsZWFyQm9hcmQoKTtcclxuICAgIGRyYXdCb2FyZChzdGFydENlbGwsIGVuZENlbGwpO1xyXG4gICAgY29uc29sZS5sb2coYHN0YXJ0OiAke3N0YXJ0Q2VsbH0sIHRhcmdldDogJHtlbmRDZWxsfWApO1xyXG4gIH1cclxufSk7XHJcblxyXG50cmF2YWlsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKVxyXG4gIGRlYWN0aXZhdGVCdXR0b25zKHN0YXJ0QnV0dG9uLGVuZEJ1dHRvbilcclxuICBpZiAoc3RhcnRDZWxsWzBdID09PSAwICYmIHN0YXJ0Q2VsbFsxXSA9PT0gMCB8fCBlbmRDZWxsWzBdID09PSAwICYmIGVuZENlbGxbMV0gPT09IDApIHtyZXR1cm59XHJcbiAgLy9jYW50IGRvIHN0YXJ0Q2VsbCA9PT0gWzAsMF0gYmMgaXQgY29tcGFyZXMgbWVtb3J5IG5vdCB2YWx1ZXNcclxuXHJcbiAgY29uc3QgW3N0YXJ0Um93LCBzdGFydENvbF0gPSBzdGFydENlbGxcclxuICBjb25zdCBbdGFyZ2V0Um93LCB0YXJnZXRDb2xdID0gZW5kQ2VsbFxyXG4gIGNvbnN0IHBhdGhzID0gZ2V0UGF0aChzdGFydFJvdyxzdGFydENvbCx0YXJnZXRSb3csdGFyZ2V0Q29sKVxyXG4gIGNvbnNvbGUubG9nKHBhdGhzKVxyXG4gIHVwZGF0ZURlc3RpbmF0aW9uKHN0YXJ0Q2VsbCxlbmRDZWxsKVxyXG4gIHVwZGF0ZVN0ZXBzKHBhdGhzLHN0YXJ0Q2VsbClcclxuICBkcmF3UGF0aChwYXRocyxzdGFydENlbGwpXHJcblxyXG59KVxyXG5cclxuZnVuY3Rpb24gZHJhd1BhdGgocGF0aHMsc3RhcnRDZWxsKSB7XHJcbiAgbGV0IG51bSA9IDJcclxuICBwYXRocy5mb3JFYWNoKChwYXRoKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wb3NpdGlvbj1cIiR7cGF0aH1cIl1gKSAvL25lZWQgdG8gdXNlIHR3byBkaWZmZXJlbnQgdGlja3MgJyBcIlxyXG4gICAgc2VsZWN0ZWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJwYXRod2F5XCIpXHJcbiAgICBzZWxlY3RlZENlbGwudGV4dENvbnRlbnQgPSBudW1cclxuICAgIG51bSsrXHJcbiAgfSlcclxuICAvL3Rha2luZyB0aGUga25pZ2h0IG91dCBvZiB0aGUgZmlyc3QgY2VsbCBhbmQgcHV0dGluZyBcIjFcIiBpbiBpdFxyXG4gIGNvbnN0IHN0YXJ0aW5nQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBvc2l0aW9uPVwiJHtzdGFydENlbGx9XCJdYClcclxuICBzdGFydGluZ0NlbGwudGV4dENvbnRlbnQgPSAxXHJcbiAgc3RhcnRpbmdDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJrbmlnaHQtY2VsbFwiKVxyXG4gIFxyXG4gIGNvbnN0IHRhcmdldENlbGxQb3NpdGlvbiA9IHBhdGhzWyBwYXRocy5sZW5ndGggLSAxIF0gXHJcbiAgY29uc3QgdGFyZ2V0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBvc2l0aW9uPVwiJHt0YXJnZXRDZWxsUG9zaXRpb259XCJdYClcclxuICB0YXJnZXRDZWxsLmNsYXNzTGlzdC5hZGQoXCJrbmlnaHQtY2VsbFwiKVxyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9