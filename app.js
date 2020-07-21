const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');
const { errorHandler } = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const libraryRoutes = require('./routes/library');

const app = express();

app.use(bodyParser.json());

app.use(userRoutes);
app.use(bookRoutes);
app.use(libraryRoutes);

app.use((req, res, next) => {
  //Implement if auth needed
  res.currentUser = true;
  next();
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
