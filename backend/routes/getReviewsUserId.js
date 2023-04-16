const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());

router.get("/reviews-UserId/:UserId", async (req, res) => {
  try {
    const user_id = req.params.UserId;
    const conn = await database.connectionStart();
    const query = `select b.*, r.user_id,r.rating,r.comment from Reviews as r join Books as b on b.book_id = r.book_id where r.user_id = '${user_id}';`;
    const [rows] = await conn.query(query);
    database.connectionEnd(conn);
    return res.status(200).send({ message: "Everything is ok!", data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
