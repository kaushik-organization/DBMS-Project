require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
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

app.use("/" , require("./routes/AddToCart"))
app.use("/", require("./routes/avaliableBooks"));
app.use("/", require("./routes/bookQuantity"));
app.use("/", require("./routes/commonAuthors"));
app.use("/", require("./routes/booksInBasketandPrice"));

// app.use("/",require("./routes/priceInBasket"));

app.use("/",require("./routes/searchBook"));
app.use("/",require("./routes/sortPrice"))
app.use("/",require("./routes/sortRating"));
app.use("/",require("./routes/pricesInRange"));
app.use("/",require("./routes/ratingInRange"));
app.use("/",require("./routes/searchBookName"));
app.use("/", require("./routes/books/fetchBookId"));
app.use("/", require("./routes/books/getBooksId"));
app.use("/" , require('./routes/orderHistory'))
app.use("/addReviews" , require('./routes/addReviews'));
app.use("/purchaseBasket" , require("./routes/purchaseBasket"))
app.use("/",require("./routes/sortwithDiscount"));
app.use("/",require("./routes/clearBasketByUserId"));
app.use("/",require("./routes/getReviewsBookId"))
app.use("/",require("./routes/getReviewsUserId"))
app.listen(process.env.PORT, () => {
  console.log("Conected successfully to ", process.env.PORT);
});
