const router = require("express").Router();
const database = require("../../database");
const formidable = require('express-formidable');
router.use(formidable());

router.put("/", async (req, res) => {
    const { name, about, gender, country } = req.fields;    
    if(!name) return res.status(501).send('');
    const conn = await database.connectionStart();
    const [[data]] = await conn.query(`select max(Author_id) as id from Author`);
    let num = parseInt(data.id.substring(4,8)); 
    num = num + 1;
    while (num.length != 4) num = '0' + num;
    const id = 'AUTH' + num;
    console.log(id);
    conn.query(`insert into Author values ('${id}' , '${name}' , '${about}' , '${gender}' , '${country}');`)
    database.connectionEnd(conn);
    res.status(201).send({'id' : id});
});

module.exports = router;