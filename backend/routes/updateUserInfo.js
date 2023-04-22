const router = require("express").Router();
const database = require("../database");
const cd = require("./../config/cloudinary");
router.post("/updateUserInfo", async (req, res) => {
    const {user_id , name , address , contact_no  } = req.fields;
    const { profile_pic } = req.files;

    const conn = await database.connectionStart();

    const res_cd = await cd.uploader.upload(profile_pic.path, {
        public_id: "multiple/DBMS/User" + user_id,
      });
    const profile_pic_url = res_cd.secure_url;
    
    await conn.query(`update User set name = '${name}' , profile_pic = '${profile_pic_url}' , address = '${address}' , contact_no = '${contact_no}' where user_id = '${user_id}'`);      

    conn.end();

    res.sendStatus(201);
});
module.exports = router;