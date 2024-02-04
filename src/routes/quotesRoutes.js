const qootesRoutes = require('express').Router();

const { Quote } = require('../../db/models');
const favorites = require('../views/pages/Favorites');

const renderTemplate = require('../lib/renderTemplate');
const Favorites = require('../views/pages/Favorites');

qootesRoutes.get('/favorites', async (req, res) => {
    const { login } = req.session;
    const qoutes = await Quote.findAll({ raw: true });
    renderTemplate(Favorites, { login, qoutes }, res);
});

module.exports = qootesRoutes;
