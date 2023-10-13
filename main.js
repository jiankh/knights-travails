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




/***/ }),

/***/ "./src/helperFunctions.js":
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNeighbors: () => (/* binding */ getNeighbors),
/* harmony export */   getPath: () => (/* binding */ getPath),
/* harmony export */   isValid: () => (/* binding */ isValid)
/* harmony export */ });
/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ "./src/Cell.js");


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
        for (const neighbor of getNeighbors(row, col)) {
            const [neighborRow, neighborCol] = neighbor
            const neighborCell = new _Cell__WEBPACK_IMPORTED_MODULE_0__["default"](neighborRow,neighborCol,  [...steps, [neighborRow, neighborCol]])

            if (visitedCells.has(neighborCell.getPositionString())) {continue}

            queue.push(neighborCell)
        }
    }
}

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
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.js");







let activeButton
let startCell =[0,0]
let endCell = [0,0]
;(0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell,endCell)

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
    // const dataPosition = clickedCell.getAttribute("data-position");
    // console.log(dataPosition);
    if (activeButton === "start") {
      let stringdata = clickedCell.getAttribute("data-position");
      startCell = stringdata.split(",").map(Number);
      //inputString.split(",") splits the input string at the comma, resulting in an array of substrings ["2", "3"].
      //.map(Number) converts each substring to a number, creating the final array [2, 3].
    } else if (activeButton === "end") {
      endCell = [clickedCell.getAttribute("data-position")];
    }
    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();
    (0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell, endCell);
    console.log(`start: ${startCell}, target: ${endCell}`);
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

