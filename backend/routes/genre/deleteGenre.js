const router = require("express").Router();
const database = require("../../database");
const formidable = require('express-formidable');
router.use(formidable());

router.delete('/id', async (req, res) => {
    const connection = await database.connectionStart();
    const {id} = req.fields; 
    connection.query(`delete from Genre where genre_id='${id}'`);
    connection.end();
    res.sendStatus(202);
})

router.delete('/name', async (req, res) => {
    const connection = await database.connectionStart();
    const {name} = req.fields; 
    connection.query(`delete from Genre where name='${name}'`);
    connection.end();
    res.sendStatus(202);
})

module.exports = router;
