require('dotenv').config();

const db = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./lib/logger');
const routes = require('./routes');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLog);
app.use('/users', routes);
app.use(errorHandler);

db.connect(
  process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
).then(() => {
  app.listen(port, () => logger.info(`Insan is running on port ${port}`));
}).catch((err) => {
  logger.error(err);
  process.exit(1);
});
