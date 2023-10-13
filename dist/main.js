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
/* harmony import */ var _drawPath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawPath */ "./src/drawPath.js");





let activeButton
let startCell =[0,0]
let endCell = [0,0]
;(0,_drawBoard__WEBPACK_IMPORTED_MODULE_0__.drawBoard)(startCell,endCell)

const chessboard = document.querySelector(".chessboard")
const startButton = document.querySelector(".start-cell-btn")
const endButton = document.querySelector(".end-cell-btn")
const travailButton = document.querySelector(".travail-btn")
const clearButton = document.querySelector(".clear-btn")

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
  ;(0,_drawPath__WEBPACK_IMPORTED_MODULE_3__.drawPath)(paths,startCell)

})

clearButton.addEventListener("click", (e) => {
  e.preventDefault()
  location.reload()
})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFZLFFBQVE7QUFDeEQ7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBRSxvRUFBaUI7QUFDbkIseUZBQXlGO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlEQUFPO0FBQ3ZCO0FBQ0EsRUFBRSxvRUFBaUI7QUFDbkIsRUFBRSw4REFBVztBQUNiLEVBQUUsb0RBQVE7QUFDVjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvQ2VsbC5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2RyYXdCb2FyZC5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2RyYXdQYXRoLmpzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvLi9zcmMvZ2V0UGF0aC5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzLy4vc3JjL2hlbHBlckZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2tuaWdodHMtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9rbmlnaHRzLXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8va25pZ2h0cy10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDZWxsIHtcclxuICAgIGNvbnN0cnVjdG9yKHJvdywgY29sLCBzdGVwcyA9W10pIHtcclxuICAgICAgICB0aGlzLnJvdyA9IHJvd1xyXG4gICAgICAgIHRoaXMuY29sID0gY29sXHJcbiAgICAgICAgdGhpcy5zdGVwcyA9IHN0ZXBzXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9zaXRpb25TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucm93fS0ke3RoaXMuY29sfWBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2VsbCIsIlxyXG5jb25zdCBjaGVzc2JvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGVzc2JvYXJkXCIpO1xyXG5mdW5jdGlvbiBkcmF3Qm9hcmQoc3RhcnRDZWxsLCB0YXJnZXRDZWxsKSB7XHJcblxyXG4gICAgY29uc3QgW3Jvd1N0YXJ0LCBjb2xTdGFydF0gPSBzdGFydENlbGxcclxuICAgIGNvbnN0IFtyb3dUYXJnZXQsIGNvbFRhcmdldF0gPSB0YXJnZXRDZWxsXHJcblxyXG4gICAgZm9yIChsZXQgcm93ID0gMTsgcm93IDwgOTsgcm93KyspIHtcclxuICAgICAgICBmb3IgKGxldCBjb2wgPSAxOyBjb2wgPCA5OyBjb2wrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAocm93ICsgY29sKSAlIDIgPT09IDAgPyBcIndoaXRlXCIgOiBcImJsYWNrXCI7XHJcbiAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKGBkYXRhLXBvc2l0aW9uYCwgYCR7Y29sfSwkezkgLSByb3d9YCk7XHJcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIilcclxuICAgICAgICAgICAgY2hlc3Nib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7cm93U3RhcnR9ID09ICR7cm93fSBhbmQgJHtjb2xTdGFydH0gPT0gJHtjb2x9YClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7c3RhcnRDZWxsfSwgJHt0YXJnZXRDZWxsfWApXHJcblxyXG4gICAgICAgICAgICBpZiAocm93U3RhcnQgPT09IGNvbCAmJiBjb2xTdGFydD09PSg5LXJvdykpIHsgLy9pIHRoaW5rIGkganVzdCBtaXhlZCB1cCByb3cvY29sIGJ1dCB0aGlzIHdvcmtzLlxyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic3RhcnQtY2VsbFwiKVxyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwia25pZ2h0LWNlbGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocm93VGFyZ2V0ID09PSBjb2wgJiYgY29sVGFyZ2V0PT09KDktcm93KSkge1xyXG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwidGFyZ2V0LWNlbGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJCb2FyZCgpIHtcclxuICAgIGNoZXNzYm9hcmQuaW5uZXJIVE1MID1cIlwiXHJcbn1cclxuXHJcblxyXG5leHBvcnQge2RyYXdCb2FyZCxjbGVhckJvYXJkfSIsImZ1bmN0aW9uIGRyYXdQYXRoKHBhdGhzLHN0YXJ0Q2VsbCkge1xyXG4gICAgbGV0IG51bSA9IDJcclxuICAgIHBhdGhzLmZvckVhY2goKHBhdGgpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcG9zaXRpb249XCIke3BhdGh9XCJdYCkgLy9uZWVkIHRvIHVzZSB0d28gZGlmZmVyZW50IHRpY2tzICcgXCJcclxuICAgICAgc2VsZWN0ZWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJwYXRod2F5XCIpXHJcbiAgICAgIHNlbGVjdGVkQ2VsbC50ZXh0Q29udGVudCA9IG51bVxyXG4gICAgICBudW0rK1xyXG4gICAgfSlcclxuICAgIC8vdGFraW5nIHRoZSBrbmlnaHQgb3V0IG9mIHRoZSBmaXJzdCBjZWxsIGFuZCBwdXR0aW5nIFwiMVwiIGluIGl0XHJcbiAgICBjb25zdCBzdGFydGluZ0NlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wb3NpdGlvbj1cIiR7c3RhcnRDZWxsfVwiXWApXHJcbiAgICBzdGFydGluZ0NlbGwudGV4dENvbnRlbnQgPSAxXHJcbiAgICBzdGFydGluZ0NlbGwuY2xhc3NMaXN0LnJlbW92ZShcImtuaWdodC1jZWxsXCIpXHJcbiAgICBcclxuICAgIGNvbnN0IHRhcmdldENlbGxQb3NpdGlvbiA9IHBhdGhzWyBwYXRocy5sZW5ndGggLSAxIF0gXHJcbiAgICBjb25zdCB0YXJnZXRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcG9zaXRpb249XCIke3RhcmdldENlbGxQb3NpdGlvbn1cIl1gKVxyXG4gICAgdGFyZ2V0Q2VsbC5jbGFzc0xpc3QuYWRkKFwia25pZ2h0LWNlbGxcIilcclxufVxyXG5cclxuZXhwb3J0IHtkcmF3UGF0aH0iLCJpbXBvcnQgQ2VsbCBmcm9tIFwiLi9DZWxsXCJcclxuaW1wb3J0IHtnZXROZWlnaGJvcnN9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcblxyXG5mdW5jdGlvbiBnZXRQYXRoKHN0YXJ0Um93LHN0YXJ0Q29sLHRhcmdldFJvdyx0YXJnZXRDb2wpIHtcclxuICAgIGNvbnN0IHN0YXJ0Q2VsbCA9IG5ldyBDZWxsKHN0YXJ0Um93LHN0YXJ0Q29sKVxyXG4gICAgY29uc3QgcXVldWUgPSBbc3RhcnRDZWxsXSAvL0JGUyBxdWV1ZSBhbmQgc3RhcnQgd2l0aCB0aGUgZmlyc3QgY2VsbFxyXG5cclxuICAgIGNvbnN0IHZpc2l0ZWRDZWxscyA9IG5ldyBTZXQoKSAvL3RvIGF2b2lkIGxvb3BpbmcgXHJcblxyXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvL1JlbW92ZSBjZWxsIGZyb20gcXVldWVcclxuICAgICAgICBjb25zdCBjZWxsID0gcXVldWUuc2hpZnQoKVxyXG4gICAgICAgIGNvbnN0IHtyb3csIGNvbCwgc3RlcHN9ID0gY2VsbFxyXG5cclxuICAgICAgICAvL1Byb2Nlc3MgQ2VsbFxyXG4gICAgICAgIGlmIChyb3cgPT09IHRhcmdldFJvdyAmJiBjb2wgPT09IHRhcmdldENvbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RlcHNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpc2l0ZWRDZWxscy5hZGQoY2VsbC5nZXRQb3NpdGlvblN0cmluZygpKSBcclxuICAgICAgICAvL2luc3RlYWQgb2YgZGlyZWN0bHkgdXNpbmcgdGhlIGNlbGwgaW4gdGhlIHNldCwgd2hlcmUgc29tZSBjZWxscyB3aWxsIGFjdHVhbGx5IGJlIHRoZSBzYW1lIHJvdy9jb2wgd2l0aCBkaWZmIHN0ZXBzLlxyXG5cclxuICAgICAgICAvL0FkZCBuZWlnaGJvciBjZWxscyAvIG5leHQgc3RlcCBjZWxscy5cclxuICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIGdldE5laWdoYm9ycyhyb3csIGNvbCkpIHtcclxuICAgICAgICAgICAgY29uc3QgW25laWdoYm9yUm93LCBuZWlnaGJvckNvbF0gPSBuZWlnaGJvclxyXG4gICAgICAgICAgICBjb25zdCBuZWlnaGJvckNlbGwgPSBuZXcgQ2VsbChuZWlnaGJvclJvdyxuZWlnaGJvckNvbCwgIFsuLi5zdGVwcywgW25laWdoYm9yUm93LCBuZWlnaGJvckNvbF1dKVxyXG5cclxuICAgICAgICAgICAgaWYgKHZpc2l0ZWRDZWxscy5oYXMobmVpZ2hib3JDZWxsLmdldFBvc2l0aW9uU3RyaW5nKCkpKSB7Y29udGludWV9XHJcblxyXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKG5laWdoYm9yQ2VsbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0UGF0aH0iLCJcclxuXHJcbmZ1bmN0aW9uIGdldE5laWdoYm9ycyhyb3csIGNvbCkge1xyXG4gICAgLy8gSW1wbGVtZW50IHlvdXIgbG9naWMgdG8gZ2V0IHZhbGlkIG5laWdoYm9ycyBoZXJlLlxyXG4gICAgLy8gRm9yIGV4YW1wbGUsIGFzc3VtaW5nIGFsbCA4IHBvc3NpYmxlIGtuaWdodCdzIG1vdmVzIGFyZSB2YWxpZDpcclxuICAgIGNvbnN0IG1vdmVzID0gW1xyXG4gICAgICAgIFstMiwgLTFdLFxyXG4gICAgICAgIFstMiwgMV0sXHJcbiAgICAgICAgWy0xLCAtMl0sXHJcbiAgICAgICAgWy0xLCAyXSxcclxuICAgICAgICBbMSwgLTJdLFxyXG4gICAgICAgIFsxLCAyXSxcclxuICAgICAgICBbMiwgLTFdLFxyXG4gICAgICAgIFsyLCAxXVxyXG4gICAgXTtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvcnMgPSBbXTtcclxuICAgIGZvciAoY29uc3QgbW92ZSBvZiBtb3Zlcykge1xyXG4gICAgICAgIGNvbnN0IFtkeCwgZHldID0gbW92ZTtcclxuICAgICAgICBjb25zdCBuZXdSb3cgPSByb3cgKyBkeDtcclxuICAgICAgICBjb25zdCBuZXdDb2wgPSBjb2wgKyBkeTtcclxuICAgICAgICBpZiAoaXNWYWxpZChuZXdSb3csIG5ld0NvbCkpIHtcclxuICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25ld1JvdywgbmV3Q29sXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWlnaGJvcnM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWQocm93LCBjb2wpIHtcclxuICAgIC8vIEltcGxlbWVudCB5b3VyIGxvZ2ljIHRvIGNoZWNrIGlmIGEgY2VsbCBpcyB3aXRoaW4gdGhlIGdyaWQgYm91bmRzLlxyXG4gICAgcmV0dXJuIHJvdyA+IDAgJiYgcm93IDwgOSAmJiBjb2wgPiAwICYmIGNvbCA8IDk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZURlc3RpbmF0aW9uKHN0YXJ0Q2VsbCxlbmRDZWxsKSB7XHJcbiAgICBjb25zdCBkZXN0aW5hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzdGluYXRpb24tY29udGFpbmVyXCIpXHJcbiAgICBkZXN0aW5hdGlvbkNvbnRhaW5lci5pbm5lckhUTUwgPSBgWyR7c3RhcnRDZWxsfV0g4oaSIFske2VuZENlbGx9XWBcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU3RlcHMoYXJyLHN0YXJ0Q2VsbCkge1xyXG4gICAgY29uc3QgbW92ZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vdmVzLWxpc3RcIilcclxuICAgIG1vdmVzQ29udGFpbmVyLmlubmVySFRNTCA9XCJcIiAvL2NsZWFyIHRoZSBsaXN0IGZpcnN0XHJcbiAgICBjb25zdCBmaXJzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICBmaXJzdEVsLnRleHRDb250ZW50ID0gYFske3N0YXJ0Q2VsbH1dYFxyXG4gICAgbW92ZXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZmlyc3RFbClcclxuICBcclxuICAgIGFyci5mb3JFYWNoKChwYXRoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKVxyXG4gICAgICBsaXN0RWwudGV4dENvbnRlbnQgPSBgWyR7cGF0aH1dYFxyXG4gICAgICBtb3Zlc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0RWwpXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWFjdGl2YXRlQnV0dG9ucyhzdGFydEJ0bkVsZW1lbnQsZW5kQnRuRWxlbWVudCkge1xyXG4gICAgc3RhcnRCdG5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbiAgICBlbmRCdG5FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtYnRuXCIpXHJcbn1cclxuICBcclxuXHJcblxyXG5leHBvcnQge2dldE5laWdoYm9ycyxcclxuICAgICAgICBpc1ZhbGlkLFxyXG4gICAgICAgIHVwZGF0ZURlc3RpbmF0aW9uLFxyXG4gICAgICAgIGRlYWN0aXZhdGVCdXR0b25zLFxyXG4gICAgICAgIHVwZGF0ZVN0ZXBzfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZHJhd0JvYXJkLCBjbGVhckJvYXJkIH0gZnJvbSBcIi4vZHJhd0JvYXJkXCJcclxuaW1wb3J0IHsgZ2V0UGF0aCB9IGZyb20gXCIuL2dldFBhdGhcIlxyXG5pbXBvcnQge3VwZGF0ZURlc3RpbmF0aW9uLCB1cGRhdGVTdGVwcywgZGVhY3RpdmF0ZUJ1dHRvbnN9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiXHJcbmltcG9ydCB7IGRyYXdQYXRoIH0gZnJvbSBcIi4vZHJhd1BhdGhcIlxyXG5cclxubGV0IGFjdGl2ZUJ1dHRvblxyXG5sZXQgc3RhcnRDZWxsID1bMCwwXVxyXG5sZXQgZW5kQ2VsbCA9IFswLDBdXHJcbmRyYXdCb2FyZChzdGFydENlbGwsZW5kQ2VsbClcclxuXHJcbmNvbnN0IGNoZXNzYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoZXNzYm9hcmRcIilcclxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWNlbGwtYnRuXCIpXHJcbmNvbnN0IGVuZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW5kLWNlbGwtYnRuXCIpXHJcbmNvbnN0IHRyYXZhaWxCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRyYXZhaWwtYnRuXCIpXHJcbmNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGVhci1idG5cIilcclxuXHJcbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBhY3RpdmVCdXR0b24gPSBcInN0YXJ0XCJcclxuICAgIGVuZEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlLWJ0blwiKVxyXG4gICAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1idG5cIilcclxufSlcclxuXHJcbmVuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgYWN0aXZlQnV0dG9uID0gXCJlbmRcIlxyXG4gICAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1idG5cIilcclxuICAgIGVuZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWJ0blwiKVxyXG59KVxyXG5cclxuY2hlc3Nib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgY29uc3QgY2xpY2tlZENlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgaWYgKGNsaWNrZWRDZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImNlbGxcIikpIHtcclxuICAgIC8vIEhhbmRsZSB0aGUgY2xpY2sgb24gdGhlIGNlbGwgaGVyZVxyXG4gICAgLy8gWW91IGNhbiB1c2UgY2xpY2tlZENlbGwgdG8gaWRlbnRpZnkgdGhlIHNwZWNpZmljIGNlbGwgdGhhdCB3YXMgY2xpY2tlZFxyXG4gICAgLy8gRm9yIGV4YW1wbGUsIHlvdSBjYW4gYWNjZXNzIGl0cyBkYXRhIGF0dHJpYnV0ZXMgb3IgY2xhc3MgbmFtZXMuXHJcbiAgICAvLyBjb25zdCBkYXRhUG9zaXRpb24gPSBjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc2l0aW9uXCIpO1xyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YVBvc2l0aW9uKTtcclxuICAgIGlmIChhY3RpdmVCdXR0b24gPT09IFwic3RhcnRcIikge1xyXG4gICAgICBsZXQgc3RyaW5nZGF0YSA9IGNsaWNrZWRDZWxsLmdldEF0dHJpYnV0ZShcImRhdGEtcG9zaXRpb25cIik7XHJcbiAgICAgIHN0YXJ0Q2VsbCA9IHN0cmluZ2RhdGEuc3BsaXQoXCIsXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgICAvL2lucHV0U3RyaW5nLnNwbGl0KFwiLFwiKSBzcGxpdHMgdGhlIGlucHV0IHN0cmluZyBhdCB0aGUgY29tbWEsIHJlc3VsdGluZyBpbiBhbiBhcnJheSBvZiBzdWJzdHJpbmdzIFtcIjJcIiwgXCIzXCJdLlxyXG4gICAgICAvLy5tYXAoTnVtYmVyKSBjb252ZXJ0cyBlYWNoIHN1YnN0cmluZyB0byBhIG51bWJlciwgY3JlYXRpbmcgdGhlIGZpbmFsIGFycmF5IFsyLCAzXS5cclxuICAgIH0gZWxzZSBpZiAoYWN0aXZlQnV0dG9uID09PSBcImVuZFwiKSB7XHJcbiAgICAgIGxldCBzdHJpbmdkYXRhID0gY2xpY2tlZENlbGwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wb3NpdGlvblwiKTtcclxuICAgICAgZW5kQ2VsbCA9IHN0cmluZ2RhdGEuc3BsaXQoXCIsXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJCb2FyZCgpO1xyXG4gICAgZHJhd0JvYXJkKHN0YXJ0Q2VsbCwgZW5kQ2VsbCk7XHJcbiAgICBjb25zb2xlLmxvZyhgc3RhcnQ6ICR7c3RhcnRDZWxsfSwgdGFyZ2V0OiAke2VuZENlbGx9YCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnRyYXZhaWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgZGVhY3RpdmF0ZUJ1dHRvbnMoc3RhcnRCdXR0b24sZW5kQnV0dG9uKVxyXG4gIGlmIChzdGFydENlbGxbMF0gPT09IDAgJiYgc3RhcnRDZWxsWzFdID09PSAwIHx8IGVuZENlbGxbMF0gPT09IDAgJiYgZW5kQ2VsbFsxXSA9PT0gMCkge3JldHVybn1cclxuICAvL2NhbnQgZG8gc3RhcnRDZWxsID09PSBbMCwwXSBiYyBpdCBjb21wYXJlcyBtZW1vcnkgbm90IHZhbHVlc1xyXG5cclxuICBjb25zdCBbc3RhcnRSb3csIHN0YXJ0Q29sXSA9IHN0YXJ0Q2VsbFxyXG4gIGNvbnN0IFt0YXJnZXRSb3csIHRhcmdldENvbF0gPSBlbmRDZWxsXHJcbiAgY29uc3QgcGF0aHMgPSBnZXRQYXRoKHN0YXJ0Um93LHN0YXJ0Q29sLHRhcmdldFJvdyx0YXJnZXRDb2wpXHJcbiAgY29uc29sZS5sb2cocGF0aHMpXHJcbiAgdXBkYXRlRGVzdGluYXRpb24oc3RhcnRDZWxsLGVuZENlbGwpXHJcbiAgdXBkYXRlU3RlcHMocGF0aHMsc3RhcnRDZWxsKVxyXG4gIGRyYXdQYXRoKHBhdGhzLHN0YXJ0Q2VsbClcclxuXHJcbn0pXHJcblxyXG5jbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KClcclxuICBsb2NhdGlvbi5yZWxvYWQoKVxyXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==