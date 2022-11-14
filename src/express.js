const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const corsOptions = {
  origin: '*',
};
const expressConfig = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
};

module.exports = expressConfig;
