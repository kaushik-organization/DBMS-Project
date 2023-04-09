const router = require("express").Router();
const database = require("../../database");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.sendStatus(501);
    const conn = await database.connectionStart();
    let id = "GENT0001";
    const [[count]] = await conn.query(
      `select count(genre_id) as conut from Genre`
    );
    if (count.count != 0) {
      const [[data]] = await conn.query(
        `select max(genre_id) as id from Genre`
      );
      let num = parseInt(data.id.substring(4, 8));
      num = num + 1;
      while (num.length != 4) num = "0" + num;
      id = "GENR" + num;
    }
    conn.query(
      `insert into Genre values (${JSON.stringify(id)}, ${JSON.stringify(
        name
      )});`
    );
    database.connectionEnd(conn);
    res.status(201).send({ id: id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
