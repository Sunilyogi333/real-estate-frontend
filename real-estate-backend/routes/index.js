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
  res.json({
    Status: "Success",
    message: "Authorized",
    success: true,
    userId: req.userId,
  });
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
          return res.json({
            message: "Login success",
            success: true,
            token,
            user,
          });
        } else {
          return res.json({ Error: "Password incorrect" });
        }
      }
    );
  });
});

router.post(
  "/addProperty",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    const image1 = req.files["image1"][0].filename;
    const image2 = req.files["image2"][0].filename;
    const image3 = req.files["image3"][0].filename;

    console.log("images path");
    console.log(image1);
    console.log(image2);
    console.log(image3);
    console.log("body:", req.body);
    console.log("file:", req.files);

    var userId = req.body.userId;
    var propertyName = req.body.propertyName;
    var location = req.body.location;
    var propertyType = req.body.propertyType;
    var bedrooms = req.body.bedrooms;
    var bathrooms = req.body.bathrooms;
    var kitchen = req.body.kitchen;
    var price = req.body.price;
    var yearBuilt = req.body.yearBuilt;
    var size = req.body.size;
    var parking = req.body.parking;
    var garden = req.body.garden;
    var fireplace = req.body.fireplace;
    var cooling = req.body.cooling;
    var heating = req.body.heating;
    var laundry = req.body.laundry;
    var date = req.body.date;
    var description = "hello";

    con.beginTransaction(function (err) {
      if (err) {
        return res.json({ Error: "Error starting transaction" });
      }

      var propertySql =
        "INSERT INTO property(userId, propertyName, location, propertyType, bedrooms, bathrooms, kitchen, price, yearBuilt, size, parking, garden, fireplace, cooling, heating, laundry, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var propertyValues = [
        userId,
        propertyName,
        location,
        propertyType,
        bedrooms,
        bathrooms,
        kitchen,
        price,
        yearBuilt,
        size,
        parking,
        garden,
        fireplace,
        cooling,
        heating,
        laundry,
        description,
      ];

      con.query(
        propertySql,
        [
          userId,
          propertyName,
          location,
          propertyType,
          bedrooms,
          bathrooms,
          kitchen,
          price,
          yearBuilt,
          size,
          parking,
          garden,
          fireplace,
          cooling,
          heating,
          laundry,
          description,
        ],
        function (err, propertyResult) {
          console.log("propertyValues: ", propertyValues);
          console.log("propertyResult: ", propertyResult);
          if (err) {
            return con.rollback(function () {
              return res.json({ Error: "Error inserting property data" });
            });
          }

          var propertyId = propertyResult.insertId;
          var imagesSql =
            "INSERT INTO propertyImages (propertyId, image1, image2, image3) VALUES (?, ?, ?, ?)";
          var imagesValues = [propertyId, image1, image2, image3];

          con.query(imagesSql, imagesValues, function (err, imagesResult) {
            if (err) {
              return con.rollback(function () {
                return res.json({ Error: "Error inserting property images" });
              });
            }

            // Commit the transaction if everything is successful
            con.commit(function (err) {
              if (err) {
                return con.rollback(function () {
                  return res.json({ Error: "Error committing transaction" });
                });
              }

              return res.json({
                message: "Property successfully added",
                success: true,
              });
            });
          });
        }
      );
    });
  }
);

module.exports = router;
