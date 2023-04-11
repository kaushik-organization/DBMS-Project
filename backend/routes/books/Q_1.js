const router = require("express").Router();
const database = require("../../database");    
/*
    PART 1 =>   select A.book_id , B.book_id , C.book_id from 
    PART 2 =>       ((select * from Books where price <= 300 and Publisher_id in ('PUBL0001' , 'PUBL0002')) A 
    PART 3 =>       INNER JOIN 
    PART 4 =>       (select book_id from Books_Author where Author_id in ('AUTH0001' , 'AUTH0002')) B 
    PART 5 =>       ON A.book_id = B.book_id ) INNER JOIN
    PART 6 =>       (select DISTINCT book_id from Books_Genre where genre_id in ('GENR0001' , 'GENR0002' , 'GENR0003')) C
    PART 7 =>       ON A.book_id = C.book_id
    
    select A.book_id from (select * from Books where price <= 400) A JOIN (select * from Books_Author) B on A.book_id = B.book_id JOIN (select DISTINCT book_id from Books_Genre where genre_id in ('GENR0001' , 'GENR0002' , 'GENR0003')) C on A.book_id = C.book_id ;

*/

router.post("/books/select", async (req, res) => {
    const conn = await database.connectionStart();    
    let  genre = req.fields.genre
    let author = req.fields.author;
    let price = req.fields.price;
    let publisher = req.fields.publisher;
    
    if(!price){ [[x]] = await conn.query(`select MAX(price) as price from Books`); price = x.price;}

    let str_publ = '';
    let str_author = '';
    let str_genre = '';
    
    if(publisher && publisher.length) for(let i=0 ; i<publisher.length ; i++){if(str_publ.length) str_publ += ","; str_publ += "'" + publisher[i] + "' ";}   
    if(author && author.length) for(let i=0 ; i<author.length ; i++){if(str_author.length) str_author += ","; str_author += "'" + author[i] + "' ";}   
    if(genre && genre.length) for(let i=0 ; i<genre.length ; i++){if(str_genre.length) str_genre += ","; str_genre += "'" + genre[i] + "' ";}
    


    let sub_part_1 = `true`;
    let sub_part_2 = `true`;
    let sub_part_3 = `true`;

    if(str_publ) sub_part_1 = `Publisher_id in ( ${str_publ} )`;
    if(str_author) sub_part_2 = `Author_id in ( ${str_author} )`;
    if(str_genre) sub_part_3 = `genre_id in ( ${str_genre} ) `;

    let part1 = `select A.book_id , B.book_id from `;
    let part2 =   `(select * from Books where price <= ${price} and ${sub_part_1} ) A `;
    let part3 =   `INNER JOIN `
    let part4 =   `(select book_id from Books_Author where ${sub_part_2}) B `
    let part5 =   `ON A.book_id = B.book_id INNER JOIN `;
    let part6 =   `(select DISTINCT book_id from Books_Genre where  ${sub_part_3}) C `;
    let part7 =   `ON A.book_id = C.book_id `;
    let query = part1 + part2 + part3 + part4 + part5 + part6 + part7;

    // let query = `select * from Books where price <= ${price}`;
   
    // console.log(query);
    const [rows] = await conn.query(query);
    conn.end();
    res.status(200).send(rows);
});

module.exports = router;