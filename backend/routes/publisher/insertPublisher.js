const router = require("express").Router();
const database = require("../../database");

router.post("/", async (req, res) => {
  try {
    const { name, contact_no, address } = req.body;
    if (!name) return res.status(501).send("");
    const conn = await database.connectionStart();
    let id = "PUBL0001";
    const [[count]] = await conn.query(
      `select count(publisher_id) as count from Publisher`
    );
    if (count.count != 0) {
      const [[data]] = await conn.query(
        `select max(publisher_id) as id from Publisher`
      );
      let num = parseInt(data.id.substring(4, 8));
      num = num + 1;
      while (num.length != 4) num = "0" + num;
      id = "PUBL" + num;
    }
    conn.query(
      `insert into Publisher values (${JSON.stringify(id)} , ${JSON.stringify(
        name
      )} , ${JSON.stringify(contact_no)} , ${JSON.stringify(address)});`
    );
    database.connectionEnd(conn);
    res.status(201).send({ id: id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
