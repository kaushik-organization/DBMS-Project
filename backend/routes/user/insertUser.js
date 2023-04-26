const router = require("express").Router();
const database = require("../../database");
const cd = require("./../../config/cloudinary");
const formidable = require("express-formidable");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(formidable());
const salt = 10;

router.post("/register", async (req, res) => {
  try {
    const { email, name, contact_no, address, password } = req.fields;
    const { profile_pic } = req.files;
    let hashPassword = await bcrypt.hash(password.toString(), salt);

    // console.log(req.fields, req.files, hashPassword);

    if (!name || !email) return res.sendStatus(501);

    const conn = await database.connectionStart();
    const [[count]] = await conn.query(
      `select count(user_id) as count from User`
    );
    let user_id = "USER0001";
    let bask_id = "BASK0001";
    if (count.count != 0) {
      const [[data]] = await conn.query(`select max(user_id) as id from User`);
      let num = parseInt(data.id.substring(4, 8));
      num = num + 1;
      while (num.length != 4) num = "0" + num;
      user_id = "USER" + num;
      bask_id = "BASK" + num;
    }
    const res_cd = await cd.uploader.upload(profile_pic.path, {
      public_id: "multiple/DBMS/User" + user_id,
    });
    const profile_pic_url = res_cd.secure_url;
    await conn.query(
      `insert into User values (${JSON.stringify(user_id)} , ${JSON.stringify(
        email
      )} , ${JSON.stringify(name)} , ${JSON.stringify(
        profile_pic_url
      )} , ${JSON.stringify(address)} , ${JSON.stringify(
        contact_no
      )} , ${JSON.stringify(bask_id)}, ${JSON.stringify(hashPassword)});`
    );
    database.connectionEnd(conn);
    return res.status(201).send({ Status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const conn = await database.connectionStart();
    const { email, password } = req.fields;
    console.log(email, password);
    const sql = "SELECT * from User where email = ?";
    const rows = await conn.query(sql, [email]);
    if (!rows[0].length) {
      return res.status(200).json({ message: "No such email found" });
    }
    let check;
    bcrypt.compare(password.toString(), rows[0][0].password, (err, same) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: "Internal Server Error" });
      }
      if (same) {
        const user_id = rows[0][0].user_id;
        const name = rows[0][0].name;
        const profile_pic = rows[0][0].profile_pic;
        const basket_id = rows[0][0].basket_id;
        const token = jwt.sign(
          { user_id, name, profile_pic, basket_id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token, { sameSite: "none" });
        return res.status(200).json({ Status: "success" });
      } else {
        database.connectionEnd(conn);
        return res.status(200).json({ Error: "Wrong Password" });
      }
    });
    // return res.status(200).json({ Error: "Wrong Password" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
