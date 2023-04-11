const router = require("express").Router();
const ExpressFormidable = require("express-formidable");
const database = require("../../database");

router.use(ExpressFormidable());

router.get("/books/sorted", async (req, res) => {
    const conn = await database.connectionStart();
    const { rating } = req.fields;
    const [rows] = await conn.query(`select * from Books where rating >= ${rating}`);
    conn.end();
    res.status(200).send(rows);
});

module.exports = router;