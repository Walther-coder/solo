const entryRoutes = require('express').Router();

const {Entry} = require('../../db/models');
const Entries = require('../views/pages/Entries');
const renderTemplate = require('../lib/renderTemplate');

entryRoutes.get('/', async (req, res) =>  {
    const {login} = req.session;
    const entriesAll = await Entry.findAll();
    const result = entriesAll.map((el) => el.get({plain:true}));
    console.log('======>',result)
    renderTemplate(Entries, {login, entries: result}, res);

})

entryRoutes.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {text: Ntext, date: Ndate} = req.body;
    // console.log('=====>', Ntext, Ndate, id)
    try {
        const entry = await Entry.findByPk(id);

        entry.text = Ntext;
        entry.date = Ndate;
        await entry.save();
        console.log('eeeeeeeee', entry)
        res.json(entry);
        

    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ РЕДАКТИРОВАНИЯ ЗАПИСИ');
        res.status(500);
    }

})

module.exports = entryRoutes;