const user = require('./api/user/user.route');

const routes = (app) => {
  app.use('/auth', user);
};

module.exports = routes;
