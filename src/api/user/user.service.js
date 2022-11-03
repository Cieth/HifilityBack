const User = require('./user.model');

const signUp = (user, encodedPassword) => {
  return User.create({ ...user, password: encodedPassword });
};

const login = (email) => {
  return User.findOne({ email });
};

module.exports = { signUp, login };
