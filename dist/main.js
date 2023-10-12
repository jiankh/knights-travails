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





// const cell = document.querySelector("[data-4-4]")
// cell.innerHTML = `<img src="images/knight.png">`
// console.log(getPath(1,1,8,8))

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


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUyxHQUFHLFNBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ1pmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsU0FBUztBQUMvQiwwQkFBMEIsU0FBUztBQUNuQztBQUNBO0FBQ0Esa0RBQWtELElBQUksR0FBRyxRQUFRO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDeUI7QUFDekI7QUFDQTtBQUNBLDBCQUEwQiw2Q0FBSTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2Q0FBSTtBQUN6QztBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNObUQ7QUFDUjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IsSUFBSTtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9DZWxsLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvZHJhd0JvYXJkLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvaGVscGVyRnVuY3Rpb25zLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENlbGwge1xyXG4gICAgY29uc3RydWN0b3Iocm93LCBjb2wsIHN0ZXBzID1bXSkge1xyXG4gICAgICAgIHRoaXMucm93ID0gcm93XHJcbiAgICAgICAgdGhpcy5jb2wgPSBjb2xcclxuICAgICAgICB0aGlzLnN0ZXBzID0gc3RlcHNcclxuICAgIH1cclxuXHJcbiAgICBnZXRQb3NpdGlvblN0cmluZygpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5yb3d9LSR7dGhpcy5jb2x9YFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDZWxsIiwiXHJcbmNvbnN0IGNoZXNzYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoZXNzYm9hcmRcIik7XHJcbmZ1bmN0aW9uIGRyYXdCb2FyZChzdGFydENlbGwsIHRhcmdldENlbGwpIHtcclxuICAgIGNvbnNvbGUubG9nKHN0YXJ0Q2VsbClcclxuXHJcbiAgICBjb25zdCBbcm93U3RhcnQsIGNvbFN0YXJ0XSA9IHN0YXJ0Q2VsbFxyXG4gICAgY29uc3QgW3Jvd1RhcmdldCwgY29sVGFyZ2V0XSA9IHRhcmdldENlbGxcclxuXHJcbiAgICBmb3IgKGxldCByb3cgPSAxOyByb3cgPCA5OyByb3crKykge1xyXG4gICAgICAgIGZvciAobGV0IGNvbCA9IDE7IGNvbCA8IDk7IGNvbCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTmFtZSA9IChyb3cgKyBjb2wpICUgMiA9PT0gMCA/IFwid2hpdGVcIiA6IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoYGRhdGEtcG9zaXRpb25gLCBgJHtjb2x9LCR7OSAtIHJvd31gKTtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKVxyXG4gICAgICAgICAgICBjaGVzc2JvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJvd1N0YXJ0ID09PSByb3cgJiYgIGNvbFN0YXJ0PT09Y29sKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzdGFydC1jZWxsXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJvd1RhcmdldCA9PT0gcm93ICYmICBjb2xUYXJnZXQ9PT1jb2wpIHtcclxuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcInRhcmdldC1jZWxsXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJCb2FyZCgpIHtcclxuICAgIGNoZXNzYm9hcmQuaW5uZXJIVE1MID1cIlwiXHJcbn1cclxuXHJcblxyXG5leHBvcnQge2RyYXdCb2FyZCxjbGVhckJvYXJkfSIsImltcG9ydCBDZWxsIGZyb20gXCIuL0NlbGxcIlxyXG5cclxuZnVuY3Rpb24gZ2V0UGF0aChzdGFydFJvdyxzdGFydENvbCx0YXJnZXRSb3csdGFyZ2V0Q29sKSB7XHJcbiAgICBjb25zdCBzdGFydENlbGwgPSBuZXcgQ2VsbChzdGFydFJvdyxzdGFydENvbClcclxuICAgIGNvbnN0IHF1ZXVlID0gW3N0YXJ0Q2VsbF0gLy9CRlMgcXVldWUgYW5kIHN0YXJ0IHdpdGggdGhlIGZpcnN0IGNlbGxcclxuXHJcbiAgICBjb25zdCB2aXNpdGVkQ2VsbHMgPSBuZXcgU2V0KCkgLy90byBhdm9pZCBsb29waW5nIFxyXG5cclxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy9SZW1vdmUgY2VsbCBmcm9tIHF1ZXVlXHJcbiAgICAgICAgY29uc3QgY2VsbCA9IHF1ZXVlLnNoaWZ0KClcclxuICAgICAgICBjb25zdCB7cm93LCBjb2wsIHN0ZXBzfSA9IGNlbGxcclxuXHJcbiAgICAgICAgLy9Qcm9jZXNzIENlbGxcclxuICAgICAgICBpZiAocm93ID09PSB0YXJnZXRSb3cgJiYgY29sID09PSB0YXJnZXRDb2wpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ZXBzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aXNpdGVkQ2VsbHMuYWRkKGNlbGwuZ2V0UG9zaXRpb25TdHJpbmcoKSkgXHJcbiAgICAgICAgLy9pbnN0ZWFkIG9mIGRpcmVjdGx5IHVzaW5nIHRoZSBjZWxsIGluIHRoZSBzZXQsIHdoZXJlIHNvbWUgY2VsbHMgd2lsbCBhY3R1YWxseSBiZSB0aGUgc2FtZSByb3cvY29sIHdpdGggZGlmZiBzdGVwcy5cclxuXHJcbiAgICAgICAgLy9BZGQgbmVpZ2hib3IgY2VsbHMgLyBuZXh0IHN0ZXAgY2VsbHMuXHJcbiAgICAgICAgZm9yIChjb25zdCBuZWlnaGJvciBvZiBnZXROZWlnaGJvcnMocm93LCBjb2wpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFtuZWlnaGJvclJvdywgbmVpZ2hib3JDb2xdID0gbmVpZ2hib3JcclxuICAgICAgICAgICAgY29uc3QgbmVpZ2hib3JDZWxsID0gbmV3IENlbGwobmVpZ2hib3JSb3csbmVpZ2hib3JDb2wsICBbLi4uc3RlcHMsIFtuZWlnaGJvclJvdywgbmVpZ2hib3JDb2xdXSlcclxuXHJcbiAgICAgICAgICAgIGlmICh2aXNpdGVkQ2VsbHMuaGFzKG5laWdoYm9yQ2VsbC5nZXRQb3NpdGlvblN0cmluZygpKSkge2NvbnRpbnVlfVxyXG5cclxuICAgICAgICAgICAgcXVldWUucHVzaChuZWlnaGJvckNlbGwpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXROZWlnaGJvcnMocm93LCBjb2wpIHtcclxuICAgIC8vIEltcGxlbWVudCB5b3VyIGxvZ2ljIHRvIGdldCB2YWxpZCBuZWlnaGJvcnMgaGVyZS5cclxuICAgIC8vIEZvciBleGFtcGxlLCBhc3N1bWluZyBhbGwgOCBwb3NzaWJsZSBrbmlnaHQncyBtb3ZlcyBhcmUgdmFsaWQ6XHJcbiAgICBjb25zdCBtb3ZlcyA9IFtcclxuICAgICAgICBbLTIsIC0xXSxcclxuICAgICAgICBbLTIsIDFdLFxyXG4gICAgICAgIFstMSwgLTJdLFxyXG4gICAgICAgIFstMSwgMl0sXHJcbiAgICAgICAgWzEsIC0yXSxcclxuICAgICAgICBbMSwgMl0sXHJcbiAgICAgICAgWzIsIC0xXSxcclxuICAgICAgICBbMiwgMV1cclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgbmVpZ2hib3JzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IG1vdmUgb2YgbW92ZXMpIHtcclxuICAgICAgICBjb25zdCBbZHgsIGR5XSA9IG1vdmU7XHJcbiAgICAgICAgY29uc3QgbmV3Um93ID0gcm93ICsgZHg7XHJcbiAgICAgICAgY29uc3QgbmV3Q29sID0gY29sICsgZHk7XHJcbiAgICAgICAgaWYgKGlzVmFsaWQobmV3Um93LCBuZXdDb2wpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFtuZXdSb3csIG5ld0NvbF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmVpZ2hib3JzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkKHJvdywgY29sKSB7XHJcbiAgICAvLyBJbXBsZW1lbnQgeW91ciBsb2dpYyB0byBjaGVjayBpZiBhIGNlbGwgaXMgd2l0aGluIHRoZSBncmlkIGJvdW5kcy5cclxuICAgIHJldHVybiByb3cgPiAwICYmIHJvdyA8IDkgJiYgY29sID4gMCAmJiBjb2wgPCA5O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHtnZXRQYXRoLFxyXG4gICAgICAgIGdldE5laWdoYm9ycyxcclxuICAgICAgICBpc1ZhbGlkfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhd0JvYXJkLCBjbGVhckJvYXJkIH0gZnJvbSBcIi4vZHJhd0JvYXJkXCJcclxuaW1wb3J0IHsgZ2V0UGF0aCB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5cclxuXHJcbi8vIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtNC00XVwiKVxyXG4vLyBjZWxsLmlubmVySFRNTCA9IGA8aW1nIHNyYz1cImltYWdlcy9rbmlnaHQucG5nXCI+YFxyXG4vLyBjb25zb2xlLmxvZyhnZXRQYXRoKDEsMSw4LDgpKVxyXG5cclxubGV0IGFjdGl2ZUJ1dHRvblxyXG5sZXQgc3RhcnRDZWxsID1bMCwwXVxyXG5sZXQgZW5kQ2VsbCA9IFswLDBdXHJcbmRyYXdCb2FyZChzdGFydENlbGwsZW5kQ2VsbClcclxuXHJcbmNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpXHJcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1jZWxsLWJ0blwiKVxyXG5jb25zdCBlbmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVuZC1jZWxsLWJ0blwiKVxyXG5jb25zdCB0cmF2YWlsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50cmF2YWlsLWJ0blwiKVxyXG5cclxuY29uc3QgY2hlc3Nib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hlc3Nib2FyZFwiKVxyXG5cclxuXHJcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBhY3RpdmVCdXR0b24gPSBcInN0YXJ0XCJcclxuICAgIGVuZEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWJ0blwiKVxyXG4gICAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1idG5cIilcclxufSlcclxuXHJcbmVuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgYWN0aXZlQnV0dG9uID0gXCJlbmRcIlxyXG4gICAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1idG5cIilcclxuICAgIGVuZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWJ0blwiKVxyXG59KVxyXG5cclxuY2hlc3Nib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBjbGlja2VkQ2VsbCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChjbGlja2VkQ2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJjZWxsXCIpKSB7XHJcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBjbGljayBvbiB0aGUgY2VsbCBoZXJlXHJcbiAgICAgICAgLy8gWW91IGNhbiB1c2UgY2xpY2tlZENlbGwgdG8gaWRlbnRpZnkgdGhlIHNwZWNpZmljIGNlbGwgdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAgICAgIC8vIEZvciBleGFtcGxlLCB5b3UgY2FuIGFjY2VzcyBpdHMgZGF0YSBhdHRyaWJ1dGVzIG9yIGNsYXNzIG5hbWVzLlxyXG4gICAgICAgIGNvbnN0IGRhdGFQb3NpdGlvbiA9IGNsaWNrZWRDZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDbGlja2VkIG9uIGNlbGwgd2l0aCBkYXRhLXBvc2l0aW9uOiBcIiArIGRhdGFQb3NpdGlvbik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4vLyAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4vLyAgICAgICAgIGlmIChhY3RpdmVCdXR0b24gPT09IFwic3RhcnRcIikge1xyXG4vLyAgICAgICAgICAgICBzdGFydENlbGwgPSBbY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpXVxyXG4vLyAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlQnV0dG9uID09PSBcImVuZFwiKSB7XHJcbi8vICAgICAgICAgICAgIGVuZENlbGwgPSBbY2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpXVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhzdGFydENlbGwpXHJcbi8vICAgICB9KVxyXG4vLyB9KVxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9