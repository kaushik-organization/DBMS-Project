const router = require("express").Router();
const database = require("../database");
const cd = require("./../config/cloudinary");
router.post("/getUserInfo", async (req, res) => {
  const { userId } = req.fields;

  const conn = await database.connectionStart();
  const [data] = await conn.query(
    `select email, name, profile_pic, address, contact_no from User where user_id='${userId}'`
  );
  database.connectionEnd(conn);
  return res.status(200).json(data);
});
module.exports = router;
