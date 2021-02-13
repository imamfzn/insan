require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const middleware = require('./middlewares');

if (!process.env.ACCESS_TOKEN_SECRET){
  console.error("ERROR: ACCESS_TOKEN_SECRET not provided!");
  process.exit(1);
}

if (!(process.env.AUTAN_BASIC_USER && process.env.AUTAN_BASIC_PASSWORD)){
  console.error("ERROR: AUTAN_BASIC_USER or AUTAN_BASIC_PASSWORD not provided.");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use(middleware.error);

(
  async function (){
    try {
      await mongoose.connect(
        'mongodb://localhost/insan',{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        }
      );
    } catch (e) {
      throw e;
    }

    app.listen(3001, () => console.log("Insan is running on port 3001."));
  }
)();