// const cell = document.querySelector('[data-position="4,4"]');
// cell.innerHTML = `<img src="images/knight.png">`

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUyxHQUFHLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ1pmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsU0FBUztBQUMvQiwwQkFBMEIsU0FBUztBQUNuQztBQUNBO0FBQ0Esa0RBQWtELElBQUksR0FBRyxRQUFRO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixVQUFVLEtBQUssS0FBSyxNQUFNLFVBQVUsS0FBSyxJQUFJO0FBQzNFLDhCQUE4QixVQUFVLElBQUksV0FBVztBQUN2RDtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEN5QjtBQUN6QjtBQUNBO0FBQ0EsMEJBQTBCLDZDQUFJO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDZDQUFJO0FBQ3pDO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2pFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNSO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUksc0RBQVU7QUFDZCxJQUFJLHFEQUFTO0FBQ2IsMEJBQTBCLFVBQVUsWUFBWSxRQUFRO0FBQ3hEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLElBQUk7QUFDSjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL0NlbGwuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9kcmF3Qm9hcmQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2VsbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb3csIGNvbCwgc3RlcHMgPVtdKSB7XHJcbiAgICAgICAgdGhpcy5yb3cgPSByb3dcclxuICAgICAgICB0aGlzLmNvbCA9IGNvbFxyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwc1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvc2l0aW9uU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLnJvd30tJHt0aGlzLmNvbH1gXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENlbGwiLCJcclxuY29uc3QgY2hlc3Nib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hlc3Nib2FyZFwiKTtcclxuZnVuY3Rpb24gZHJhd0JvYXJkKHN0YXJ0Q2VsbCwgdGFyZ2V0Q2VsbCkge1xyXG5cclxuICAgIGNvbnN0IFtyb3dTdGFydCwgY29sU3RhcnRdID0gc3RhcnRDZWxsXHJcbiAgICBjb25zdCBbcm93VGFyZ2V0LCBjb2xUYXJnZXRdID0gdGFyZ2V0Q2VsbFxyXG5cclxuICAgIGNvbnNvbGUubG9nKHN0YXJ0Q2VsbClcclxuICAgIGNvbnNvbGUubG9nKHJvd1N0YXJ0KVxyXG4gICAgY29uc29sZS5sb2coY29sU3RhcnQpXHJcblxyXG4gICAgZm9yIChsZXQgcm93ID0gMTsgcm93IDwgOTsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSAxOyBjb2wgPCA5OyBjb2wrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAocm93ICsgY29sKSAlIDIgPT09IDAgPyBcIndoaXRlXCIgOiBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKGBkYXRhLXBvc2l0aW9uYCwgYCR7Y29sfSwkezkgLSByb3d9YCk7XHJcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIilcclxuICAgICAgICAgICAgY2hlc3Nib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3Jvd1N0YXJ0fSA9PSAke3Jvd30gYW5kICR7Y29sU3RhcnR9ID09ICR7Y29sfWApXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3N0YXJ0Q2VsbH0sICR7dGFyZ2V0Q2VsbH1gKVxyXG5cclxuICAgICAgICAgICAgaWYgKHJvd1N0YXJ0ID09PSBjb2wgJiYgY29sU3RhcnQ9PT0oOS1yb3cpKSB7IC8vaSB0aGluayBpIGp1c3QgbWl4ZWQgdXAgcm93L2NvbCBidXQgdGhpcyB3b3Jrcy5cclxuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInN0YXJ0LWNlbGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocm93VGFyZ2V0ID09PSByb3cgJiYgIGNvbFRhcmdldD09PWNvbCkge1xyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWNlbGxcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckJvYXJkKCkge1xyXG4gICAgY2hlc3Nib2FyZC5pbm5lckhUTUwgPVwiXCJcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7ZHJhd0JvYXJkLGNsZWFyQm9hcmR9IiwiaW1wb3J0IENlbGwgZnJvbSBcIi4vQ2VsbFwiXHJcblxyXG5mdW5jdGlvbiBnZXRQYXRoKHN0YXJ0Um93LHN0YXJ0Q29sLHRhcmdldFJvdyx0YXJnZXRDb2wpIHtcclxuICAgIGNvbnN0IHN0YXJ0Q2VsbCA9IG5ldyBDZWxsKHN0YXJ0Um93LHN0YXJ0Q29sKVxyXG4gICAgY29uc3QgcXVldWUgPSBbc3RhcnRDZWxsXSAvL0JGUyBxdWV1ZSBhbmQgc3RhcnQgd2l0aCB0aGUgZmlyc3QgY2VsbFxyXG5cclxuICAgIGNvbnN0IHZpc2l0ZWRDZWxscyA9IG5ldyBTZXQoKSAvL3RvIGF2b2lkIGxvb3BpbmcgXHJcblxyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL1JlbW92ZSBjZWxsIGZyb20gcXVldWVcclxuICAgICAgICBjb25zdCBjZWxsID0gcXVldWUuc2hpZnQoKVxyXG4gICAgICAgIGNvbnN0IHtyb3csIGNvbCwgc3RlcHN9ID0gY2VsbFxyXG5cclxuICAgICAgICAvL1Byb2Nlc3MgQ2VsbFxyXG4gICAgICAgIGlmIChyb3cgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RlcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpc2l0ZWRDZWxscy5hZGQoY2VsbC5nZXRQb3NpdGlvblN0cmluZygpKSBcclxuICAgICAgICAvL2luc3RlYWQgb2YgZGlyZWN0bHkgdXNpbmcgdGhlIGNlbGwgaW4gdGhlIHNldCwgd2hlcmUgc29tZSBjZWxscyB3aWxsIGFjdHVhbGx5IGJlIHRoZSBzYW1lIHJvdy9jb2wgd2l0aCBkaWZmIHN0ZXBzLlxyXG5cclxuICAgICAgICAvL0FkZCBuZWlnaGJvciBjZWxscyAvIG5leHQgc3RlcCBjZWxscy5cclxuICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIGdldE5laWdoYm9ycyhyb3csIGNvbCkpIHtcclxuICAgICAgICAgICAgY29uc3QgW25laWdoYm9yUm93LCBuZWlnaGJvckNvbF0gPSBuZWlnaGJvclxyXG4gICAgICAgICAgICBjb25zdCBuZWlnaGJvckNlbGwgPSBuZXcgQ2VsbChuZWlnaGJvclJvdyxuZWlnaGJvckNvbCwgIFsuLi5zdGVwcywgW25laWdoYm9yUm93LCBuZWlnaGJvckNvbF1dKVxyXG5cclxuICAgICAgICAgICAgaWYgKHZpc2l0ZWRDZWxscy5oYXMobmVpZ2hib3JDZWxsLmdldFBvc2l0aW9uU3RyaW5nKCkpKSB7Y29udGludWV9XHJcblxyXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKG5laWdoYm9yQ2VsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5laWdoYm9ycyhyb3csIGNvbCkge1xyXG4gICAgLy8gSW1wbGVtZW50IHlvdXIgbG9naWMgdG8gZ2V0IHZhbGlkIG5laWdoYm9ycyBoZXJlLlxyXG4gICAgLy8gRm9yIGV4YW1wbGUsIGFzc3VtaW5nIGFsbCA4IHBvc3NpYmxlIGtuaWdodCdzIG1vdmVzIGFyZSB2YWxpZDpcclxuICAgIGNvbnN0IG1vdmVzID0gW1xyXG4gICAgICAgIFstMiwgLTFdLFxyXG4gICAgICAgIFstMiwgMV0sXHJcbiAgICAgICAgWy0xLCAtMl0sXHJcbiAgICAgICAgWy0xLCAyXSxcclxuICAgICAgICBbMSwgLTJdLFxyXG4gICAgICAgIFsxLCAyXSxcclxuICAgICAgICBbMiwgLTFdLFxyXG4gICAgICAgIFsyLCAxXVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgbW92ZSBvZiBtb3Zlcykge1xyXG4gICAgICAgIGNvbnN0IFtkeCwgZHldID0gbW92ZTtcclxuICAgICAgICBjb25zdCBuZXdSb3cgPSByb3cgKyBkeDtcclxuICAgICAgICBjb25zdCBuZXdDb2wgPSBjb2wgKyBkeTtcclxuICAgICAgICBpZiAoaXNWYWxpZChuZXdSb3csIG5ld0NvbCkpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWQocm93LCBjb2wpIHtcclxuICAgIC8vIEltcGxlbWVudCB5b3VyIGxvZ2ljIHRvIGNoZWNrIGlmIGEgY2VsbCBpcyB3aXRoaW4gdGhlIGdyaWQgYm91bmRzLlxyXG4gICAgcmV0dXJuIHJvdyA+IDAgJiYgcm93IDwgOSAmJiBjb2wgPiAwICYmIGNvbCA8IDk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge2dldFBhdGgsXHJcbiAgICAgICAgZ2V0TmVpZ2hib3JzLFxyXG4gICAgICAgIGlzVmFsaWR9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkcmF3Qm9hcmQsIGNsZWFyQm9hcmQgfSBmcm9tIFwiLi9kcmF3Qm9hcmRcIlxyXG5pbXBvcnQgeyBnZXRQYXRoIH0gZnJvbSBcIi4vaGVscGVyRnVuY3Rpb25zXCJcclxuXHJcblxyXG5cclxuXHJcblxyXG5sZXQgYWN0aXZlQnV0dG9uXHJcbmxldCBzdGFydENlbGwgPVswLDBdXHJcbmxldCBlbmRDZWxsID0gWzAsMF1cclxuZHJhd0JvYXJkKHN0YXJ0Q2VsbCxlbmRDZWxsKVxyXG5cclxuY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIilcclxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWNlbGwtYnRuXCIpXHJcbmNvbnN0IGVuZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kLWNlbGwtYnRuXCIpXHJcbmNvbnN0IHRyYXZhaWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRyYXZhaWwtYnRuXCIpXHJcblxyXG5jb25zdCBjaGVzc2JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVzc2JvYXJkXCIpXHJcblxyXG5cclxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGFjdGl2ZUJ1dHRvbiA9IFwic3RhcnRcIlxyXG4gICAgZW5kQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbiAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWJ0blwiKVxyXG59KVxyXG5cclxuZW5kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBhY3RpdmVCdXR0b24gPSBcImVuZFwiXHJcbiAgICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWJ0blwiKVxyXG4gICAgZW5kQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtYnRuXCIpXHJcbn0pXHJcblxyXG5jaGVzc2JvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICBjb25zdCBjbGlja2VkQ2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICBpZiAoY2xpY2tlZENlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2VsbFwiKSkge1xyXG4gICAgLy8gSGFuZGxlIHRoZSBjbGljayBvbiB0aGUgY2VsbCBoZXJlXHJcbiAgICAvLyBZb3UgY2FuIHVzZSBjbGlja2VkQ2VsbCB0byBpZGVudGlmeSB0aGUgc3BlY2lmaWMgY2VsbCB0aGF0IHdhcyBjbGlja2VkXHJcbiAgICAvLyBGb3IgZXhhbXBsZSwgeW91IGNhbiBhY2Nlc3MgaXRzIGRhdGEgYXR0cmlidXRlcyBvciBjbGFzcyBuYW1lcy5cclxuICAgIC8vIGNvbnN0IGRhdGFQb3NpdGlvbiA9IGNsaWNrZWRDZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhUG9zaXRpb24pO1xyXG4gICAgaWYgKGFjdGl2ZUJ1dHRvbiA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIGxldCBzdHJpbmdkYXRhID0gY2xpY2tlZENlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKTtcclxuICAgICAgc3RhcnRDZWxsID0gc3RyaW5nZGF0YS5zcGxpdChcIixcIikubWFwKE51bWJlcik7XHJcbiAgICAgIC8vaW5wdXRTdHJpbmcuc3BsaXQoXCIsXCIpIHNwbGl0cyB0aGUgaW5wdXQgc3RyaW5nIGF0IHRoZSBjb21tYSwgcmVzdWx0aW5nIGluIGFuIGFycmF5IG9mIHN1YnN0cmluZ3MgW1wiMlwiLCBcIjNcIl0uXHJcbiAgICAgIC8vLm1hcChOdW1iZXIpIGNvbnZlcnRzIGVhY2ggc3Vic3RyaW5nIHRvIGEgbnVtYmVyLCBjcmVhdGluZyB0aGUgZmluYWwgYXJyYXkgWzIsIDNdLlxyXG4gICAgfSBlbHNlIGlmIChhY3RpdmVCdXR0b24gPT09IFwiZW5kXCIpIHtcclxuICAgICAgZW5kQ2VsbCA9IFtjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpXTtcclxuICAgIH1cclxuICAgIGNsZWFyQm9hcmQoKTtcclxuICAgIGRyYXdCb2FyZChzdGFydENlbGwsIGVuZENlbGwpO1xyXG4gICAgY29uc29sZS5sb2coYHN0YXJ0OiAke3N0YXJ0Q2VsbH0sIHRhcmdldDogJHtlbmRDZWxsfWApO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbi8vICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbi8vICAgICAgICAgaWYgKGFjdGl2ZUJ1dHRvbiA9PT0gXCJzdGFydFwiKSB7XHJcbi8vICAgICAgICAgICAgIHN0YXJ0Q2VsbCA9IFtjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIildXHJcbi8vICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVCdXR0b24gPT09IFwiZW5kXCIpIHtcclxuLy8gICAgICAgICAgICAgZW5kQ2VsbCA9IFtjZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIildXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKHN0YXJ0Q2VsbClcclxuLy8gICAgIH0pXHJcbi8vIH0pXHJcblxyXG4vLyBjb25zdCBjZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcG9zaXRpb249XCI0LDRcIl0nKTtcclxuLy8gY2VsbC5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCJpbWFnZXMva25pZ2h0LnBuZ1wiPmBcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9