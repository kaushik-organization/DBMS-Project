const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());

router.post("/prices-range", async (req, res) => {
  try {
    let { Range } = req.fields;
    Range = JSON.parse(Range);
    // console.log(Range);
    // console.log(typeof(Range));
    // console.log(Range[0]);
    const conn = await database.connectionStart();
    // const dummy = req.params.bookSubstring;
    const query = `select * from Books where price >= ${Range[0]} AND price <= ${Range[1]};`;
    const [rows] = await conn.query(query);
    if (!rows[0]) {
      return res.status(204).json({ message: `No books found` });
    }
    database.connectionEnd(conn);
    return res.status(200).send({ message: "Everything is ok!", data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
