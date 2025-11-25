let Game = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ],
    player1: null,
    player2: null,
    winner: null,
    p1win: 0,
    p2win: 0,
    turn: 'X',
    cnt: 0
};

module.exports = Game;