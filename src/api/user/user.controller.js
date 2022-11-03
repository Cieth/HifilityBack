const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./user.model');

const { signUp, login } = require('./user.service');

const signUpHandler = async (req, res) => {
  const userData = req.body;
  const { email, password } = userData;
  try {
    const existingUser = await User.find({ email });
    if (!existingUser) throw new Error('User already exists');

    if (password.length < 8)
      throw new Error('Password must be at least 6 characters long');

    const encodedPassword = await bcrypt.hash(password, 8);
    const user = await signUp(userData, encodedPassword);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    return res
      .status(201)
      .json({ message: 'User created succesfully', data: { user, token } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'User could not be created', error: error.message });
  }
};

const logInHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email);

    if (!user) throw new Error(`This user does not exist`);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error(`some credentials are invalid `);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    return res
      .status(200)
      .json({ message: 'Logged succesfully', data: { token } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'There was an error loggin in', error: error.message });
  }
};

module.exports = { signUpHandler, logInHandler };
