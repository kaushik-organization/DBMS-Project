const router = require("express").Router();
const database = require("../../database");
const ObjectsToCsv = require("objects-to-csv");

router.get("/get-csv", async (req, res) => {
  try {
    const conn = await database.connectionStart();
    const query =
      "select Books.book_id, Books.title, GROUP_CONCAT(Genre.name SEPARATOR ',') as genres, Books.rating as likes from Books_Genre join Books on Books_Genre.book_id = Books.book_id join Genre on Books_Genre.genre_id = Genre.genre_id group by Books.book_id;";
    const [rows] = await conn.query(query);
    if (!rows[0]) {
      return res.status(200).json({ message: `Couldn't find the table` });
    }
    console.log(rows);
    const csv = new ObjectsToCsv(rows);
    await csv.toDisk("demo.csv");
    database.connectionEnd(conn);
    return res.status(200).download("demo.csv", "demo.csv");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
