const regRouter = require('express').Router();
const bcrypt = require('bcrypt');

const renderTemplate = require('../lib/renderTemplate');
const Register = require('../views/pages/Register');

const { User } = require('../../db/models');

regRouter.get('/', (req, res) => {
    renderTemplate(Register, null, res);
  });

  regRouter.post('/', async (req, res) => {
    const { login, email, password } = req.body;
    try {
      const user = await User.findOne({ where: { login } });
      if(user) {
        res.json({ err: `Такой пользователь уже есть!` });
      } else{
        //  хэширование паролей
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ login, email, password: hash });
        // создаётся сессия
        req.session.login = newUser.login;
        req.session.userId = newUser.id;
        console.log(req.session);

        req.session.save(() => {
            res.json({ msg: 'Пользователь удачно зарегистрирован!' });
        });
      }
    } catch (error) {
        res.send(`Фатальная ошибка ${error}`);
    }
  })

  module.exports = regRouter;
