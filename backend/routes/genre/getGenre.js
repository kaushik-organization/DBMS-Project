const router = require("express").Router();
const database = require("../../database");

router.get("/get-genre", async (req, res) => {
  try {
    const conn = await database.connectionStart();
    const query = `SELECT * FROM Genre`;
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
  
router.use('/genre' , require('./insertGenre'));
router.use('/genre' , require('./deleteGenre'));

module.exports = router;
