const router = require("express").Router();
const database = require("../../database");

router.get("/book/:id", async (req, res) => {
  try {
    const conn = await database.connectionStart();
    if (!req.params.id) {
      return res.status(404).json({ message: "Couldn't find a book" });
    }
    const query = `select Books.book_id, Books.title, Books.description, Books.publisher_id, Books.release_data, Books.price, Books.discount, Books.image, Books.rating, GROUP_CONCAT(Genre.name SEPARATOR ',') as genres, Books.rating as likes from Books_Genre join Books on Books_Genre.book_id = Books.book_id and Books.book_id = ? join Genre on Books_Genre.genre_id = Genre.genre_id group by Books.book_id;`;
    const [rows] = await conn.query(query, [req.params.id]);
    if (!rows[0]) {
      return res.status(200).json({ message: `Couldn't find a book` });
    }
    database.connectionEnd(conn);
    return res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.use("/", require("./Q_2"));
router.use("/", require("./Q_1"));

module.exports = router;
