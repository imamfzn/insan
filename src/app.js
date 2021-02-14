require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const { errorHandler, requestLog } = require('./middlewares');

function exitError(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

if (!process.env.ACCESS_TOKEN_SECRET) {
  exitError('ACCESS_TOKEN_SECRET not provided.');
}

if (!(process.env.AUTAN_BASIC_USER && process.env.AUTAN_BASIC_PASSWORD)) {
  exitError('AUTAN_BASIC_USER or AUTAN_BASIC_PASSWORD not provided.');
}

const app = express();

app.use(express.json());
app.use(requestLog);
app.use('/users', userRouter);
app.use(errorHandler);

async function start() {
  await mongoose.connect(
    process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );

  app.listen(3001, () => console.log('Insan is running on port 3001.'));
}

start();
