require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/", require("./routes/author/getAuthor"));
app.use("/", require("./routes/books/getBooks"));
app.use("/", require("./routes/books/fetchCSV"));
app.use("/", require("./routes/publisher/getPublisher"));
app.use("/", require("./routes/genre/getGenre"));
app.use("/", require("./routes/books-author/getBooksAuthor"));
app.use("/", require("./routes/books-genre/getBooksGenre"));
app.use("/", require("./routes/user/getUser"));
app.use("/", require("./routes/books/addBooks"));
app.use("/", require("./routes/user/verify-user"));
app.use("/",require("./routes/avaliableBooks"));
app.use("/",require("./routes/bookQuantity"));
app.use("/",require("./routes/commonAuthors"));
app.listen(process.env.PORT, () => {
  console.log("Conected successfully to ", process.env.PORT);
});
