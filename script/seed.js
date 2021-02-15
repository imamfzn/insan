const mongoose = require('mongoose');
const logger = require('../src/lib/logger');
const UserService = require('../src/services/user');

const user = {
  username: 'gatotkaca',
  password: process.env.INIT_USER_PASSWORD,
  email: 'gatotkaca@gmail.com',
  name: 'Gatot',
};

const admin = {
  username: 'ultraman',
  password: process.env.INIT_ADMIN_PASSWORD,
  email: 'ultraman@gmail.com',
  name: 'Ultraman',
  role: 'admin',
};

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
    logger.fatal(err);
    process.exit(1);
  }

  try {
    logger.info("creating admin ...");
    await UserService.create(admin);
  } catch (err) {
    logger.error("error creating admin");
    logger.error(err);
  }

  try {
    logger.info("creating user ...");
    await UserService.create(user);
  } catch (err) {
    logger.error("error creating user");
    logger.error(err);
  }

  await mongoose.disconnect();
  logger.info("finished.");
}

start();
