require('dotenv').config();
const express = require('express');

const routesConfig = require('./routes.config');
const expressConfig = require('./express');
const { connect } = require('./database');

const app = express();

app.listen(process.env.PORT || 3000, () => {
  expressConfig(app);
  connect();
  routesConfig(app);

  console.log(`listening on http://localhost:${process.env.PORT}`);
});
