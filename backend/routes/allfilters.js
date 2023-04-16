const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());

router.post("/filter", async (req, res) => {
  try {
    const conn = await database.connectionStart();

    let { priceRange, ratingRange, search, sortByPrice, sortByRating } =
      req.fields;

    let query;

    if (sortByPrice) sortByPrice = parseInt(sortByPrice);
    if (sortByRating) sortByRating = parseInt(sortByRating);

    if (!search || search === "null") search = "";
    if (!priceRange) priceRange = JSON.stringify([0, 999999999]);
    if (!ratingRange) ratingRange = JSON.stringify([0, 100]);

    if (priceRange && ratingRange && sortByPrice) {
      priceRange = JSON.parse(priceRange);
      ratingRange = JSON.parse(ratingRange);
      query = `select *, (price - (discount*price/100)) as discount_price from Books where (title like '%${search}%' or description like '%${search}%') and ((price - (discount*price/100)) >= ${priceRange[0]} and (price - (discount*price/100)) <= ${priceRange[1]}) and (rating >= ${ratingRange[0]} and rating <= ${ratingRange[1]}) order by discount_price`;
    } else if (priceRange && ratingRange && sortByRating) {
      priceRange = JSON.parse(priceRange);
      ratingRange = JSON.parse(ratingRange);
      query = `select *, (price - (discount*price/100)) as discount_price from Books where (title like '%${search}%' or description like '%${search}%') and ((price - (discount*price/100)) >= ${priceRange[0]} and (price - (discount*price/100)) <= ${priceRange[1]}) and (rating >= ${ratingRange[0]} and rating <= ${ratingRange[1]}) order by rating`;
    } else {
      priceRange = JSON.parse(priceRange);
      ratingRange = JSON.parse(ratingRange);
      query = `select *, (price - (discount*price/100)) as discount_price from Books where (title like '%${search}%' or description like '%${search}%') and ((price - (discount*price/100)) >= ${priceRange[0]} and (price - (discount*price/100)) <= ${priceRange[1]}) and (rating >= ${ratingRange[0]} and rating <= ${ratingRange[1]})`;
    }

    const [rows] = await conn.query(query);

    if (!rows[0]) {
      return res.status(204).json({ message: `No books found` });
    }
    database.connectionEnd(conn);
    return res.status(200).send({ message: "Everything is ok!", data: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
