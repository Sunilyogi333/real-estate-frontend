var express = require("express");
var router = express.Router();
var con = require("./connection");
const cors = require("cors");
const upload = require("./multer");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const salt = 10;

router.use(cors());
router.use(express.json());

const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.userId = decoded.userId;
    next();
  });
};

router.get("/", verifyJwt, function (req, res, next) {
  res.json({ message: "Authorized", success: true });
});

router.get("/get", function (req, res) {
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//signup
router.post("/signup", function (req, res) {
  bycrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hassing password" });
    const values = [req.body.name, req.body.email, hash];
    const sql = "INSERT INTO users (username, email, password) VALUES (?)";
    con.query(sql, [values], function (err, result) {
      if (err) return res.json({ Error: "Error for inserting data" });
      return res.json({ message: "User succesfully registerd", success: true });
    });
  });
});

//login
router.post("/login", function (req, res) {
  const sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (result.length === 0) return res.json({ Error: "User not found" });
    bycrypt.compare(req.body.password.toString(),result[0].password,(err, passwordMatch) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (passwordMatch) {
          const userId = result[0].userId;
          const token = jwt.sign({ userId }, secretKey);
          return res.json({ message: "Login success", success: true, token });
        } else {
          return res.json({ Error: "Password incorrect" });
        }
      }
    );
  });
});

//add Properties
//Property table includes, name, location,price, bedrooms, bathrooms, squareArea, date, type, yearBuilt, city
router.post("/addProperty", function (req, res) {
  var userId = req.body.userId;
  var name = req.body.name;
  var location = req.body.location;
  var price = req.body.price;
  var bedrooms = req.body.bedrooms;
  var bathrooms = req.body.bathrooms;
  var squareArea = req.body.squareArea;
  var date = req.body.date;
  var type = req.body.type;
  var yearBuilt = req.body.yearBuilt;
  var city = req.body.city;
  var sql =
    "INSERT INTO property (name, location, price, bedrooms, bathrooms, squareArea, date, type, yearBuilt, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  console.log("🚀 ~ sql:", sql);
  con.query(
    sql,
    [
      userId,
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      squareArea,
      date,
      type,
      yearBuilt,
      city,
    ],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res
        .status(200)
        .json({ message: "Property successfully added", success: true });
    }
  );
});

module.exports = router;
