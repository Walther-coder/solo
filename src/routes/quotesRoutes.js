const qootesRoutes = require('express').Router();

const { Quote } = require('../../db/models');
const favorites = require('../views/pages/Favorites');

const renderTemplate = require('../lib/renderTemplate');
const Favorites = require('../views/pages/Favorites');

qootesRoutes.get('/favorites', async (req, res) => {
    const { login } = req.session;
    const quotes = await Quote.findAll({ raw: true });
    console.log('=====>', quotes)
    renderTemplate(favorites, { login, quote: quotes }, res);
});

qootesRoutes.post('/favorites', async (req, res) => {
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

qootesRoutes.delete('/favorites/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Quote.destroy({ where: { id } });
        const newQuotesAll = await Quote.findAll();
        const result = newQuotesAll.map((el) => el.get({ plain: true }));
        res.json(result)
    } catch (error) {
        console.log(error, 'ОШИБКА v РУЧКЕ УДАЛЕНИЯ');
        res.status(400)
    }
})

qootesRoutes.put('/favorites/:id', async (req, res) => {
    const { id } = req.params;
    const { quote: body } = req.body;
    try {
        const quryQuote = await Quote.findOne({ where: { id } });
    
        quryQuote.body = body;
        await quryQuote.save();
        res.json(quryQuote);
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ РЕДАКТИРОВАНИЯ');
        res.status(500);
    }
})

module.exports = qootesRoutes;
