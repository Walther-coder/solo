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
const regRoutes = require('./routes/registratrtionRoutes');
const logRoutes = require('./routes/loginRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const quotesApiRoutes = require('./routes/quotesApiRoutes');
const accountRoutes = require('./routes/accountRoutes');

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
// * Подключи сессии как мидл
app.use(session(sessionConfig));

app.use('/account', checkUser, accountRoutes);
app.use('/quotesApi', checkUser, quotesApiRoutes)
app.use('/quote', checkUser, favoritesRoutes);
app.use('/login', secureRoute, logRoutes);
app.use('/register', secureRoute, regRoutes);
app.use('/', checkUser, indexRoutes);

app.listen(PORT ?? 3100, () => {
  console.log('Сервер запущен!');
});
