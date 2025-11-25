let { board: game, player1, player2, winner, p1win, p2win, turn, cnt } = require('../gameOb/game');


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
    const { i, j } = req.body;
    const Ni = Number(i);
    const Nj = Number(j);

    cnt++;

    game[Ni][Nj] = turn;

    if (cnt > 4 && checkWin(Ni, Nj)) {
        if (turn === 'X') {
            p1win++;
            winner = player1;
        }
        else {
            p2win++;
            winner = player2;
        }
    }

    if (cnt === 9) {
        if (!winner) winner = 'draw';
    }


    if (turn === 'X') turn = 'O';
    else turn = 'X';


    return res.redirect('/play');
};

function playAgain(req, res) {

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

    if (!player1 || !player2) {
        return res.redirect('/');
    }

    return res.render('game', { game, turn, winner, player1, player2, p1win, p2win });
};
module.exports = { renderHome, postATPlay, renderGame, setPlayerName, playAgain };