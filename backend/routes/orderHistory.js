const router = require("express").Router();
const database = require("../database");

router.post("/orderHistory", async (req, res) => {
  const conn = await database.connectionStart();
  const { user_id } = req.fields;

  const [orders] = await conn.query(
    `select order_id , Date from Orders where user_id = '${user_id}'`
  );
  conn.end();
  res.status(200).send(orders);
});

router.post("/orderDetails", async (req, res) => {
  const conn = await database.connectionStart();
  const { order_id } = req.fields;

  const [details] = await conn.query(
    `select Orders_Books.order_id, Books.description, Orders_Books.book_id, Books.title, Books.image, Orders_Books.Quantity, Orders_Books.Price from Orders_Books join Books where Books.book_id = Orders_Books.book_id and Orders_Books.order_id = '${order_id}'`
  );
  conn.end();
  res.status(200).send(details);
});

module.exports = router;
