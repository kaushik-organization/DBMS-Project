const router = require("express").Router();
const database = require("../database");

router.post("/AddToCart", async (req, res) => {
  const conn = await database.connectionStart();
  let { book_id, user_id, quantity } = req.fields;
  if (!quantity) quantity = 1;

  const [[Available]] = await conn.query(
    `select quantity as Available from Sales where book_id = '${book_id}'`
  );

  if (!Available || Available.Available < quantity)  return res.status(209).send("Not Available");

  const basket_id = user_id.replace("USER", "BASK");

  const [[{ count }]] = await conn.query(
    `select count(book_id) as count from Basket_Books where book_id = '${book_id}' and basket_id='${basket_id}'`
  );

  if (count)
    await conn.query(
      `update Basket_Books set count = count + ${quantity} where book_id = '${book_id}' and basket_id='${basket_id}'`
    );
  else
    await conn.query(
      `insert into Basket_Books values ('${basket_id}' , '${book_id}' , ${quantity})`
    );

  conn.end();
  res.sendStatus(200);
});

router.post("/removeToCart", async (req, res) => {
  const conn = await database.connectionStart();
  let { book_id, user_id, quantity } = req.fields;
  if (!quantity) quantity = 1;
  const basket_id = user_id.replace("USER", "BASK");
  const [[Available]] = await conn.query(
    `select count as Available from Basket_Books where basket_id='${basket_id}' and book_id = '${book_id}'`
  );

  if (!Available) return res.sendStatus(501);
  if (Available.Available < quantity)
    return res.status(202).send("Not Available");

  if (Available.Available == quantity) {
    conn.query(
      `delete from Basket_Books where basket_id='${basket_id}' and book_id = '${book_id}'`
    );
  } else
    conn.query(
      `update Basket_Books set count = count - ${quantity} where book_id = '${book_id}' and basket_id='${basket_id}'`
    );

  conn.end();
  res.sendStatus(200);
});

module.exports = router;
