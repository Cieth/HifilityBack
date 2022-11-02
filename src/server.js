require('dotenv').config();
const express = require('express');
const { connect } = require('./database');
const app = express();
const port = 8080;

app.listen(port, () => {
  connect();
  console.log('listening on port', port);
});
