const router = require("express").Router();
const database = require("../../database");
const cd = require("./../../config/cloudinary");
const formidable = require("express-formidable");
router.use(formidable());

router.post("/add-books", async (req, res) => {
  try {
    const conn = await database.connectionStart();

    let { data } = req.fields;
    data = JSON.parse(data);
    const { image } = req.files;

    const res_cd = await cd.uploader.upload(image.path);
    data.image = res_cd.secure_url;
    // console.log(data);
    const query0 = "select book_id from Books order by book_id desc limit 1";
    const [rows] = await conn.query(query0);
    let book_id;
    if (!rows[0]) book_id = "BOOK0001";
    else {
      const toint = (parseInt(rows[0].book_id.substr(4), 10) + 1)
        .toString()
        .padStart(4, "0");
      book_id = "BOOK" + toint;
    }
    // console.log(book_id);

    const query1 = "insert into Books values (?, ?, ?, ?, ?, ?, ?, ?, 4.2)";
    await conn.query(query1, [
      book_id,
      data.title,
      data.description,
      data.publisher_id,
      data.release_data,
      data.price,
      data.discount,
      data.image,
    ]);

    const query2 = "insert into Books_Genre values ?";
    let values = [];
    for (let item of data.genres) {
      values.push([book_id, item.value]);
    }
    // console.log(values);
    await conn.query(query2, [values]);

    const query3 = "insert into Books_Author values ?";
    let values1 = [];
    for (let item of data.authors) {
      values1.push([book_id, item.value]);
    }
    await conn.query(query3, [values1]);

    database.connectionEnd(conn);
    return res.status(201).send({ message: "Everything is ok!", data: "rows" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
