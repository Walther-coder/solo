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

accountRoutes.put('/login', async (req, res) => {
    const {login} = req.session;
    const {universal} = req.body;
    console.log(login, universal, '=======>')
    try {
        const user = await User.findOne({where: {login}});
        console.log(user, '<====>>>>')
        if(user){
            console.log(user, '<====')
            user.login = universal;
            await user.save();
            res.json({
                msg: 'Логин удачно изменен. Войдите заново.',
                action: "loginChanged"
        })
        } else{
            res.json({err: 'Ошибка! Попробуйте еще раз'})
        }
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ ИЗМЕНЕНИЯ ЛОГИНА')
    }
})

accountRoutes.put('/email', async (req, res) => {
    const {login} = req.session;
    const {universal} = req.body;
    console.log('universal=====>', universal)
    try {
        const user = await User.findOne({where: {login}});
        if(user){
            user.email = universal;
            await user.save();
            res.json({
                user,
                msg: "Email успешно изменен",
                action: "emailChanged"
            })
        } else{
            res.json({err: 'Ошибка! Попробуйте еще раз'})
        }
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ ИЗМЕНЕНИЯ ЛОГИНА')
    }
})

module.exports = accountRoutes;
