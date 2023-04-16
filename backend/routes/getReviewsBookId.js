const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());

router.get("/reviews-BookId/:BookId", async (req, res) => {
  try {
    const book_id = req.params.BookId;
    const conn = await database.connectionStart();
    const query = `select u.*,r.book_id,r.rating,r.comment from ((Reviews as r join Books as b on b.book_id = r.book_id) join User as u on r.user_id = u.user_id) where r.book_id = '${book_id}';`;
    const [rows] = await conn.query(query);

    database.connectionEnd(conn);
    return res.status(200).send({ message: "Everything is ok!", data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
