const router = require("express").Router();
const database = require("../../database");

router.get("/user", async (req, res) => {
    const conn = await database.connectionStart();
    const [data] = await conn.query(`select * from User`);
    database.connectionEnd(conn);
    return res.status(200).json(data);
});

router.use("/user" , require('./insertUser'));

router.use("/user" , require('./deleteUser'));

module.exports = router;