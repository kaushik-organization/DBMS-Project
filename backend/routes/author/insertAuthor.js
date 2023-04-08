const router = require("express").Router();
const database = require("../../database");
const formidable = require('express-formidable');
router.use(formidable());

router.put("/", async (req, res) => {
    const { name, about, gender, country } = req.fields;    
    if(!name) return res.status(501).send('');
    const conn = await database.connectionStart();
    const [[data]] = await conn.query(`select count(Author_id) as count from Author`);
    let num = (data.count + 1).toString();
    while (num.length != 4) num = '0' + num;
    const id = 'AUTH' + num;
    conn.query(`insert into Author values ('${id}' , '${name}' , '${about}' , '${gender}' , '${country}');`)
    database.connectionEnd(conn);
    res.status(201).send('');
});

module.exports = router;