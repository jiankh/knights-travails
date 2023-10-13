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
/* harmony export */   getNeighbors: () => (/* binding */ getNeighbors),
/* harmony export */   isValid: () => (/* binding */ isValid)
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
  if (startCell == [0,0] || endCell == [0,0]) {return}
  
  const [startRow, startCol] = startCell
  const [targetRow, targetCol] = endCell
  const paths = (0,_getPath__WEBPACK_IMPORTED_MODULE_1__.getPath)(startRow,startCol,targetRow,targetCol)
  console.log(paths)
})


//console.log(getPath(1,1,4,4))

// const cell = document.querySelector('[data-position="4,4"]');
// cell.innerHTML = `<img src="images/knight.png">`

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUyxHQUFHLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ1pmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsU0FBUztBQUMvQiwwQkFBMEIsU0FBUztBQUNuQztBQUNBO0FBQ0Esa0RBQWtELElBQUksR0FBRyxRQUFRO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixVQUFVLEtBQUssS0FBSyxNQUFNLFVBQVUsS0FBSyxJQUFJO0FBQzNFLDhCQUE4QixVQUFVLElBQUksV0FBVztBQUN2RDtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q3lCO0FBQ3FCO0FBQzlDO0FBQ0E7QUFDQSwwQkFBMEIsNkNBQUk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw4REFBWTtBQUMzQztBQUNBLHFDQUFxQyw2Q0FBSTtBQUN6QztBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNoQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLElBQUksc0RBQVU7QUFDZCxJQUFJLHFEQUFTO0FBQ2IsMEJBQTBCLFVBQVUsWUFBWSxRQUFRO0FBQ3hEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaURBQU87QUFDdkI7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9DZWxsLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvZHJhd0JvYXJkLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvZ2V0UGF0aC5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDZWxsIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdywgY29sLCBzdGVwcyA9W10pIHtcclxuICAgICAgICB0aGlzLnJvdyA9IHJvd1xyXG4gICAgICAgIHRoaXMuY29sID0gY29sXHJcbiAgICAgICAgdGhpcy5zdGVwcyA9IHN0ZXBzXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9zaXRpb25TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucm93fS0ke3RoaXMuY29sfWBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2VsbCIsIlxyXG5jb25zdCBjaGVzc2JvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVzc2JvYXJkXCIpO1xyXG5mdW5jdGlvbiBkcmF3Qm9hcmQoc3RhcnRDZWxsLCB0YXJnZXRDZWxsKSB7XHJcblxyXG4gICAgY29uc3QgW3Jvd1N0YXJ0LCBjb2xTdGFydF0gPSBzdGFydENlbGxcclxuICAgIGNvbnN0IFtyb3dUYXJnZXQsIGNvbFRhcmdldF0gPSB0YXJnZXRDZWxsXHJcblxyXG4gICAgY29uc29sZS5sb2coc3RhcnRDZWxsKVxyXG4gICAgY29uc29sZS5sb2cocm93U3RhcnQpXHJcbiAgICBjb25zb2xlLmxvZyhjb2xTdGFydClcclxuXHJcbiAgICBmb3IgKGxldCByb3cgPSAxOyByb3cgPCA5OyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDE7IGNvbCA8IDk7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IChyb3cgKyBjb2wpICUgMiA9PT0gMCA/IFwid2hpdGVcIiA6IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoYGRhdGEtcG9zaXRpb25gLCBgJHtjb2x9LCR7OSAtIHJvd31gKTtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKVxyXG4gICAgICAgICAgICBjaGVzc2JvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cm93U3RhcnR9ID09ICR7cm93fSBhbmQgJHtjb2xTdGFydH0gPT0gJHtjb2x9YClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7c3RhcnRDZWxsfSwgJHt0YXJnZXRDZWxsfWApXHJcblxyXG4gICAgICAgICAgICBpZiAocm93U3RhcnQgPT09IGNvbCAmJiBjb2xTdGFydD09PSg5LXJvdykpIHsgLy9pIHRoaW5rIGkganVzdCBtaXhlZCB1cCByb3cvY29sIGJ1dCB0aGlzIHdvcmtzLlxyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic3RhcnQtY2VsbFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyb3dUYXJnZXQgPT09IHJvdyAmJiAgY29sVGFyZ2V0PT09Y29sKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJ0YXJnZXQtY2VsbFwiKVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQm9hcmQoKSB7XHJcbiAgICBjaGVzc2JvYXJkLmlubmVySFRNTCA9XCJcIlxyXG59XHJcblxyXG5cclxuZXhwb3J0IHtkcmF3Qm9hcmQsY2xlYXJCb2FyZH0iLCJpbXBvcnQgQ2VsbCBmcm9tIFwiLi9DZWxsXCJcclxuaW1wb3J0IHtnZXROZWlnaGJvcnN9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5mdW5jdGlvbiBnZXRQYXRoKHN0YXJ0Um93LHN0YXJ0Q29sLHRhcmdldFJvdyx0YXJnZXRDb2wpIHtcclxuICAgIGNvbnN0IHN0YXJ0Q2VsbCA9IG5ldyBDZWxsKHN0YXJ0Um93LHN0YXJ0Q29sKVxyXG4gICAgY29uc3QgcXVldWUgPSBbc3RhcnRDZWxsXSAvL0JGUyBxdWV1ZSBhbmQgc3RhcnQgd2l0aCB0aGUgZmlyc3QgY2VsbFxyXG5cclxuICAgIGNvbnN0IHZpc2l0ZWRDZWxscyA9IG5ldyBTZXQoKSAvL3RvIGF2b2lkIGxvb3BpbmcgXHJcblxyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL1JlbW92ZSBjZWxsIGZyb20gcXVldWVcclxuICAgICAgICBjb25zdCBjZWxsID0gcXVldWUuc2hpZnQoKVxyXG4gICAgICAgIGNvbnN0IHtyb3csIGNvbCwgc3RlcHN9ID0gY2VsbFxyXG5cclxuICAgICAgICAvL1Byb2Nlc3MgQ2VsbFxyXG4gICAgICAgIGlmIChyb3cgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RlcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpc2l0ZWRDZWxscy5hZGQoY2VsbC5nZXRQb3NpdGlvblN0cmluZygpKSBcclxuICAgICAgICAvL2luc3RlYWQgb2YgZGlyZWN0bHkgdXNpbmcgdGhlIGNlbGwgaW4gdGhlIHNldCwgd2hlcmUgc29tZSBjZWxscyB3aWxsIGFjdHVhbGx5IGJlIHRoZSBzYW1lIHJvdy9jb2wgd2l0aCBkaWZmIHN0ZXBzLlxyXG5cclxuICAgICAgICAvL0FkZCBuZWlnaGJvciBjZWxscyAvIG5leHQgc3RlcCBjZWxscy5cclxuICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIGdldE5laWdoYm9ycyhyb3csIGNvbCkpIHtcclxuICAgICAgICAgICAgY29uc3QgW25laWdoYm9yUm93LCBuZWlnaGJvckNvbF0gPSBuZWlnaGJvclxyXG4gICAgICAgICAgICBjb25zdCBuZWlnaGJvckNlbGwgPSBuZXcgQ2VsbChuZWlnaGJvclJvdyxuZWlnaGJvckNvbCwgIFsuLi5zdGVwcywgW25laWdoYm9yUm93LCBuZWlnaGJvckNvbF1dKVxyXG5cclxuICAgICAgICAgICAgaWYgKHZpc2l0ZWRDZWxscy5oYXMobmVpZ2hib3JDZWxsLmdldFBvc2l0aW9uU3RyaW5nKCkpKSB7Y29udGludWV9XHJcblxyXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKG5laWdoYm9yQ2VsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0UGF0aH0iLCJcclxuXHJcbmZ1bmN0aW9uIGdldE5laWdoYm9ycyhyb3csIGNvbCkge1xyXG4gICAgLy8gSW1wbGVtZW50IHlvdXIgbG9naWMgdG8gZ2V0IHZhbGlkIG5laWdoYm9ycyBoZXJlLlxyXG4gICAgLy8gRm9yIGV4YW1wbGUsIGFzc3VtaW5nIGFsbCA4IHBvc3NpYmxlIGtuaWdodCdzIG1vdmVzIGFyZSB2YWxpZDpcclxuICAgIGNvbnN0IG1vdmVzID0gW1xyXG4gICAgICAgIFstMiwgLTFdLFxyXG4gICAgICAgIFstMiwgMV0sXHJcbiAgICAgICAgWy0xLCAtMl0sXHJcbiAgICAgICAgWy0xLCAyXSxcclxuICAgICAgICBbMSwgLTJdLFxyXG4gICAgICAgIFsxLCAyXSxcclxuICAgICAgICBbMiwgLTFdLFxyXG4gICAgICAgIFsyLCAxXVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgbW92ZSBvZiBtb3Zlcykge1xyXG4gICAgICAgIGNvbnN0IFtkeCwgZHldID0gbW92ZTtcclxuICAgICAgICBjb25zdCBuZXdSb3cgPSByb3cgKyBkeDtcclxuICAgICAgICBjb25zdCBuZXdDb2wgPSBjb2wgKyBkeTtcclxuICAgICAgICBpZiAoaXNWYWxpZChuZXdSb3csIG5ld0NvbCkpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWQocm93LCBjb2wpIHtcclxuICAgIC8vIEltcGxlbWVudCB5b3VyIGxvZ2ljIHRvIGNoZWNrIGlmIGEgY2VsbCBpcyB3aXRoaW4gdGhlIGdyaWQgYm91bmRzLlxyXG4gICAgcmV0dXJuIHJvdyA+IDAgJiYgcm93IDwgOSAmJiBjb2wgPiAwICYmIGNvbCA8IDk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQge2dldE5laWdoYm9ycyxcclxuICAgICAgICBpc1ZhbGlkfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhd0JvYXJkLCBjbGVhckJvYXJkIH0gZnJvbSBcIi4vZHJhd0JvYXJkXCJcclxuaW1wb3J0IHsgZ2V0UGF0aCB9IGZyb20gXCIuL2dldFBhdGhcIlxyXG5cclxuXHJcblxyXG5cclxuXHJcbmxldCBhY3RpdmVCdXR0b25cclxubGV0IHN0YXJ0Q2VsbCA9WzAsMF1cclxubGV0IGVuZENlbGwgPSBbMCwwXVxyXG5kcmF3Qm9hcmQoc3RhcnRDZWxsLGVuZENlbGwpXHJcblxyXG5jb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKVxyXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtY2VsbC1idG5cIilcclxuY29uc3QgZW5kQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbmQtY2VsbC1idG5cIilcclxuY29uc3QgdHJhdmFpbEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudHJhdmFpbC1idG5cIilcclxuXHJcbmNvbnN0IGNoZXNzYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZXNzYm9hcmRcIilcclxuXHJcblxyXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgYWN0aXZlQnV0dG9uID0gXCJzdGFydFwiXHJcbiAgICBlbmRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1idG5cIilcclxuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtYnRuXCIpXHJcbn0pXHJcblxyXG5lbmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGFjdGl2ZUJ1dHRvbiA9IFwiZW5kXCJcclxuICAgIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbiAgICBlbmRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1idG5cIilcclxufSlcclxuXHJcbmNoZXNzYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IGNsaWNrZWRDZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gIGlmIChjbGlja2VkQ2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJjZWxsXCIpKSB7XHJcbiAgICAvLyBIYW5kbGUgdGhlIGNsaWNrIG9uIHRoZSBjZWxsIGhlcmVcclxuICAgIC8vIFlvdSBjYW4gdXNlIGNsaWNrZWRDZWxsIHRvIGlkZW50aWZ5IHRoZSBzcGVjaWZpYyBjZWxsIHRoYXQgd2FzIGNsaWNrZWRcclxuICAgIC8vIEZvciBleGFtcGxlLCB5b3UgY2FuIGFjY2VzcyBpdHMgZGF0YSBhdHRyaWJ1dGVzIG9yIGNsYXNzIG5hbWVzLlxyXG4gICAgLy8gY29uc3QgZGF0YVBvc2l0aW9uID0gY2xpY2tlZENlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGFQb3NpdGlvbik7XHJcbiAgICBpZiAoYWN0aXZlQnV0dG9uID09PSBcInN0YXJ0XCIpIHtcclxuICAgICAgbGV0IHN0cmluZ2RhdGEgPSBjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpO1xyXG4gICAgICBzdGFydENlbGwgPSBzdHJpbmdkYXRhLnNwbGl0KFwiLFwiKS5tYXAoTnVtYmVyKTtcclxuICAgICAgLy9pbnB1dFN0cmluZy5zcGxpdChcIixcIikgc3BsaXRzIHRoZSBpbnB1dCBzdHJpbmcgYXQgdGhlIGNvbW1hLCByZXN1bHRpbmcgaW4gYW4gYXJyYXkgb2Ygc3Vic3RyaW5ncyBbXCIyXCIsIFwiM1wiXS5cclxuICAgICAgLy8ubWFwKE51bWJlcikgY29udmVydHMgZWFjaCBzdWJzdHJpbmcgdG8gYSBudW1iZXIsIGNyZWF0aW5nIHRoZSBmaW5hbCBhcnJheSBbMiwgM10uXHJcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZUJ1dHRvbiA9PT0gXCJlbmRcIikge1xyXG4gICAgICBsZXQgc3RyaW5nZGF0YSA9IGNsaWNrZWRDZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIik7XHJcbiAgICAgIGVuZENlbGwgPSBzdHJpbmdkYXRhLnNwbGl0KFwiLFwiKS5tYXAoTnVtYmVyKTtcclxuICAgIH1cclxuICAgIGNsZWFyQm9hcmQoKTtcclxuICAgIGRyYXdCb2FyZChzdGFydENlbGwsIGVuZENlbGwpO1xyXG4gICAgY29uc29sZS5sb2coYHN0YXJ0OiAke3N0YXJ0Q2VsbH0sIHRhcmdldDogJHtlbmRDZWxsfWApO1xyXG4gIH1cclxufSk7XHJcblxyXG50cmF2YWlsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKVxyXG4gIGlmIChzdGFydENlbGwgPT0gWzAsMF0gfHwgZW5kQ2VsbCA9PSBbMCwwXSkge3JldHVybn1cclxuICBcclxuICBjb25zdCBbc3RhcnRSb3csIHN0YXJ0Q29sXSA9IHN0YXJ0Q2VsbFxyXG4gIGNvbnN0IFt0YXJnZXRSb3csIHRhcmdldENvbF0gPSBlbmRDZWxsXHJcbiAgY29uc3QgcGF0aHMgPSBnZXRQYXRoKHN0YXJ0Um93LHN0YXJ0Q29sLHRhcmdldFJvdyx0YXJnZXRDb2wpXHJcbiAgY29uc29sZS5sb2cocGF0aHMpXHJcbn0pXHJcblxyXG5cclxuLy9jb25zb2xlLmxvZyhnZXRQYXRoKDEsMSw0LDQpKVxyXG5cclxuLy8gY29uc3QgY2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvc2l0aW9uPVwiNCw0XCJdJyk7XHJcbi8vIGNlbGwuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiaW1hZ2VzL2tuaWdodC5wbmdcIj5gXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==