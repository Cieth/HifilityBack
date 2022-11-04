require('dotenv').config();
const express = require('express');

const routesConfig = require('./routes.config');
const expressConfig = require('./express');
const { connect } = require('./database');

const app = express();
const port = 8080;

app.listen(port, () => {
  expressConfig(app);
  connect();
  routesConfig(app);

  console.log(`listening on http://localhost:${port}`);
});
