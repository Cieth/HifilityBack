const user = require('./api/user/user.route');
const product = require('./api/product/product.route');
const routes = (app) => {
  app.use('/auth', user);
  app.use('/product', product);
};

module.exports = routes;
