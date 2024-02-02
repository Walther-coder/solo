const express = require('express');

const renderTemplate = require('../lib/renderTemplate');
const Home = require('./views/pages/Home');

const router = express.Router();

router.get('/', async (req, res) => {
  const { login } = req.session;
  renderTemplate(Home, { login }, res);
});

// router.get('/logout', (req, res) => {
//   console.log('Вышли в logout');
//   req.session.destroy(() => {
//     res.clearCookie('JustCookie');
//     res.redirect('/');
//   });
// });

module.exports = router;
