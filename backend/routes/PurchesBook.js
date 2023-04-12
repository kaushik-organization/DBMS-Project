const router = require("express").Router();
const database = require("../database");

router.post('/PurchesBook' , async (req , res) => {
    const conn = await database.connectionStart();
    const {book_id , user_id , quantity} = req.fields;
    const [[Available]] = await conn.query(`select quantity as Available from Sales where book_id = '${book_id}'`);

    if(!Available) return res.sendStatus(501);
    if(Available.Available < quantity) return res.status(409).send("Not Available");

    let [status] = await conn.query(`update Sales set quantity = quantity - ${quantity} , books_sold = books_sold + ${quantity} where book_id = '${book_id}'`); 
    const basket_id = user_id.replace('USER' , 'BASK');

    const [[{count}]] = await conn.query(`select count(book_id) as count from Basket_Books where book_id = '${book_id}' and basket_id='${basket_id}'`)
   
    if(count) [status] = await conn.query(`update Basket_Books set count = count + ${quantity} where book_id = '${book_id}' and basket_id='${basket_id}'`); 
    else [status] = await conn.query(`insert into Basket_Books values ('${basket_id}' , '${book_id}' , ${quantity})`)
    
    conn.end();
    res.sendStatus(200);
})

module.exports = router;