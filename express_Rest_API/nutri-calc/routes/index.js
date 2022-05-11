const { json } = require("express");
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

router.post("/recipes", function (req, res) {
  console.log("req body: ", req.body);
  var query = "";
  for (var i = 0; i < req.body.ingredients.length; i++) {
    var obj = req.body.ingredients[i];
    console.log("ingredient " + i + " " + req.body.ingredients[i].name);
    query +=
      req.body.ingredients[i].qty +
      " " +
      req.body.ingredients[i].unit +
      " " +
      req.body.ingredients[i].name +
      " ";
  }
  console.log("query", query);

  const request = require("request");
  request.get(
    {
      url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
      headers: {
        "X-Api-Key": "66bZo5YIpvKhFpDZBZGEXg==DFUYD4LespAwZPwk",
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else console.log(body);
      console.log("done");
    }
  );
});

module.exports = router;
