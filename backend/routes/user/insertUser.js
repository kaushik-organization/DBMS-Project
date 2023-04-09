const router = require("express").Router();
const database = require("../../database");
const cd = require('./../../config/cloudinary');
const formidable = require('express-formidable');
router.use(formidable());

  

router.put("/", async (req, res) => {
    const { email, name, contact_no, address } = req.fields;
    const { profile_pic } = req.files;

    if (!name || !email) return res.sendStatus(501);

    const conn = await database.connectionStart();
    const [[count]] = await conn.query(`select count(user_id) as count from User`);
    let user_id = 'USER0001';
    let bask_id = 'BASK0001';
    if (count.count != 0) {
        const [[data]] = await conn.query(`select max(user_id) as id from User`);
        let num = parseInt(data.id.substring(4, 8));
        num = num + 1;
        while (num.length != 4) num = '0' + num;
        user_id = 'USER' + num;
        bask_id = 'BASK' + num;
    }
    const res_cd = await cd.uploader.upload(profile_pic.path , {public_id : "multiple/DBMS/User" + user_id});
    const profile_pic_url = res_cd.secure_url;
    conn.query(`insert into User values ('${user_id}' , '${email}' , '${name}' , '${profile_pic_url}' , '${address}' , '${contact_no}' , '${bask_id}');`)
    database.connectionEnd(conn);
    res.status(201).send({'id' : user_id});
});

module.exports = router;