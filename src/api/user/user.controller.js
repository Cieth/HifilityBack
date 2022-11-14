const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./user.model');

const { signUp, login } = require('./user.service');

const signUpHandler = async (req, res) => {
  const userData = req.body;
  const { fullName, email, password } = userData;
  try {
    const existingUser = await User.find({ email });
    console.log(existingUser);
    if (existingUser.length !== 0) {
      throw new Error('User already exists');
    }
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (fullName.length <= 3) {
      throw new Error('Name must be at least 4 characters long');
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      throw new Error('Type a valid email');
    }
    const encodePassword = await bcrypt.hash(password, 8);
    const user = await signUp(userData, encodePassword);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    return res
      .status(201)
      .json({ message: 'User created successfully', data: { token } });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error creating user', error: error.message });
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
    return res.status(200).json({
      message: 'Logged succesfully',
      data: { products: user.products },
      token,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'There was an error loggin in', error: error.message });
  }
};
const updateDataHandler = async (req, res) => {
  const userId = req.user;
  const dataToUpdate = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, dataToUpdate);
    if (!user) throw new Error('Invalid user');
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({ message: 'User:', data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'User couldnt be fetched', error: error.message });
  }
};
const userDataHandler = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId).populate({
      path: 'products',
    });
    if (!user) throw new Error('Invalid user');

    return res.status(200).json({ message: 'User:', data: user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'User couldnt be fetched', error: error.message });
  }
};

module.exports = {
  signUpHandler,
  logInHandler,
  userDataHandler,
  updateDataHandler,
};
