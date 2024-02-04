const logRoutes = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

const renderTemplate = require('../lib/renderTemplate');
const Login = require('../views/pages/Login');

logRoutes.get('/', (req, res) => {
    renderTemplate(Login, null, res);
  });

  logRoutes.post('/', async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ where: { login } });
        if(user) {
            const checkPass = await bcrypt.compare(password, user.password);
            if(checkPass) {
                req.session.login = user.login;
                req.session.userId = user.id;
                req.session.save(() => {
                    res.json({ msg: 'Вы успешно авторизовались!' });
                });
            }
            } else {
            res.json({ err: 'Такой пользователь не найден!' });
        }
    } catch(error) {
        console.log(error, 'ОШИБКА В РУЧКЕ ЛОГИН')
        res.json({ err: 'Ошибка при авторизации' })
    }
  }); 

  module.exports = logRoutes;
