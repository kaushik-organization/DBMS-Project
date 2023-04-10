const router = require("express").Router();
const database = require("../../database");
const cd = require("./../../config/cloudinary");
const formidable = require("express-formidable");
router.use(formidable());

router.post("/", async (req, res) => {
  try {
    const { name, about, gender, country } = req.fields;
    const { image } = req.files;

    if (!name) return res.status(501).send("");
    const conn = await database.connectionStart();

    const res_cd = await cd.uploader.upload(image.path);
    let imagelink = res_cd.secure_url;
    // console.log(imagelink);

    const [[count]] = await conn.query(
      `select count(Author_id) as count from Author`
    );
    let id = "AUTH0001";
    if (count.count != 0) {
      const [[data]] = await conn.query(
        `select max(Author_id) as id from Author`
      );
      let num = parseInt(data.id.substring(4, 8));
      num = num + 1;
      while (num.length != 4) num = "0" + num;
      id = "AUTH" + num;
    }
    await conn.query(
      `insert into Author values (${JSON.stringify(id)} , ${JSON.stringify(
        name
      )} , ${JSON.stringify(about)} , ${JSON.stringify(
        gender
      )} , ${JSON.stringify(country)}, ${JSON.stringify(imagelink)});`
    );
    database.connectionEnd(conn);
    res.status(201).send({ id: "id" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
