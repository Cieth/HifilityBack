const Router = require('express');

const {
  signUpHandler,
  logInHandler,
  userDataHandler,
  updateDataHandler,
} = require('./user.controller');

const { auth } = require('../../utils/auth');
const router = Router();

router.get('/user', auth, userDataHandler);
router.put('/user', auth, updateDataHandler);
router.post('/signup', signUpHandler);
router.post('/login', logInHandler);

module.exports = router;
