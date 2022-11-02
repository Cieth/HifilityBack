const mongoose = require('mongoose');

let connection;

const connect = async () => {
  if (connection) return;
  const mongoUri = process.env.MONGO_URI;
  mongoose.connect(mongoUri);

  mongoose.connection.once('open', () => {
    console.log('Connection established');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected succesfully');
  });

  mongoose.connection.on('error', () => {
    console.log('There was an error');
  });

  await mongoose.connect(mongoUri);
};

async function disconnected() {
  if (!connection) return;

  await mongoose.disconnect();
}

module.exports = { connect, disconnected };
