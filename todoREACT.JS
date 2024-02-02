//!
// 1. инициализация проекта npm init -y,

// 2. npx create-gitignore node, (после установок всех компонентов прописать ещё раз, предложит перезаписать файл, согласиться)

// 3. npx eslint --init ( 3, 2, 3, No, Node, 1, 1, 3, Yes, npm)

// 4. для eslint
// "rules": {
//     "import/no-extraneous-dependencies": 0,
//     "import/no-dynamic-require": 0,
//     "global-require": 0,
//     "strict": 0,
//     "no-console": 0,
//     "no-unused-vars": 0,
//     "max-len": 0
//   }

// 5. npm i express

// 6. npm i -D nodemon morgan

// 7. npm i @babel/core @babel/preset-env @babel/preset-react @babel/register react react-dom

// 8. создай файл .babelrc и добавь в него: 
// {
//   "presets": [
//     "@babel/preset-env",
//     "@babel/preset-react"
//   ]
// }

// 9. npm i express-session session-file-store bcrypt

// 10. добавить в package.json (в скрипты):
// "start": "node app.js"
// "dev": "nodemon app.js --ignore sessions --ext js,jsx",
// "initdb": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all"

// 11. добавь  папку sessions в gitignore (или проверь, возможно она там уже есть)

//! создаем БД  1 способ
// todo создаём файл .sequelizerc , копируем в него следующее:
/*

     const path = require('path');

    module.exports = {
        'config': path.resolve('db', 'config', 'database.json'),
        'models-path': path.resolve('db', 'models'),
        'seeders-path': path.resolve('db', 'seeders'),
        'migrations-path': path.resolve('db', 'migrations'),
    };
// Создаем базу 

    //  npx sequelize init

//todo правим конфиги доступа к БД на свои

"development": {
    "username": "postgres",
    "password": "123",
    "database": "carv",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },


//  npx sequelize db:create

//!  создаем БД  2 способ 

// 12. создаём в SQL Shell db:
// CREATE DATABASE [name] OWNER [name]; (в конце ; обязательно)

// 13. npm i sequelize sequelize-cli pg pg-hstore

// 14. создай sequelizerc и добавь:
// require('dotenv').config();

// const path = require('path');

// module.exports = {
//   config: path.resolve('db', 'config', 'database.json'),
//   'models-path': path.resolve('db', 'models'),
//   'seeders-path': path.resolve('db', 'seeders'),
//   'migrations-path': path.resolve('db', 'migrations'),
// };

// 15. инициализируем db
// npx sequelize-cli init

// 16. npm i dotenv
// todo зайди в .sequelizerc и в app.js и напиши require('dotenv').config()
// todo зайди в database.json и поменяй development на переменную окружения

// 17. создаём файл .env и наполняем его
// PORT=3000
// DB=postgres://[user]:[password]@localhost:[host]/[db name]
// (к примеру DB=postgres://super:Rfhfcbrb123@localhost:5432/krosshop)
// SESSION_SECRET='Сессии нет'
// todo или (пример)
PORT=3001
DATABASE=postgres://main:123@localhost:5432/p2w1d3buffaloes
DATABASE1=[dialect]://[user]:[pass]@[host]:[port]/[db_name]

// 18. создаём файл .env_example
// PORT=nubmer
// DB=[dialect]://[username]:[password]@[host]/[db name]

// 19. в конфиге db поменять:
// "development": {
//     "use_env_variable": "DB"
//   },
//!
// 20. создаём файл по пути src -> lib -> renderTemplate.js и наполняем его:


// const React = require('react');
// const ReactDOMServer = require('react-dom/server');

// const renderTemplate = (reactElement, properties, response) => {
//   const reactEl = React.createElement(reactElement, properties);
//   const html = ReactDOMServer.renderToStaticMarkup(reactEl);
//   response.send(`<!DOCTYPE html>${html}`);
//   response.end();
// };

// module.exports = renderTemplate;
//!
// 21. Создаём файл по пути src -> middlewares -> middlewares.js и наполняем:
// const checkUser = (req, res, next) => {
//   if (req.session.login) {
//     next();
//   } else {
//     res.redirect('/log');
//   }
// };

// const secureRoute = (req, res, next) => {
//   if (!req.session.login) {
//     next();
//   } else {
//     res.redirect('/main');
//   }
// };

// module.exports = { checkUser, secureRoute };

// (
//     checkUser - не даст зайти без регистрации/логина на страницу
//     secureRoute - не даст зайти на страницу, если вы вошли под юзером
// )
//!
// 22. Наполняем файл app.js:

// require('@babel/register');
// require('dotenv').config();

// const express = require('express');
// const morgan = require('morgan');

// const session = require('express-session');
// const FileStore = require('session-file-store')(session);

// const path = require('path');

// /// тут будут ручки
// const { checkUser, secureRoute } = require('./src/middlewares/middlewares');
//                                         у вас может быть другой путь к папке, проверьте

// const { PORT } = process.env ?? 3100;

// const app = express();

// const sessionConfig = {
//   name: 'Cookie',
//   store: new FileStore(),
//   secret: process.env.SESSION_SECRET ?? 'Session',
//   resave: false,
//   saveUninitialized: false, // * если false, куки появятся только при установке req.session
//   cookie: {
//     maxAge: 9999999,
//     httpOnly: true,
//   },
// };

// app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session(sessionConfig));




// /// тут будут app.use
// ...

// app.get('/*', (req, res) => {
//   res.redirect('/main');
// });

// app.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });
