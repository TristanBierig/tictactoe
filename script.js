let fields = [];
let gameOver = false;
let winner;
let currentShape = 'cross';
let AUDIO_CIRCLE = new Audio('audio/circle.mp3');
let AUDIO_CROSS = new Audio('audio/cross.mp3');


function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            fillCircle()
        } else {
            fillCross()
        }

        fields[id] = currentShape;
        renderGamingElements();
        checkForWin();
    }
}


function fillCircle() {
    AUDIO_CROSS.play();
    currentShape = 'circle';
    document.getElementById('player-2').classList.remove('player-inactive');
    document.getElementById('player-1').classList.add('player-inactive');
}


function fillCross() {
    currentShape = 'cross';
    AUDIO_CIRCLE.play();
    document.getElementById('player-2').classList.add('player-inactive');
    document.getElementById('player-1').classList.remove('player-inactive');
}


function restart() {
    // Sets all Variables to default
    gameOver = false;
    winner = '';
    fields = [];
    currentShape = 'cross';

    document.getElementById('player-2').classList.add('player-inactive');
    document.getElementById('player-1').classList.remove('player-inactive');

    removeGamingElements();
    hideGameOverScreen();
}


function removeGamingElements() {
    for (let i = 1; i < 9; i++) {
        document.getElementById(`line-${i}`).style.transform = '';
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById(`circle-${i}`).classList.add('d-none');
        document.getElementById(`cross-${i}`).classList.add('d-none');
    }
}


function hideGameOverScreen() {
    document.getElementById('winner').innerHTML = '';
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('game-over').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
}


function renderGamingElements() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-${i}`).classList.remove('d-none');
        }

        if (fields[i] == 'cross') {
            document.getElementById(`cross-${i}`).classList.remove('d-none');
        }
    }
}


function checkForWin() {
    // Checks for winner
    checksForHorizontalWin();
    checksForVerticalWin();
    checksForDiagonalWin();
    // Checks for Draw
    let allFieldsAreTrue = true;
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i]) {
            allFieldsAreTrue = false;
            break;
        }
    }
    // Executes GameOver Screen if Draw or Win
    if (allFieldsAreTrue && fields.length === 9 || winner) {
        showGameOverScreen();
    }
}


function checksForHorizontalWin() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)';
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)';
    }
}


function checksForVerticalWin() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'rotate(90deg) scaleX(1)';
    }
}


function checksForDiagonalWin() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg) scaleX(1.2)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scaleX(1.2)';
    }
}


function showGameOverScreen() {
    gameOver = true;

    setTimeout(function () {
        document.getElementById('game-over').classList.remove('d-none');
        document.getElementById('end-screen').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none');
        printOutTheWinner();
    }, 1500);
}


function printOutTheWinner() {
    if (winner == 'circle') {
        document.getElementById('winner').innerHTML = `Player 1 wins!`;
    }

    if (winner == 'cross') {
        document.getElementById('winner').innerHTML = `Player 2 wins!`;
    }

    if (!winner) {
        document.getElementById('winner').innerHTML = `It's a draw. Try again!`;
    }
}