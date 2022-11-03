const Router = require('express');

const { signUpHandler, logInHandler } = require('./user.controller');

const router = Router();

router.post('/signup', signUpHandler);
router.post('/login', logInHandler);

module.exports = router;
