const router = require("express").Router();
const database = require("../database");

router.post('/' , async (req , res) => {
    const conn = await database.connectionStart();
    const {basket_id} = req.fields;
    const [books] = await conn.query(`select book_id , count as quantity from Basket_Books where basket_id = '${basket_id}'`);
    console.log(books);

    for(let i=0 ; i<books.length ; i++){
        let [[Available]] = await conn.query(`select quantity as Available from Sales where book_id = '${books[i].book_id}'`);
        if(!Available) return res.sendStatus(501);
        if(Available.Available < books[i].quantity) return res.status(409).send({"Status" : "Not Available", "book_id" : books[i].book_id});
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
    console.log(max_n , order_id , user_id);

    let [status] = await conn.query(`insert into Orders (order_id , user_id) values ('${order_id}' , '${user_id}')`)

    for(let i=0 ; i<books.length ; i++){
        [status] = await conn.query(`update Sales set quantity = quantity - ${books[i].quantity} , books_sold = books_sold + ${books[i].quantity} where book_id = '${books[i].book_id}'`)
    }

    // const [[Available]] = await conn.query(`select quantity as Available from Sales where book_id = '${book_id}'`);

    // if(!Available) return res.sendStatus(501);
    // if(Available.Available < quantity) return res.status(409).send("Not Available");

    // // let [status] = await conn.query(`update Sales set quantity = quantity - ${quantity} , books_sold = books_sold + ${quantity} where book_id = '${book_id}'`); 

    // const [[{count}]] = await conn.query(`select count(book_id) as count from Basket_Books where book_id = '${book_id}' and basket_id='${basket_id}'`)
   
    // if(count) [status] = await conn.query(`update Basket_Books set count = count + ${quantity} where book_id = '${book_id}' and basket_id='${basket_id}'`); 
    // else [status] = await conn.query(`insert into Basket_Books values ('${basket_id}' , '${book_id}' , ${quantity})`)
    
    conn.end();
    res.sendStatus(200);
})

module.exports = router;