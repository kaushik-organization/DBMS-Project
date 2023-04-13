const router = require("express").Router();
const database = require("../database");

router.post('/' , async (req , res) => {
    const conn = await database.connectionStart();
    const {basket_id} = req.fields;
    const [books] = await conn.query(`select book_id , count as quantity from Basket_Books where basket_id = '${basket_id}'`);

    if(books.length == 0) return res.status(501).send("Not any book");

    for(let i=0 ; i<books.length ; i++){
        let [[Available]] = await conn.query(`select quantity as Available from Sales where book_id = '${books[i].book_id}'`);
        if(!Available) return res.sendStatus(501);
        if(Available.Available < books[i].quantity) return res.status(409).send({"book_id" : books[i].book_id , "Available":Available.Available}); 
    }
    

    const user_id = basket_id.replace('BASK' , 'USER');
    const [[max_n]] = await conn.query(`select max(order_id) as max_n from Orders`);

    let order_id = 'ORDE0001';
    if(max_n.max_n) {
        let num = parseInt(max_n.max_n.substring(4, 8));
        num = num + 1;
        while (num.length != 4) num = "0" + num;
        order_id = "ORDE" + num;
    }

    let [status] = await conn.query(`insert into Orders (order_id , user_id) values ('${order_id}' , '${user_id}')`)
    let total = 0;
    for(let i=0 ; i<books.length ; i++){
        [status] = await conn.query(`update Sales set quantity = quantity - ${books[i].quantity} , books_sold = books_sold + ${books[i].quantity} where book_id = '${books[i].book_id}'`);
        let [[{price}]] = await conn.query(`select price from Books where book_id = '${books[i].book_id}'`);
        [status] = await conn.query(`insert into Orders_Books values ('${order_id}' , '${books[i].book_id}' , '${books[i].quantity}' , ${price})`);
        total += price * books[i].quantity;
    }

    [status] = await conn.query(`delete from Basket_Books where basket_id = '${basket_id}'`);

    conn.end();
    res.status(200).send({"total" : total});
})

module.exports = router;