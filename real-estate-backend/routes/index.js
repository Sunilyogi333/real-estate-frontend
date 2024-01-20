var express = require("express");
var router = express.Router();
var con = require("./connection");
const cors = require("cors");
const upload = require("./multer");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const salt = 10;

router.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

router.use(express.json());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not Authorized" });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not valid" });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};

router.get("/", verifyUser, (req, res, next) => {
  res.json({Status:"Success", message: "Authorized", success: true, userId: req.userId });
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
    bycrypt.compare(
      req.body.password.toString(),
      result[0].password,
      (err, passwordMatch) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (passwordMatch) {
          const userId = result[0].userId;
          const name = result[0].username;
          const user = { userId, name };
          const token = jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
          res.cookie("token", token);
          return res.json({ message: "Login success", success: true, token, user });
        } else {
          return res.json({ Error: "Password incorrect" });
        }
      }
    );
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout success' });
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
