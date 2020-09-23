const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const jamsRouter = require('./routes/jam-routes');
const authRouter = require('./routes/auth-routes');
const usersRouter = require('./routes/user-routes');

const app = express();
require('dotenv').config();

// app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static('public'))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => res.send('hello'));

app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);
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
