const router = require("express").Router();
const jwt = require("jsonwebtoken");
const database = require("../../database");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is invalid" });
      } else {
        req.name = decoded.name;
        req.profile_pic = decoded.profile_pic;
        next();
      }
    });
  }
};

router.get("/verify-user", verifyUser, (req, res) => {
  return res.json({
    Status: "success",
    name: req.name,
    profile_pic: req.profile_pic,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "success" });
});

module.exports = router;
