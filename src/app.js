const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');

const app = express();

if (!process.env.ACCESS_TOKEN_SECRET){
  console.error("ERROR: ACCESS_TOKEN_SECRET not provided!");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/insan", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb."))
  .catch(err => console.error(`Can't connect to mongodb. Error:\n${err}`));

app.use(express.json());
app.use('/users', userRouter);

app.listen(3001, () => console.log("App is running"));
