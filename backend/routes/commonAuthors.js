const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());
router.post("/common-author",async(req,res)=>{
    try{
       const {BOOKID} = req.fields
    //    console.log(BOOKID.length);
       const str = BOOKID.join(',');
    //    console.log(str);
       const conn = await database.connectionStart();
       const query = `select Author.author_id , Author.name 
       From Author
       JOIN Books_Author ON Author.author_id = Books_Author.author_id
       where Books_Author.book_id IN (${str})
       group by Author.author_id
       having count(distinct Books_Author.book_id) = ${BOOKID.length};`
       const [rows] = await conn.query(query);
       if (!rows[0]) {
        return res.status(200).json({ message: `Couldn't find the table` });
       }
       database.connectionEnd(conn);
       return res.status(200).send({ message: "Everything is ok!", data: rows });
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal Server Error"});
    }
})
module.exports = router;