const router = require("express").Router();
const database = require("../../database");
const formidable = require("express-formidable");
router.use(formidable());

router.post("/get-books-id", async (req, res) => {
  try {
    const conn = await database.connectionStart();
    let { book_id } = req.fields;
    book_id = JSON.parse(book_id);
    const str = book_id.map((item) => `'${item}'`).join(", ");
    const query = `SELECT * FROM Books where book_id in (${str})`;
    const [rows] = await conn.query(query);
    if (!rows[0]) {
      return res.status(200).json({ message: `Couldn't find the table` });
    }
    database.connectionEnd(conn);
    return res.status(200).send({ message: "Everything is ok!", data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
