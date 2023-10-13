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

const chessboard = document.getElementById("chessboard")
function drawBoard(startCell, targetCell) {

    const [rowStart, colStart] = startCell
    const [rowTarget, colTarget] = targetCell

    for (let row = 1; row < 9; row++) {
        for (let col = 1; col < 9; col++) {
            const cell = document.createElement("div");
            cell.className = (row + col) % 2 === 0 ? "white" : "black"
            cell.setAttribute(`data-position`, `${col},${9 - row}`)
            cell.classList.add("cell")
            chessboard.appendChild(cell)
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

/***/ "./src/drawPath.js":
/*!*************************!*\
  !*** ./src/drawPath.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drawPath: () => (/* binding */ drawPath)
/* harmony export */ });
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
        //instead of directly using the Cell in the set, we use string because the Cells would have also different "paths" and might not work when checking if it was visited or not.

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

    const neighbors = []
    for (const move of moves) {
        const [dx, dy] = move
        const newRow = row + dx
        const newCol = col + dy
        if (isValid(newRow, newCol)) {
            neighbors.push([newRow, newCol])
        }
    }

    return neighbors;
}

function isValid(row, col) {
    return row > 0 && row < 9 && col > 0 && col < 9
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
/* harmony import */ var _drawPath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawPath */ "./src/drawPath.js");





let activeButton;
let startCell = ["X, Y"];
let endCell = ["X, Y"];
(0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell, endCell);

const chessboard = document.querySelector(".chessboard");
const startButton = document.querySelector(".start-cell-btn");
const endButton = document.querySelector(".end-cell-btn");
const travailButton = document.querySelector(".travail-btn");
const clearButton = document.querySelector(".clear-btn");

startButton.addEventListener("click", (e) => {
  e.preventDefault();
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
    const clickedCell = event.target
    if (clickedCell.classList.contains("cell")) {
    // Handle the click on the cell here
    // You can use clickedCell to identify the specific cell that was clicked
    // For example, you can access its data attributes or class names.
    // const dataPosition = clickedCell.getAttribute("data-position");
    // console.log(dataPosition);
        if (activeButton === "start") {
            let stringdata = clickedCell.getAttribute("data-position")
            startCell = stringdata.split(",").map(Number)
            //inputString.split(",") splits the input string at the comma, resulting in an array of substrings ["2", "3"].
            //.map(Number) converts each substring to a number, creating the final array [2, 3].
        } else if (activeButton === "end") {
            let stringdata = clickedCell.getAttribute("data-position")
            endCell = stringdata.split(",").map(Number)
        }
        (0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();
        (0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell, endCell);
        //console.log(`start: ${startCell}, target: ${endCell}`)
        (0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.updateDestination)(startCell, endCell)
        }
})



travailButton.addEventListener("click", (e) => {
  e.preventDefault()
  ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.deactivateButtons)(startButton, endButton);
  if (
    (startCell[0] === 0 && startCell[1] === 0) ||
    (endCell[0] === 0 && endCell[1] === 0)
  ) {
    return
  }
  //cant do startCell === [0,0] bc it compares memory not values
  const [startRow, startCol] = startCell
  const [targetRow, targetCol] = endCell
  const paths = (0,_getPath__WEBPACK_IMPORTED_MODULE_1__.getPath)(startRow, startCol, targetRow, targetCol)
  //console.log(paths)
  ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.updateDestination)(startCell, endCell)
  ;(0,_helperFunctions__WEBPACK_IMPORTED_MODULE_2__.updateSteps)(paths, startCell)
  ;(0,_drawPath__WEBPACK_IMPORTED_MODULE_3__.drawPath)(paths, startCell)
})

