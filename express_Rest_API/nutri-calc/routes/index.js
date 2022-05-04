var express = require("express");
var router = express.Router();
var fooddata = require("../recipes.json");

console.log(fooddata);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
  // res.json(fooddata);
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/user/:id", function (req, res) {
  res.json(fooddata);
  console.log("request object", req);
  console.log("request params", req.params);
});

router.get("/vegetables", function (req, res) {
  res.render("veg", { name: "bobs nutrition" });
});

router.get("/vegdata", function (req, res) {
  res.json(fooddata);
});

module.exports = router;
