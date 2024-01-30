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
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

router.use(express.static("public"));

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


router.get("/getUserProfile/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("req.params: ", userId);

  const sql = `SELECT * FROM users WHERE userId = ?`;

  con.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result[0]); // Assuming you only expect one user
  });
});

router.put("/updateProfile",upload.single('profilePicture'), (req, res) => {
  console.log("req.body: ", req.body); 
  console.log("req.file: ", req.file);
  const userId = req.body.userId;
  const profilePicture = req.file.filename;
  const username = req.body.username;
  const numberOfListings = req.body.numberOfListings;
  const date_of_birth = req.body.date_of_birth;
  // const age = req.body.age;
  // const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  console.log('phpneNumber: ', phoneNumber);

  const sql = `UPDATE users SET profilePicture = ?, username = ?, phoneNumber = ?, date_of_birth=? WHERE userId = ?`;

  con.query(
    sql,
    [profilePicture, username, phoneNumber, date_of_birth, userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user profile:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ message: "Profile updated successfully", success: true });
    }
  );
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
    var description = req.body.description;

    con.beginTransaction(function (err) {
      if (err) {
        return res.json({ Error: "Error starting transaction" });
      }

      var propertySql =
        "INSERT INTO property(userId, propertyName, location, propertyType, bedrooms, bathrooms, kitchen, price, yearBuilt, size, parking, garden, fireplace, cooling, heating, laundry, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var propertyValues = [userId,propertyName,location,propertyType,bedrooms,bathrooms,kitchen,price,yearBuilt,size,parking,garden,fireplace,cooling,heating,laundry,description];

      con.query(
        propertySql,propertyValues,function (err, propertyResult) {
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

            // Commit the transaction if everything is successfull
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

router.get("/getProperties", (req, res) => {
  const sql = `
   SELECT * FROM users 
   INNER JOIN property
   ON users.userId = property.userId
   INNER JOIN propertyImages 
   ON property.propertyId = propertyImages.propertyId;

  `;

  con.query(sql, (err, result) => {
    console.log("result: ", result);
    if (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(result);
  });
});

router.get("/getProperty/:description", (req, res) => {
  const propertyId = req.params.description;
  console.log("req.params: ", req.params);
  console.log("propertyId: ", propertyId);

  const sql = `
    SELECT * FROM users 
    INNER JOIN property
    ON users.userId = property.userId
    INNER JOIN propertyImages 
    ON property.propertyId = propertyImages.propertyId
    WHERE property.propertyId = ?;
  `;

  con.query(sql, [propertyId], (err, result) => {
    if (err) {
      console.error("Error fetching property details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(result[0]); // Assuming you only expect one property
  });
});

router.get("/getMyProperties/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("req.params: ", userId);

  const sql = `
    SELECT * FROM users 
    INNER JOIN property
    ON users.userId = property.userId
    INNER JOIN propertyImages 
    ON property.propertyId = propertyImages.propertyId
    WHERE property.userId = ?;
  `;

  con.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching properties:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(result);
  });
});

// Add route to handle property deletion
router.delete("/deleteProperty/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;

  // Begin transaction
  con.beginTransaction(function (err) {
    if (err) {
      return res.json({ Error: "Error starting transaction" });
    }

    // Delete related images first
    const deleteImagesSql = "DELETE FROM propertyImages WHERE propertyId = ?";
    con.query(deleteImagesSql, [propertyId], function (err, imagesResult) {
      if (err) {
        return con.rollback(function () {
          return res.json({ Error: "Error deleting property images" });
        });
      }

      // Delete the property after deleting images
      const deletePropertySql = "DELETE FROM property WHERE propertyId = ?";
      con.query(deletePropertySql, [propertyId], function (err, propertyResult) {
        if (err) {
          return con.rollback(function () {
            return res.json({ Error: "Error deleting property" });
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
            message: "Property successfully deleted",
            success: true,
          });
        });
      });
    });
  });
});

// Add route to handle property update

router.put("/updateProperty",upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]), (req, res) => {
  console.log("req.body: ", req.body); 
  console.log("req.file: ", req.file);
  const propertyId = req.body.propertyId;
  const image1 = req.files["image1"][0].filename;
  const image2 = req.files["image2"][0].filename;
  const image3 = req.files["image3"][0].filename;
  const propertyName = req.body.propertyName;
  const location = req.body.location;
  const propertyType = req.body.propertyType;
  const bedrooms = req.body.bedrooms;
  const bathrooms = req.body.bathrooms;
  const kitchen = req.body.kitchen;
  const price = req.body.price;
  const yearBuilt = req.body.yearBuilt;
  const size = req.body.size;
  const parking = req.body.parking;
  const garden = req.body.garden;
  const fireplace = req.body.fireplace;
  const cooling = req.body.cooling;
  const heating = req.body.heating;
  const laundry = req.body.laundry;
  const date = req.body.date;
  const description = req.body.description;

  console.log('propertyId: ', propertyId);

  const sql = `UPDATE property SET propertyName = ?, location = ?, propertyType = ?, bedrooms = ?, bathrooms = ?, kitchen = ?, price = ?, yearBuilt = ?, size = ?, parking = ?, garden = ?, fireplace = ?, cooling = ?, heating = ?, laundry = ?, description = ? WHERE propertyId = ?`;

  con.query(
    sql,
    [propertyName, location, propertyType, bedrooms, bathrooms, kitchen, price, yearBuilt, size, parking, garden, fireplace, cooling, heating, laundry, description, propertyId],
    (err, result) => {
      if (err) {
        console.error("Error updating property:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const imagesSql = `UPDATE propertyImages SET image1 = ?, image2 = ?, image3 = ? WHERE propertyId = ?`;

      con.query(
        imagesSql,
        [image1, image2, image3, propertyId],
        (err, result) => {
          if (err) {
            console.error("Error updating property images:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          res.json({ message: "Property updated successfully", success: true });
        }
      );
    }
  );
}
);


module.exports = router;
