require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./lib/logger');
const userRouter = require('./routes/user');
const { errorHandler, requestLog } = require('./middlewares');

if (!process.env.ACCESS_TOKEN_SECRET) {
  logger.fatal('ACCESS_TOKEN_SECRET not provided.');
  process.exit(1);
}

if (!(process.env.AUTAN_BASIC_USER && process.env.AUTAN_BASIC_PASSWORD)) {
  logger.fatal('AUTAN_BASIC_USER or AUTAN_BASIC_PASSWORD not provided.');
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLog);
app.use('/users', userRouter);
app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    );
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  app.listen(port, () => logger.info(`Insan is running on port ${port}`));
}

start();
