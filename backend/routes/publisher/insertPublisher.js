const router = require("express").Router();
const database = require("../../database");
const formidable = require('express-formidable');
router.use(formidable());

router.put("/", async (req, res) => {
    const { name, contact_no, address} = req.fields;    
    if(!name) return res.status(501).send('');
    const conn = await database.connectionStart();
    const [[data]] = await conn.query(`select max(publisher_id) as id from Publisher`);
    let num = parseInt(data.id.substring(4,8)); 
    num = num + 1;
    while (num.length != 4) num = '0' + num;
    const id = 'PUBL' + num;
    console.log(id);
    conn.query(`insert into Publisher values ('${id}' , '${name}' , '${contact_no}' , '${address}');`)
    database.connectionEnd(conn);
    res.status(201).send({'id' : id});
});

module.exports = router;