const router = require("express").Router();
const database = require("../database");

router.post('/addReviews' , async (req , res) => {
    const conn = await database.connectionStart();
    let {book_id , user_id , rating , comment} = req.fields;

    const [[{count}]] = await conn.query(`select count(A.order_id) as count from (select order_id from Orders_Books where book_id = '${book_id}') A inner join (select order_id from Orders where user_id = '${user_id}') B on A.order_id = B.order_id`)
    
    if(count == 0) return res.sendStatus(401)

    const [data] = await conn.query(`select * from Reviews where user_id = '${user_id}' and book_id = '${book_id}'`);

    if(!comment && data[0] && data[0].comment) comment = data[0].comment;
    else if(!comment) comment = null;
    if(!data.length) await conn.query(`insert into Reviews values ('${user_id}' , '${book_id}' , ${rating} , '${comment}')`);
    else await conn.query(`update Reviews set rating = ${rating} , comment = '${comment}' where user_id = '${user_id}' and book_id = '${book_id}'`)
    
    await conn.query(`update Books set rating = (select avg(rating) from Reviews where book_id = '${book_id}')  where book_id = '${book_id}'`)

    conn.end();
    res.sendStatus(200);
})

module.exports = router;


router.post('/updateAllRating' , async (req , res) => {

    const conn = await database.connectionStart();
    await conn.query(`update Books set rating = (select avg(rating) from Reviews A where A.book_id = Books.book_id) `);

    conn.end();
    res.sendStatus(200);
})
/*
    select count(A.order_id) as count from (select order_id from Orders_Books where book_id = 'BOOK0003') A inner join (select order_id from Orders where user_id = 'USER0003') B on A.order_id = B.order_id;

    DELIMITER $$
USE `learning`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `rating_calulate`(book varchar(8)) RETURNS float(3,2)
BEGIN
	DECLARE Result float(3,2);
    SELECT AVG(rating) from Orders_Books INTO Result;
    RETURN Result;
END$$

DELIMITER ;
;
//

USE `bookstore-dbms`;
DROP function IF EXISTS `rating_cal`;

DELIMITER $$
USE `bookstore-dbms`$$
CREATE FUNCTION `rating_cal` (book varchar(8))
RETURNS float(3,2)
BEGIN
declare result float(3,2);
select avg(rating) from Orders_Books where book_id = `'${book}'` into result;
RETURN result;
END$$

DELIMITER ;

/-----------------------------------------------------------------------------------------------------------------------------

USE `dumi`;
DROP function IF EXISTS `Func_Calculate_Rating`;

USE `learning`;
DROP function IF EXISTS `learning`.`Func_Calculate_Rating`;
;

DELIMITER $$
USE `learning`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `Func_Calculate_Rating`(book varchar(8)) RETURNS float(3,2)
BEGIN
	DECLARE result float;
	select avg(rating) into result from Orders_Rating where book_id = `'${book}'`;
RETURN result;
END$$

DELIMITER ;
;
    */
