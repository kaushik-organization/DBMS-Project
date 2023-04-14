const router = require("express").Router();
const database = require("../database");

router.post('/orderHistory' , async (req , res) => {
    const conn = await database.connectionStart();
    const {user_id} = req.fields;

    const [orders] = await conn.query(`select order_id , Date from Orders where user_id = '${user_id}'`);

    console.log(orders);

    conn.end();
    res.status(200).send(orders);
})

router.use('/orderDetails' , async (req , res) => {
    const conn = await database.connectionStart();
    const {order_id} = req.fields;

    const [details] = await conn.query(`select book_id , Quantity , Price from Orders_Books where order_id = '${order_id}'`);

    console.log(details);

    conn.end();
    res.status(200).send(details);
})

module.exports = router;