clearButton.addEventListener("click", (e) => {
  e.preventDefault()
  location.reload()
})

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRO0FBQzlELFFBQVEsbUVBQWlCO0FBQ3pCO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG9FQUFpQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaURBQU87QUFDdkI7QUFDQSxFQUFFLG9FQUFpQjtBQUNuQixFQUFFLDhEQUFXO0FBQ2IsRUFBRSxvREFBUTtBQUNWLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL0NlbGwuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9kcmF3Qm9hcmQuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9kcmF3UGF0aC5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2dldFBhdGguanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9oZWxwZXJGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ2VsbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb3csIGNvbCwgc3RlcHMgPVtdKSB7XHJcbiAgICAgICAgdGhpcy5yb3cgPSByb3dcclxuICAgICAgICB0aGlzLmNvbCA9IGNvbFxyXG4gICAgICAgIHRoaXMuc3RlcHMgPSBzdGVwc1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvc2l0aW9uU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLnJvd30tJHt0aGlzLmNvbH1gXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENlbGwiLCJcclxuY29uc3QgY2hlc3Nib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hlc3Nib2FyZFwiKVxyXG5mdW5jdGlvbiBkcmF3Qm9hcmQoc3RhcnRDZWxsLCB0YXJnZXRDZWxsKSB7XHJcblxyXG4gICAgY29uc3QgW3Jvd1N0YXJ0LCBjb2xTdGFydF0gPSBzdGFydENlbGxcclxuICAgIGNvbnN0IFtyb3dUYXJnZXQsIGNvbFRhcmdldF0gPSB0YXJnZXRDZWxsXHJcblxyXG4gICAgZm9yIChsZXQgcm93ID0gMTsgcm93IDwgOTsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSAxOyBjb2wgPCA5OyBjb2wrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAocm93ICsgY29sKSAlIDIgPT09IDAgPyBcIndoaXRlXCIgOiBcImJsYWNrXCJcclxuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoYGRhdGEtcG9zaXRpb25gLCBgJHtjb2x9LCR7OSAtIHJvd31gKVxyXG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpXHJcbiAgICAgICAgICAgIGNoZXNzYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cm93U3RhcnR9ID09ICR7cm93fSBhbmQgJHtjb2xTdGFydH0gPT0gJHtjb2x9YClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7c3RhcnRDZWxsfSwgJHt0YXJnZXRDZWxsfWApXHJcblxyXG4gICAgICAgICAgICBpZiAocm93U3RhcnQgPT09IGNvbCAmJiBjb2xTdGFydD09PSg5LXJvdykpIHsgLy9pIHRoaW5rIGkganVzdCBtaXhlZCB1cCByb3cvY29sIGJ1dCB0aGlzIHdvcmtzLlxyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic3RhcnQtY2VsbFwiKVxyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwia25pZ2h0LWNlbGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocm93VGFyZ2V0ID09PSBjb2wgJiYgY29sVGFyZ2V0PT09KDktcm93KSkge1xyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWNlbGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJCb2FyZCgpIHtcclxuICAgIGNoZXNzYm9hcmQuaW5uZXJIVE1MID1cIlwiXHJcbn1cclxuXHJcblxyXG5leHBvcnQge2RyYXdCb2FyZCxjbGVhckJvYXJkfSIsImZ1bmN0aW9uIGRyYXdQYXRoKHBhdGhzLHN0YXJ0Q2VsbCkge1xyXG4gICAgbGV0IG51bSA9IDJcclxuICAgIHBhdGhzLmZvckVhY2goKHBhdGgpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcG9zaXRpb249XCIke3BhdGh9XCJdYCkgLy9uZWVkIHRvIHVzZSB0d28gZGlmZmVyZW50IHRpY2tzICcgXCJcclxuICAgICAgc2VsZWN0ZWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJwYXRod2F5XCIpXHJcbiAgICAgIHNlbGVjdGVkQ2VsbC50ZXh0Q29udGVudCA9IG51bVxyXG4gICAgICBudW0rK1xyXG4gICAgfSlcclxuICAgIC8vdGFraW5nIHRoZSBrbmlnaHQgb3V0IG9mIHRoZSBmaXJzdCBjZWxsIGFuZCBwdXR0aW5nIFwiMVwiIGluIGl0XHJcbiAgICBjb25zdCBzdGFydGluZ0NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wb3NpdGlvbj1cIiR7c3RhcnRDZWxsfVwiXWApXHJcbiAgICBzdGFydGluZ0NlbGwudGV4dENvbnRlbnQgPSAxXHJcbiAgICBzdGFydGluZ0NlbGwuY2xhc3NMaXN0LnJlbW92ZShcImtuaWdodC1jZWxsXCIpXHJcbiAgICBcclxuICAgIGNvbnN0IHRhcmdldENlbGxQb3NpdGlvbiA9IHBhdGhzWyBwYXRocy5sZW5ndGggLSAxIF0gXHJcbiAgICBjb25zdCB0YXJnZXRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcG9zaXRpb249XCIke3RhcmdldENlbGxQb3NpdGlvbn1cIl1gKVxyXG4gICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKFwia25pZ2h0LWNlbGxcIilcclxufVxyXG5cclxuZXhwb3J0IHtkcmF3UGF0aH0iLCJpbXBvcnQgQ2VsbCBmcm9tIFwiLi9DZWxsXCJcclxuaW1wb3J0IHtnZXROZWlnaGJvcnN9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5mdW5jdGlvbiBnZXRQYXRoKHN0YXJ0Um93LHN0YXJ0Q29sLHRhcmdldFJvdyx0YXJnZXRDb2wpIHtcclxuICAgIGNvbnN0IHN0YXJ0Q2VsbCA9IG5ldyBDZWxsKHN0YXJ0Um93LHN0YXJ0Q29sKVxyXG4gICAgY29uc3QgcXVldWUgPSBbc3RhcnRDZWxsXSAvL0JGUyBxdWV1ZSBhbmQgc3RhcnQgd2l0aCB0aGUgZmlyc3QgY2VsbFxyXG5cclxuICAgIGNvbnN0IHZpc2l0ZWRDZWxscyA9IG5ldyBTZXQoKSAvL3RvIGF2b2lkIGxvb3BpbmcgXHJcblxyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL1JlbW92ZSBjZWxsIGZyb20gcXVldWVcclxuICAgICAgICBjb25zdCBjZWxsID0gcXVldWUuc2hpZnQoKVxyXG4gICAgICAgIGNvbnN0IHtyb3csIGNvbCwgc3RlcHN9ID0gY2VsbFxyXG5cclxuICAgICAgICAvL1Byb2Nlc3MgQ2VsbFxyXG4gICAgICAgIGlmIChyb3cgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RlcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpc2l0ZWRDZWxscy5hZGQoY2VsbC5nZXRQb3NpdGlvblN0cmluZygpKSBcclxuICAgICAgICAvL2luc3RlYWQgb2YgZGlyZWN0bHkgdXNpbmcgdGhlIENlbGwgaW4gdGhlIHNldCwgd2UgdXNlIHN0cmluZyBiZWNhdXNlIHRoZSBDZWxscyB3b3VsZCBoYXZlIGFsc28gZGlmZmVyZW50IFwicGF0aHNcIiBhbmQgbWlnaHQgbm90IHdvcmsgd2hlbiBjaGVja2luZyBpZiBpdCB3YXMgdmlzaXRlZCBvciBub3QuXHJcblxyXG4gICAgICAgIC8vQWRkIG5laWdoYm9yIGNlbGxzIC8gbmV4dCBzdGVwIGNlbGxzLlxyXG4gICAgICAgIGZvciAoY29uc3QgbmVpZ2hib3Igb2YgZ2V0TmVpZ2hib3JzKHJvdywgY29sKSkge1xyXG4gICAgICAgICAgICBjb25zdCBbbmVpZ2hib3JSb3csIG5laWdoYm9yQ29sXSA9IG5laWdoYm9yXHJcbiAgICAgICAgICAgIGNvbnN0IG5laWdoYm9yQ2VsbCA9IG5ldyBDZWxsKG5laWdoYm9yUm93LG5laWdoYm9yQ29sLCAgWy4uLnN0ZXBzLCBbbmVpZ2hib3JSb3csIG5laWdoYm9yQ29sXV0pXHJcblxyXG4gICAgICAgICAgICBpZiAodmlzaXRlZENlbGxzLmhhcyhuZWlnaGJvckNlbGwuZ2V0UG9zaXRpb25TdHJpbmcoKSkpIHtjb250aW51ZX1cclxuXHJcbiAgICAgICAgICAgIHF1ZXVlLnB1c2gobmVpZ2hib3JDZWxsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtnZXRQYXRofSIsIlxyXG5cclxuZnVuY3Rpb24gZ2V0TmVpZ2hib3JzKHJvdywgY29sKSB7XHJcbiAgICAvLyBJbXBsZW1lbnQgeW91ciBsb2dpYyB0byBnZXQgdmFsaWQgbmVpZ2hib3JzIGhlcmUuXHJcbiAgICAvLyBGb3IgZXhhbXBsZSwgYXNzdW1pbmcgYWxsIDggcG9zc2libGUga25pZ2h0J3MgbW92ZXMgYXJlIHZhbGlkOlxyXG4gICAgY29uc3QgbW92ZXMgPSBbXHJcbiAgICAgICAgWy0yLCAtMV0sXHJcbiAgICAgICAgWy0yLCAxXSxcclxuICAgICAgICBbLTEsIC0yXSxcclxuICAgICAgICBbLTEsIDJdLFxyXG4gICAgICAgIFsxLCAtMl0sXHJcbiAgICAgICAgWzEsIDJdLFxyXG4gICAgICAgIFsyLCAtMV0sXHJcbiAgICAgICAgWzIsIDFdXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG5laWdoYm9ycyA9IFtdXHJcbiAgICBmb3IgKGNvbnN0IG1vdmUgb2YgbW92ZXMpIHtcclxuICAgICAgICBjb25zdCBbZHgsIGR5XSA9IG1vdmVcclxuICAgICAgICBjb25zdCBuZXdSb3cgPSByb3cgKyBkeFxyXG4gICAgICAgIGNvbnN0IG5ld0NvbCA9IGNvbCArIGR5XHJcbiAgICAgICAgaWYgKGlzVmFsaWQobmV3Um93LCBuZXdDb2wpKSB7XHJcbiAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFtuZXdSb3csIG5ld0NvbF0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWQocm93LCBjb2wpIHtcclxuICAgIHJldHVybiByb3cgPiAwICYmIHJvdyA8IDkgJiYgY29sID4gMCAmJiBjb2wgPCA5XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZURlc3RpbmF0aW9uKHN0YXJ0Q2VsbCxlbmRDZWxsKSB7XHJcbiAgICBjb25zdCBkZXN0aW5hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzdGluYXRpb24tY29udGFpbmVyXCIpXHJcbiAgICBkZXN0aW5hdGlvbkNvbnRhaW5lci5pbm5lckhUTUwgPSBgWyR7c3RhcnRDZWxsfV0g4oaSIFske2VuZENlbGx9XWBcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3RlcHMoYXJyLHN0YXJ0Q2VsbCkge1xyXG4gICAgY29uc3QgbW92ZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vdmVzLWxpc3RcIilcclxuICAgIG1vdmVzQ29udGFpbmVyLmlubmVySFRNTCA9XCJcIiAvL2NsZWFyIHRoZSBsaXN0IGZpcnN0XHJcbiAgICBjb25zdCBmaXJzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBmaXJzdEVsLnRleHRDb250ZW50ID0gYFske3N0YXJ0Q2VsbH1dYFxyXG4gICAgbW92ZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlyc3RFbClcclxuICBcclxuICAgIGFyci5mb3JFYWNoKChwYXRoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgICBsaXN0RWwudGV4dENvbnRlbnQgPSBgWyR7cGF0aH1dYFxyXG4gICAgICBtb3Zlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0RWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWFjdGl2YXRlQnV0dG9ucyhzdGFydEJ0bkVsZW1lbnQsZW5kQnRuRWxlbWVudCkge1xyXG4gICAgc3RhcnRCdG5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbiAgICBlbmRCdG5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbn1cclxuICBcclxuXHJcblxyXG5leHBvcnQge2dldE5laWdoYm9ycyxcclxuICAgICAgICBpc1ZhbGlkLFxyXG4gICAgICAgIHVwZGF0ZURlc3RpbmF0aW9uLFxyXG4gICAgICAgIGRlYWN0aXZhdGVCdXR0b25zLFxyXG4gICAgICAgIHVwZGF0ZVN0ZXBzfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhd0JvYXJkLCBjbGVhckJvYXJkIH0gZnJvbSBcIi4vZHJhd0JvYXJkXCJcclxuaW1wb3J0IHsgZ2V0UGF0aCB9IGZyb20gXCIuL2dldFBhdGhcIlxyXG5pbXBvcnQge1xyXG4gIHVwZGF0ZURlc3RpbmF0aW9uLFxyXG4gIHVwZGF0ZVN0ZXBzLFxyXG4gIGRlYWN0aXZhdGVCdXR0b25zLFxyXG59IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcbmltcG9ydCB7IGRyYXdQYXRoIH0gZnJvbSBcIi4vZHJhd1BhdGhcIlxyXG5cclxubGV0IGFjdGl2ZUJ1dHRvbjtcclxubGV0IHN0YXJ0Q2VsbCA9IFtcIlgsIFlcIl07XHJcbmxldCBlbmRDZWxsID0gW1wiWCwgWVwiXTtcclxuZHJhd0JvYXJkKHN0YXJ0Q2VsbCwgZW5kQ2VsbCk7XHJcblxyXG5jb25zdCBjaGVzc2JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVzc2JvYXJkXCIpO1xyXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtY2VsbC1idG5cIik7XHJcbmNvbnN0IGVuZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kLWNlbGwtYnRuXCIpO1xyXG5jb25zdCB0cmF2YWlsQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50cmF2YWlsLWJ0blwiKTtcclxuY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsZWFyLWJ0blwiKTtcclxuXHJcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBhY3RpdmVCdXR0b24gPSBcInN0YXJ0XCJcclxuICBlbmRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1idG5cIilcclxuICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWJ0blwiKVxyXG59KVxyXG5cclxuZW5kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKVxyXG4gIGFjdGl2ZUJ1dHRvbiA9IFwiZW5kXCJcclxuICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWJ0blwiKVxyXG4gIGVuZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWJ0blwiKVxyXG59KVxyXG5cclxuY2hlc3Nib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBjbGlja2VkQ2VsbCA9IGV2ZW50LnRhcmdldFxyXG4gICAgaWYgKGNsaWNrZWRDZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImNlbGxcIikpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgY2xpY2sgb24gdGhlIGNlbGwgaGVyZVxyXG4gICAgLy8gWW91IGNhbiB1c2UgY2xpY2tlZENlbGwgdG8gaWRlbnRpZnkgdGhlIHNwZWNpZmljIGNlbGwgdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAgLy8gRm9yIGV4YW1wbGUsIHlvdSBjYW4gYWNjZXNzIGl0cyBkYXRhIGF0dHJpYnV0ZXMgb3IgY2xhc3MgbmFtZXMuXHJcbiAgICAvLyBjb25zdCBkYXRhUG9zaXRpb24gPSBjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpO1xyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YVBvc2l0aW9uKTtcclxuICAgICAgICBpZiAoYWN0aXZlQnV0dG9uID09PSBcInN0YXJ0XCIpIHtcclxuICAgICAgICAgICAgbGV0IHN0cmluZ2RhdGEgPSBjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpXHJcbiAgICAgICAgICAgIHN0YXJ0Q2VsbCA9IHN0cmluZ2RhdGEuc3BsaXQoXCIsXCIpLm1hcChOdW1iZXIpXHJcbiAgICAgICAgICAgIC8vaW5wdXRTdHJpbmcuc3BsaXQoXCIsXCIpIHNwbGl0cyB0aGUgaW5wdXQgc3RyaW5nIGF0IHRoZSBjb21tYSwgcmVzdWx0aW5nIGluIGFuIGFycmF5IG9mIHN1YnN0cmluZ3MgW1wiMlwiLCBcIjNcIl0uXHJcbiAgICAgICAgICAgIC8vLm1hcChOdW1iZXIpIGNvbnZlcnRzIGVhY2ggc3Vic3RyaW5nIHRvIGEgbnVtYmVyLCBjcmVhdGluZyB0aGUgZmluYWwgYXJyYXkgWzIsIDNdLlxyXG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlQnV0dG9uID09PSBcImVuZFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHJpbmdkYXRhID0gY2xpY2tlZENlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKVxyXG4gICAgICAgICAgICBlbmRDZWxsID0gc3RyaW5nZGF0YS5zcGxpdChcIixcIikubWFwKE51bWJlcilcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xlYXJCb2FyZCgpO1xyXG4gICAgICAgIGRyYXdCb2FyZChzdGFydENlbGwsIGVuZENlbGwpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coYHN0YXJ0OiAke3N0YXJ0Q2VsbH0sIHRhcmdldDogJHtlbmRDZWxsfWApXHJcbiAgICAgICAgdXBkYXRlRGVzdGluYXRpb24oc3RhcnRDZWxsLCBlbmRDZWxsKVxyXG4gICAgICAgIH1cclxufSlcclxuXHJcblxyXG5cclxudHJhdmFpbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KClcclxuICBkZWFjdGl2YXRlQnV0dG9ucyhzdGFydEJ1dHRvbiwgZW5kQnV0dG9uKTtcclxuICBpZiAoXHJcbiAgICAoc3RhcnRDZWxsWzBdID09PSAwICYmIHN0YXJ0Q2VsbFsxXSA9PT0gMCkgfHxcclxuICAgIChlbmRDZWxsWzBdID09PSAwICYmIGVuZENlbGxbMV0gPT09IDApXHJcbiAgKSB7XHJcbiAgICByZXR1cm5cclxuICB9XHJcbiAgLy9jYW50IGRvIHN0YXJ0Q2VsbCA9PT0gWzAsMF0gYmMgaXQgY29tcGFyZXMgbWVtb3J5IG5vdCB2YWx1ZXNcclxuICBjb25zdCBbc3RhcnRSb3csIHN0YXJ0Q29sXSA9IHN0YXJ0Q2VsbFxyXG4gIGNvbnN0IFt0YXJnZXRSb3csIHRhcmdldENvbF0gPSBlbmRDZWxsXHJcbiAgY29uc3QgcGF0aHMgPSBnZXRQYXRoKHN0YXJ0Um93LCBzdGFydENvbCwgdGFyZ2V0Um93LCB0YXJnZXRDb2wpXHJcbiAgLy9jb25zb2xlLmxvZyhwYXRocylcclxuICB1cGRhdGVEZXN0aW5hdGlvbihzdGFydENlbGwsIGVuZENlbGwpXHJcbiAgdXBkYXRlU3RlcHMocGF0aHMsIHN0YXJ0Q2VsbClcclxuICBkcmF3UGF0aChwYXRocywgc3RhcnRDZWxsKVxyXG59KVxyXG5cclxuY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgbG9jYXRpb24ucmVsb2FkKClcclxufSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9