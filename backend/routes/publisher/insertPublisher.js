const router = require("express").Router();
const database = require("../../database");
const formidable = require('express-formidable');
router.use(formidable());

router.put("/", async (req, res) => {
    const { name, contact_no, address } = req.fields;
    if (!name) return res.status(501).send('');
    const conn = await database.connectionStart();
    let id = 'PUBL0001';
    const [[count]] = await conn.query(`select count(publisher_id) as count from Publisher`);
    if (count.count != 0) {
        const [[data]] = await conn.query(`select max(publisher_id) as id from Publisher`);
        let num = parseInt(data.id.substring(4, 8));
        num = num + 1;
        while (num.length != 4) num = '0' + num;
        id = 'PUBL' + num;
    }
    conn.query(`insert into Publisher values ('${id}' , '${name}' , '${contact_no}' , '${address}');`)
    database.connectionEnd(conn);
    res.status(201).send({ 'id': id });
});

module.exports = router;