const quotesRoutes = require('express').Router();

const { Quote } = require('../../db/models');
const Favorites = require('../views/pages/Favorites');
const renderTemplate = require('../lib/renderTemplate');

quotesRoutes.get('/favorites', async (req, res) => {
    const { login, userId } = req.session;
    const quotes = await Quote.findAll({ where: { user_id: userId }, raw: true });
    console.log('=====>', quotes)
    renderTemplate(Favorites, { login, quote: quotes }, res);
});

quotesRoutes.post('/favorites', async (req, res) => {
    const { quote: body } = req.body;
    const { userId } = req.session;
    console.log('====>', body, userId)
    try {
        const newQuote = await Quote.create({ body, user_id: userId });
        const newQuoteData = newQuote.get({ plain: true });
        res.json(newQuoteData);
    } catch (error) {
        console.log(error, 'ФАТАЛЬНАЯ ОШИБКА В РУЧКЕ CREATE');
        res.sendStatus(400);
    }
})

quotesRoutes.delete('/favorites/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.session;
    try {
        const queryQuoty = await Quote.findByPk(id);
        if(queryQuoty.user_id === userId){
            await Quote.destroy({ where: { id } });
            const newQuotesAll = await Quote.findAll({ where: { user_id: userId } });
            const result = newQuotesAll.map((el) => el.get({ plain: true }));
            res.json(result)
        }else{
            console.log('Ошибка в правах удаления')
        }
    } catch (error) {
        console.log(error, 'ОШИБКА v РУЧКЕ УДАЛЕНИЯ');
        res.status(400)
    }
})

quotesRoutes.put('/favorites/:id', async (req, res) => {
    const { id } = req.params;
    const { quote: body } = req.body;
    const { userId } = req.session;
    try {
        const quryQuote = await Quote.findOne({ where: { id } });
        if(quryQuote.user_id === userId){
            quryQuote.body = body;
            await quryQuote.save();
            res.json(quryQuote);
        }else{
            console.log('Ошибка в правах изменения')
        }
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ РЕДАКТИРОВАНИЯ');
        res.status(500);
    }
})

module.exports = quotesRoutes;
