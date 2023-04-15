const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());
router.post('/clearBasket' , async (req , res) => {
    try{
    const conn = await database.connectionStart();
    const {user_id} = req.fields;
    console.log(user_id);
    const query = `
    DELETE FROM Basket_Books
    WHERE basket_id IN (
      SELECT basket_id
      FROM User
      WHERE user_id = '${user_id}'
    );`
    // const [orders] = await conn.query(`select order_id , Date from Orders where user_id = '${user_id}'`);
    await conn.query(query);
    // console.log(orders);

    conn.end();
    res.status(200).json({message:"Everything is ok! , Basket deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server Error"});
    }
})
module.exports = router;
