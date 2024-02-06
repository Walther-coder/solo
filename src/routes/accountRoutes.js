const accountRoutes = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');
const Account = require('../views/pages/Account');
const renderTemplate = require('../lib/renderTemplate');

accountRoutes.get('/', async (req, res) => {
    const { login, userId } = req.session;
    console.log(login, userId)

    const user = await User.findByPk(userId);
    const userInfo = user.get({ plain: true });
    console.log(userInfo)

    renderTemplate(Account, { login, user: userInfo }, res);
})

accountRoutes.put('/', async (req, res) => {
    const { login } = req.session;
    const { oldP, newP } = req.body;
    try {
        const user = await User.findOne({ where: { login } });
        if(user) {
            const checkPass = await bcrypt.compare(oldP, user.password);
            if(checkPass) {
                const hash = await bcrypt.hash(newP, 10);
                user.password = hash;
                await user.save();
                res.json({msg: 'Пароль удачно сменен! Необходимо войти в систему.'});
            } else {
                res.json({err: 'Ошибка! попробуйте еще раз!'})
            }
        }  
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ ИЗМЕНЕНИЯ ПАРОЛЯ');
    }
})

module.exports = accountRoutes;
