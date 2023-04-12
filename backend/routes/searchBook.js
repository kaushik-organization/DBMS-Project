const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());

router.get("/search-books/:bookSubstring",async(req,res)=>{
    try {
        const conn = await database.connectionStart();
        const dummy = req.params.bookSubstring;
        const query = `select * from Books where title like '%${dummy}%';`;
        const [rows] = await conn.query(query);
        if (!rows[0]) {
          return res.status(400).json({ message: `Couldn't find the table` });
        }
        database.connectionEnd(conn);
        return res.status(200).send({ message: "Everything is ok!", data: rows });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
})
module.exports = router;