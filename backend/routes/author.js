const router = require('express').Router();
const connectionStart = require('./database')
const formidable = require('express-formidable');

router.use(formidable())

router.get('/', async (req, res) => {
    const connection = await connectionStart();
    const [data] = await connection.promise().query(`SELECT * FROM Author`);

    connection.end();
    res.status(200).json(data);
})

router.put('/', async (req, res) => {
    const { name, about, gender, country } = req.fields;

    if(!name) return res.status(501).send('');

    const connection = await connectionStart();
    const [[data]] = await connection.promise().query(`select count(Author_id) as count from Author`);
    let num = (data.count + 1).toString();
    while (num.length != 4) num = '0' + num;
    const id = 'AUTH' + num;
    connection.promise().query(`insert into Author values ('${id}' , '${name}' , '${about}' , '${gender}' , '${country}');`)
    connection.end();
    res.status(201).send('');
})

router.delete('/id', async (req, res) => {
    const connection = await connectionStart();
    const {id} = req.fields; 
    connection.promise().query(`delete from Author where author_id='${id}'`);
    connection.end();
    res.status(202).send('');
})

router.delete('/name', async (req, res) => {
    const connection = await connectionStart();
    const {name} = req.fields; 
    connection.promise().query(`delete from Author where name='${name}'`);
    connection.end();
    res.status(202).send('');
})

module.exports = router;