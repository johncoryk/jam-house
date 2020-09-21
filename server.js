const express = require('express');
const logger = require('morgan');

const jamsRouter = require('./routes/jam-routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static('public'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => res.send('hello'));

app.use('/api/jams', jamsRouter);

app.use('*', (req, res) => {
  res.status(404).send({
    error: 'Not Found!',
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({
    err,
    message: err.message,
    stack: err.stack,
  });
});
