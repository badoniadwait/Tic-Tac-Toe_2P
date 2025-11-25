const { Router } = require('express');

const controller = require('../controllers/game');

const router = Router();

router.route('/')
    .get(controller.renderHome)
    .post(controller.setPlayerName);

router.route('/play')
    .get(controller.renderGame)
    .post(controller.postATPlay);

router.post('/playagain',controller.playAgain)

module.exports = router;