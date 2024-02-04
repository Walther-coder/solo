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

module.exports = qootesRoutes;
