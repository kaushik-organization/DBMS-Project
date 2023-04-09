require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/author/getAuthor"));
app.use("/", require("./routes/books/getBooks"));
app.use("/", require("./routes/publisher/getPublisher"));
app.use("/", require("./routes/genre/getGenre"));
app.use("/", require("./routes/books-author/getBooksAuthor"));
app.use("/", require("./routes/books-genre/getBooksGenre"));
app.use("/", require("./routes/user/getUser"));
app.use("/", require("./routes/books/addBooks"));

app.listen(process.env.PORT, () => {
  console.log("Conected successfully to ", process.env.PORT);
});
