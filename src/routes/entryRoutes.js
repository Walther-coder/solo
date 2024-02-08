const entryRoutes = require('express').Router();

const {Entry} = require('../../db/models');
const {User} = require('../../db/models');
const Entries = require('../views/pages/Entries');
const renderTemplate = require('../lib/renderTemplate');

// entryRoutes.get('/', async (req, res) =>  {
//     const {login} = req.session;
//     renderTemplate(Entries, {login}, res);

// })

entryRoutes.get('/', async (req, res) =>  {
    const {login, userId} = req.session;
    const entriesAll = await Entry.findAll({where: {user_id: userId}});
    const result = entriesAll.map((el) => el.get({plain:true}));
    // console.log('======>',result)
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
        res.json(entry);
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ РЕДАКТИРОВАНИЯ ЗАПИСИ');
        res.status(500);
    }
})

entryRoutes.patch('/:id', async (req, res) => {
    const {login} = req.session;
    const {id} = req.params;
    try {
        const entry = await Entry.findByPk(id);
        const newStatusEntry = await entry.update({status: !entry.status});
        res.json(newStatusEntry); 
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ ИЗМЕНЕНИЯ СТАТУСА');
        res.status(500);
    }
})

entryRoutes.post('/', async (req, res) => {
    const {login} = req.session;
    const { userId } = req.session;
    const {text:newText, date:newDate} = req.body;
    try {
        const newEntry = await Entry.create({text:newText, status:false, date:newDate, user_id: userId})
        const entry = newEntry.get({plain: true});
        res.json(entry);
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ СОЗДАНИЯ ЗАПИСИ');
        res.sendStatus(400);
    }
})

entryRoutes.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const {userId} = req.session;
    const {login} = req.session;
    try {
        const reqEntry = await Entry.findByPk(id);
        console.log('=======>user_id',reqEntry.user_id)
        if(reqEntry.user_id === userId){
            await Entry.destroy({where: {id}});
            const newEntriesAll = await Entry.findAll({where: {user_id: userId}});
            const newList = newEntriesAll.map((el) => el.get({plain: true}));
            res.json({msg: 'в труху!',newList});
        } else {
            res.json({err:'ты попутал!'})
        }
    } catch (error) {
        console.log(error, 'ОШИБКА В РУЧКЕ УДАЛЕНИЯ');
        res.status(400);
    }
})

module.exports = entryRoutes;