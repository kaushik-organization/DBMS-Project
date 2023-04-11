const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());

router.get("/books-avaliable",async(req,res)=>{
    try {
        const conn = await database.connectionStart();
        const query = `select * from Books left join Sales on Books.book_id = Sales.book_id where Sales.quantity>0;`;
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
})
module.exports = router;