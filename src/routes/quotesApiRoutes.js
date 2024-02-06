const quotesApiRoutes = require('express').Router();

const QutesApi = require('../views/pages/QuotesApi');
const renderTemplate = require('../lib/renderTemplate');

quotesApiRoutes.get('/', async (req, res) => {
    const { login } = req.session;
    renderTemplate(QutesApi, { login }, res);
});

module.exports = quotesApiRoutes;
