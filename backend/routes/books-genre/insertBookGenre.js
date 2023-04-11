const router = require("express").Router();
const database = require("../../database");
router.post("/insert-book-genre",async(req,res)=>{
    const {BookId,genreId} = req.body();
    if(!BookId) res.status(500).send("BookId is not specified");
    if(!genreId) res.status(500).send("Book genre is not specified");
    const conn = await database.connectionStart();
    const [[count]] = await conn.query(
        `select count(book_id) as count from Books where book_id = ${BookId}`
      );
    const [[count1]] = await conn.query(
        `select count(genre_id) as count from Genre where genre_id = ${genreId}`
    )
    if(count.count==0 || count1.count==0){
        res.status(500).send("Book not fount or genre not found check book or genre table");
    }
    else {
        await conn.query(
            `insert into  values ( ${JSON.stringify(
              BookId
            )} , ${JSON.stringify(about)} , ${JSON.stringify(
              genreId
            )};`
          );
    }
})
module.exports = router;