const router = require("express").Router();
const database = require("../../database");
const formidable = require('express-formidable');
router.use(formidable());

router.delete('/id', async (req, res) => {
    const connection = await database.connectionStart();
    const {id} = req.fields; 
    connection.query(`delete from Publisher where publisher_id='${id}'`);
    connection.end();
    res.status(202).send('');
})

router.delete('/name', async (req, res) => {
    const connection = await database.connectionStart();
    const {name} = req.fields; 
    connection.query(`delete from Publisher where name='${name}'`);
    connection.end();
    res.status(202).send('');
})

module.exports = router;
