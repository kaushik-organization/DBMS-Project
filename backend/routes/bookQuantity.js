const router = require("express").Router();
const database = require("../database");
const formidable = require("express-formidable");
router.use(formidable());
router.post("/books-quantity",async(req,res)=>{
    
})
module.exports = router;