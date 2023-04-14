// working.....
const router = require("express").Router();
const database = require("../database");

router.post('/' , async (req , res) => {
    const conn = await database.connectionStart();
    const {book_id , user_id , rating , comment} = req.fields;

    console.log(book_id , user_id , rating , comment);

    conn.end();
    res.status(200).send({"total" : total});
})

module.exports = router;