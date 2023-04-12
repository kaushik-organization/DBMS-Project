const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());
//calculating total price assuming all price are in same currency;
router.get("/booksInbasket/:basketId",async(req,res)=>{
    try{
        const conn = await database.connectionStart();
        const basket_id = req.params.basketId;
        // console.log(basket_id);
        const query = `select b.*,bb.count from Books as b inner join Basket_Books as bb on b.book_id = bb.book_id where bb.basket_id = '${basket_id}'`;
        const query1 = `SELECT SUM(b.price * bb.count) AS total_cost
        FROM Books as b
        INNER JOIN Basket_Books as bb ON b.book_id = bb.book_id
        WHERE bb.basket_id = '${basket_id}';`
        const [rows] = await conn.query(query);
        const [[count]] = await conn.query(query1);
        if (!rows[0]) {
          return res.status(400).json({ message: `Couldn't find the table` });
        }
        // console.log(count.total_cost);
        database.connectionEnd(conn);
        return res.status(200).send({ message: "Everything is ok!",data:rows,totalCost:count.total_cost });
    //    console.log(req.params);
    //    return res.status(200).json({message:"Everything is ok!"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "Internal server error"});
    }
})
module.exports = router;