require("dotenv").config();
const express = require("express");
const app = express();
const database = require("./database");
// const conn = database.connectionStart();

// database.connectionEnd(conn);

app.listen(process.env.PORT, () => {
  console.log("Conected successfully to ", process.env.PORT);
});
