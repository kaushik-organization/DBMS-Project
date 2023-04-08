require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/main"));

const getAuthor = require("./routes/author/getAuthor");
app.use("/", getAuthor);

const getBooks = require("./routes/books/getBooks");
app.use("/", getBooks);

const getPublisher = require("./routes/publisher/getPublisher");
app.use("/", getPublisher);

const getGenre = require("./routes/genre/getGenre");
app.use("/", getGenre);

const getBooksAuthor = require("./routes/books-author/getBooksAuthor");
app.use("/", getBooksAuthor);

const getBooksGenre = require("./routes/books-genre/getBooksGenre");
app.use("/", getBooksGenre);

app.listen(process.env.PORT, () => {
  console.log("Conected successfully to ", process.env.PORT);
});
