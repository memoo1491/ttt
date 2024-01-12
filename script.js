const statusText = document.getElementById("statusText");
const restartButton = document.getElementById("restartButton");
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();

    // If the game is still active after player's turn, AI takes a turn
    if (gameActive) {
        aiTurn();
    }
}


function aiTurn() {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) {
        return;
    }

    const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomCellIndex] = "O";
    document.querySelector(`[data-cell-index="${randomCellIndex}"]`).textContent = "O";

    checkResult();
}


function updateCell(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
}

function checkResult() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.textContent = "Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "";
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);