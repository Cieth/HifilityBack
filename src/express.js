const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

const expressConfig = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
};

module.exports = expressConfig;
