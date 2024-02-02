require('@babel/register');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { secureRoute, checkUser } = require('./middlewares/middlewares');

const dbConnectionCheck = require('../db/dbConnectCheck');

const { PORT } = process.env;

const app = express();
dbConnectionCheck();

const indexRoutes = require('./routes/indexRoutes');
const regRouter = require('./routes/registratrtionRoute');
const logRoutes = require('./routes/loginRouter');
// const teaRoutes = require('./routes/teaRoutes');

// * Конфиг для куки в виде файла сессий
const sessionConfig = {
  name: 'valeraCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 9999999, // * время жизни в мс (ms)
    httpOnly: true,
  },
};

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
// * Подключи сессии как мидлу
app.use(session(sessionConfig));

// app.use('/tea', teaRoutes);
app.use('/login', logRoutes);
app.use('/register', regRouter);
app.use('/', indexRoutes);

app.listen(PORT ?? 3100, () => {
  console.log('Сервер запущен!');
});
