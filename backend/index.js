require("dotenv").config();
const app = require("express")();

// const app = express();
app.use('/api' , require('./routes/main'));

app.listen(process.env.PORT, () => {
  console.log("Conected successfully to ", process.env.PORT);
});
