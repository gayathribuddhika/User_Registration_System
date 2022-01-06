// import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose = require("mongoose");
const msg = require('./constants/message');
const codes = require('./constants/common');

const userRoutes = require('./routes/user_route');

const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

// database connection
mongoose
  .connect(process.env.DB_URI, {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(msg.STATUS_MESSAGE.DB_CONN))
  .catch((err) => console.log(err));

// middlewares
app.use(bodyParser.json());
app.use(cors());

// router prefix
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new HttpError(msg.STATUS_MESSAGE.NotfoundRoute, codes.STATUS_CODE.NotFound);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || codes.STATUS_CODE.InternalServerError);
  res.json({ message: error.message || msg.STATUS_MESSAGE.unknownError });
});

// start the server
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);


module.exports = app;