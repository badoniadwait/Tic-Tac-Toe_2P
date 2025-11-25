let game = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
let player1 = null;
let player2 = null;

let winner = null;

let p1win = 0;
let p2win = 0;

let turn = 'X';
let cnt = 0;

function endGame() {
    if (winner && winner !== 'draw') {
        console.log(winner, " won!");
    }
    else {
        console.log('its a draw!');
    }
}

function checkWin(i, j) {
    const val = game[i][j];

    if (game[i][0] === val && game[i][1] === val && game[i][2] === val) {
        return true;
    }

    if (game[0][j] === val && game[1][j] === val && game[2][j] === val) {
        return true;
    }

    if (i === j) {
        if (game[0][0] === val && game[1][1] === val && game[2][2] === val) {
            return true;
        }
    }

    if (i + j === 2) {
        if (game[0][2] === val && game[1][1] === val && game[2][0] === val) {
            return true;
        }
    }

    return false;
}


function setPlayerName(req, res) {
    const players = req.body;

    player1 = players.pOne;
    player2 = players.pTwo;

    return res.redirect('/play');
}

function renderHome(req, res) {
    return res.render('home');
};

function postATPlay(req, res) {
    const players = req.body;

    if (players.i && players.j) {
        cnt++;
        game[players.i][players.j] = turn;;

        if (cnt > 4 && checkWin(players.i, players.j)) {
            if (turn === 'X') {
                p1win++;
                winner = player1;
            }
            else {
                p2win++;
                winner = player2;
            }
            endGame();
        };

        if (cnt === 9) {
            winner = 'draw'
            endGame();
        }

        if (turn === 'X') turn = 'O';
        else turn = 'X';
    }

    return res.redirect('/play');
};

function playAgain(req, res) {

    console.log('play again')
    if (req.body.rematch) {
        game = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        winner = null;
        turn = 'X';
        cnt = 0;
    }
    return res.redirect('/play');
}

function renderGame(req, res) {

    if(!player1 || !player2){
        return res.redirect('/');
    }

    return res.render('game', { game, turn, winner, player1, player2, p1win, p2win });
};
module.exports = { renderHome, postATPlay, renderGame, setPlayerName, playAgain };