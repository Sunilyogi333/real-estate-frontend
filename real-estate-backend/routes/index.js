var express = require("express");
var router = express.Router();
var con = require("./connection");
const cors = require("cors");
const upload = require("./multer");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const e = require("express");
const { parse } = require("uuid");
const secretKey = "secretKey";
const salt = 10;
const dotenv = require("dotenv");
dotenv.config();

console.log("name",process.env.name);

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);

router.use(express.static("public"));

router.use(express.json());
router.use(cookieParser());


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "Unauthorized", status: false });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not valid", status: false });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
};



router.get("/verify", verifyUser, (req, res) => {
  return res.json({
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
  console.log("req.body: ", req.body);
  // Check if the email is already in use
  const checkEmailQuery = "SELECT COUNT(userId) AS count FROM users WHERE email = ?";
  con.query(checkEmailQuery, [req.body.email], function (err, result) {
    if (err) {
      return res.json({ Error: "Error checking email existence" });
    }

    // If email already exists, return an error
    if (result[0].count > 0) {
      return res.json({ Error: "Email already in use" });
    }

    // Email is not in use, proceed with hashing the password and inserting the user
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error hashing password" });
      const values = [req.body.name, req.body.email, hash];
      const insertUserQuery = "INSERT INTO users (username, email, password) VALUES (?)";
      con.query(insertUserQuery, [values], function (err, result) {
        if (err) return res.json({ Error: "Error inserting data" });
        return res.json({ message: "User successfully registered", success: true });
      });
    });
  });
});

// router.post("/signup", function (req, res) {
//   bycrypt.hash(req.body.password.toString(), salt, (err, hash) => {
//     if (err) return res.json({ Error: "Error for hassing password" });
//     const values = [req.body.name, req.body.email, hash];
//     const sql = "INSERT INTO users (username, email, password) VALUES (?)";
//     con.query(sql, [values], function (err, result) {
//       if (err) return res.json({ Error: "Error for inserting data" });
//       return res.json({ message: "User succesfully registerd", success: true });
//     });
//   });
// }); 

//login
router.post("/login", function (req, res) {
  const sql = "SELECT * FROM users WHERE email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (result.length === 0) return res.json({ accountError: "User not found" });
    bcrypt.compare(req.body.password.toString(), result[0].password, (err, passwordMatch) => {
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
          return res.json({ passwordError: "incorrect password" });
        }
      });
  });
});

router.post("/adminLogin", function (req, res) {
  const adminEmail = req.body.adminEmail;
  const adminPassword = req.body.adminPassword;
  console.log("req.body: ", req.body);
  console.log("adminEmail: ", adminEmail);
  console.log("adminPassword: ", adminPassword);
  const sql = "SELECT * FROM admin WHERE adminEmail = ? AND adminPassword = ?";
  con.query(sql, [adminEmail, adminPassword], (err, result) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (result.length === 0) return res.json({ accountError: "Admin not found" });
    res.json({
      message: "Login success",
      success: true,
    });
  });
});

router.get("/getAdmin/:id", (req, res) => {
  const id = req.params.id;
  console.log("req.params: ", req.params);
  console.log("id: ", id);

  const sql = `SELECT adminName FROM admin WHERE adminId = ?`;

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching admin details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(result[0]); // Assuming you only expect one admin
  });
});

router.get("/getUserProfile/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("req.params: ", userId);

  const sql = `SELECT * FROM users WHERE userId = ?`;

  con.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user details:", err);
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
  const profilePicture = req.file ? req.file.filename : req.body.profilePicture;
  const username = req.body.username;
  // const date_of_birth = req.body.date_of_birth === "" ? null : req.body.date_of_birth;
  if(req.body.date_of_birth === null){
    date_of_birth = null;
  }else{
    date_of_birth = req.body.date_of_birth;
  }
  const phoneNumber = req.body.phoneNumber === "" ? null : req.body.phoneNumber;
  // const date_of_birth = req.body.date_of_birth === null ? req.body.date_of_birth : null;
  // const phoneNumber = req.body.phoneNumber === null ? req.body.phoneNumber : null ;
  // if(req.body.phoneNumber === null){
  //   phoneNumber = null;
  // }else if(req.body.phoneNumber === undefined){
  //   phoneNumber = null;
  // }
  // else if(req.body.phoneNumber=== ""){
  //   phoneNumber = null;
  // }
  // {
  //   phoneNumber = req.body.phoneNumber;
  // }



  console.log('phpneNumber: ', phoneNumber);

  const sql = `UPDATE users SET profilePicture = '${profilePicture}', username = '${username}', phoneNumber = ${phoneNumber}, date_of_birth = '${date_of_birth}' WHERE userId = ?`;

  con.query(
    sql,[userId],
    (err, result) => {
      if (err) {
        console.error("Error updating user profile:", err);
        return res.json({ error: "Internal Server Error" });
      }

      res.json({ message: "Profile updated successfully", success: true });
    }
  );
});


router.post(
  "/kycForm",
  upload.fields([
    { name: "userPhoto", maxCount: 1 },
    { name: "CFPhoto", maxCount: 1 },
    { name: "CBPhoto", maxCount: 1 },
  ]),
  (req, res) => {
    const userPhoto = req.files["userPhoto"][0].filename;
    const CFPhoto = req.files["CFPhoto"][0].filename;
    const CBPhoto = req.files["CBPhoto"][0].filename;

    var uID = req.body.uID;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var date_of_birth = req.body.date_of_birth;
    var phoneNumber = req.body.phoneNumber;
    var provision = req.body.provision;
    var district = req.body.district;
    var municipality = req.body.municipality;
    var village = req.body.village;

    var sql =
      "INSERT INTO kycForm (uID, firstName, lastName, date_of_birth,  phoneNumber, provision, district, municipality, village, userPhoto, CFPhoto, CBPhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var values = [uID, firstName, lastName, date_of_birth, phoneNumber, provision, district, municipality, village, userPhoto, CFPhoto, CBPhoto];
    console.log("values: ", values);
    con.query(sql, values, function (err, result) {
      if (err) {
        return res.json({ Error: "Error inserting kycForm data" });
      }
      const sqlUpdateVerified = `UPDATE users SET verification = ? WHERE userId = ?`;

      con.query(sqlUpdateVerified, ['Pending', uID], (err, resultVerified) => {
        if (err) {
          console.error("Error updating verified:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
      return res.json({ message: "kycForm successfully added", success: true });
    });
  })

router.get("/getkycForm", (req, res) => {
  const sql = `SELECT * FROM kycForm where verification = 'Pending'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching kycForm:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(result);
  });
});

router.get("/getkycForm/:id", (req, res) => {
  console.log("req.params: ", req.params);
  const id = req.params.id;
  // console.log("req.params: ", req.params);
  console.log("id: ", id);

  const sql = `SELECT * FROM kycForm WHERE id = ?`;

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching kycForm details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "kycForm not found" });
    }

    res.json(result[0]); // Assuming you only expect one kycForm
  });
});

router.post("/verifyKycForm/:id", (req, res) => {
  const id = req.params.id;
  console.log("req.params: ", req.params);
  console.log("id: ", id);

  const sql = `UPDATE kycForm SET verification = ? WHERE id = ?`;

  con.query(sql, ['Verified',id], (err, result) => {
    if (err) {
      console.error("Error verifying kycForm:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    //now if sql is success then we have to update the user table and set the profilePicture, phoneNumber, date_of_birth if they are null so first check the user table and then update the user table 
    const sql = `SELECT * FROM kycForm WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error fetching kycForm details:", err);
        return res.json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.json({ error: "kycForm not found" });
      }
      const userId = result[0].uID;
      const sqlUser = `SELECT * FROM users WHERE userId = ?`;

      con.query(sqlUser, [userId], (err, resultUser) => {
        if (err) {
          console.error("Error fetching user details:", err);
          return res.json({ error: "Internal Server Error" });
        }

        if (resultUser.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        const profilePicture = resultUser[0].profilePicture;
        const phoneNumber = resultUser[0].phoneNumber;
        const verified = resultUser[0].verified;
        const date_of_birth = resultUser[0].date_of_birth;

        const sqlUpdateVerified = `UPDATE users SET verification = ? WHERE userId = ?`;

          con.query(sqlUpdateVerified, ['Verified', userId], (err, resultVerified) => {
            if (err) {
              console.error("Error updating verified:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });

        if (profilePicture === null) {
          const sqlUpdatePicture = `UPDATE users SET profilePicture = ? WHERE userId = ?`;

          con.query(sqlUpdatePicture, [result[0].userPhoto, userId], (err, resultPicture) => {
            if (err) {
              console.error("Error updating profilePicture:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }
        if (phoneNumber === null) {
          const sqlUpdatePhoneNumber = `UPDATE users SET phoneNumber = ? WHERE userId = ?`;

          con.query(sqlUpdatePhoneNumber, [result[0].phoneNumber, userId], (err, resultPhoneNumber) => {
            if (err) {
              console.error("Error updating phoneNumber:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }
          

        if (date_of_birth === null) {
          const sqlUpdateDateOfBirth = `UPDATE users SET date_of_birth = ? WHERE userId = ?`;

          con.query(sqlUpdateDateOfBirth, [result[0].date_of_birth, userId], (err, resultDateOfBirth) => {
            if (err) {
              console.error("Error updating date_of_birth:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }
      });
    });
    res.json({ message: "kycForm verified successfully", success: true });
  });
});


router.post("/rejectKycForm/:id", (req, res) => {
  const id = req.params.id;
  console.log("req.params: ", req.params);
  console.log("id: ", id);

  const sql = `UPDATE kycForm SET verification = 'Rejected' WHERE id = ?`;

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error rejecting kycForm:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    //get uID from kycForm and then update the user table and set the verification to rejected
    const getSql = `SELECT * FROM kycForm WHERE id = ?`;
    con.query(getSql, [id], (err, result) => {
      if (err) {
        console.error("Error fetching kycForm details:", err);
        return res.json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        return res.json({ error: "kycForm not found" });
      }
      const userId = result[0].uID;
      const sqlUpdateVerified = `UPDATE users SET verification = ? WHERE userId = ?`;

      con.query(sqlUpdateVerified, ['Rejected', userId], (err, resultVerified) => {
        if (err) {
          console.error("Error updating verified:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      });
    });

    res.json({ message: "kycForm rejected successfully", success: true });
  });
});

router.get("/checkVerify/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("req.params: ", userId);

  const sql = `SELECT verification FROM kycForm WHERE uID = ?`;

  con.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching kycForm:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.json({ error: "User not found" });
    }
    const message = result[0].verification;
    res.json({ message });
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

    var userId = req.body.userId;
    var propertyName = req.body.propertyName;
    var provision = req.body.provision;
    var district = req.body.district;
    var municipality = req.body.municipality;
    var village = req.body.village;
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
        "INSERT INTO property(userId, propertyName, provision, district, municipality, village, propertyType, bedrooms, bathrooms, kitchen, price, yearBuilt, size, parking, garden, fireplace, cooling, heating, laundry, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      var propertyValues = [userId, propertyName, provision, district, municipality, village, propertyType, bedrooms, bathrooms, kitchen, price, yearBuilt, size, parking, garden, fireplace, cooling, heating, laundry, description];

      con.query(
        propertySql, propertyValues, function (err, propertyResult) {
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

router.get("/getProperty/:id", (req, res) => {
  console.log("req.params: ", req.params);
  const propertyId = req.params.id;
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
    WHERE property.userId = ?
    ORDER BY property.propertyId DESC;
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

// router.post("/updateProperty",upload.fields([
//   { name: "image1", maxCount: 1 },
//   { name: "image2", maxCount: 1 },
//   { name: "image3", maxCount: 1 },
// ]), (req, res) => {
//   console.log("req.body: ", req.body); 
//   console.log("req.file: ", req.file);
//   const propertyId = req.body.propertyId;
//   const image1 = req.files["image1"][0].filename;
//   const image2 = req.files["image2"][0].filename;
//   const image3 = req.files["image3"][0].filename;
//   const propertyName = req.body.propertyName;
//   const location = req.body.location;
//   const propertyType = req.body.propertyType;
//   const bedrooms = req.body.bedrooms;
//   const bathrooms = req.body.bathrooms;
//   const kitchen = req.body.kitchen;
//   const price = req.body.price;
//   const yearBuilt = req.body.yearBuilt;
//   const size = req.body.size;
//   const parking = req.body.parking;
//   const garden = req.body.garden;
//   const fireplace = req.body.fireplace;
//   const cooling = req.body.cooling;
//   const heating = req.body.heating;
//   const laundry = req.body.laundry;
//   const date = req.body.date;
//   const description = req.body.description;

//   console.log('propertyId: ', propertyId);

//   const sql = `UPDATE property SET propertyName = ?, location = ?, propertyType = ?, bedrooms = ?, bathrooms = ?, kitchen = ?, price = ?, yearBuilt = ?, size = ?, parking = ?, garden = ?, fireplace = ?, cooling = ?, heating = ?, laundry = ?, description = ? WHERE propertyId = ?`;

//   con.query(
//     sql,
//     [propertyName, location, propertyType, bedrooms, bathrooms, kitchen, price, yearBuilt, size, parking, garden, fireplace, cooling, heating, laundry, description, propertyId],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating property:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }

//       const imagesSql = `UPDATE propertyImages SET image1 = ?, image2 = ?, image3 = ? WHERE propertyId = ?`;

//       con.query(
//         imagesSql,
//         [image1, image2, image3, propertyId],
//         (err, result) => {
//           if (err) {
//             console.error("Error updating property images:", err);
//             return res.status(500).json({ error: "Internal Server Error" });
//           }

//           res.json({ message: "Property updated successfully", success: true });
//         }
//       );
//     }
//   );
// }
// );
router.post(
  "/updateProperty",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      propertyId,
      propertyName,
      provision,
      district,
      municipality,
      village,
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
      date,
      description,
      existingImage1,
      existingImage2,
      existingImage3,
    } = req.body;

    const image1 = req.files["image1"] ? req.files["image1"][0].filename : existingImage1;
    const image2 = req.files["image2"] ? req.files["image2"][0].filename : existingImage2;
    const image3 = req.files["image3"] ? req.files["image3"][0].filename : existingImage3;

    const sql = `UPDATE property SET propertyName = ?, provision = ?, district = ?, municipality = ?, village = ?, propertyType = ?, bedrooms = ?, bathrooms = ?, kitchen = ?, price = ?, yearBuilt = ?, size = ?, parking = ?, garden = ?, fireplace = ?, cooling = ?, heating = ?, laundry = ?, description = ? WHERE propertyId = ?`;

    con.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      con.query(
        sql,
        [
          propertyName,
          provision,
          district,
          municipality,
          village,
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
          propertyId,
        ],
        (err, result) => {
          if (err) {
            console.error("Error updating property:", err);
            con.rollback(() => {
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }

          const imagesSql = `UPDATE propertyImages SET image1 = ?, image2 = ?, image3 = ? WHERE propertyId = ?`;

          con.query(
            imagesSql,
            [image1, image2, image3, propertyId],
            (err, result) => {
              if (err) {
                console.error("Error updating property images:", err);
                con.rollback(() => {
                  res.status(500).json({ error: "Internal Server Error" });
                });
                return;
              }

              con.commit((err) => {
                if (err) {
                  console.error("Error committing transaction:", err);
                  con.rollback(() => {
                    res.status(500).json({ error: "Internal Server Error" });
                  });
                  return;
                }

                res.json({ message: "Property updated successfully", success: true });
              });
            }
          );
        }
      );
    });
  }
);

router.get("/agent/:agentId", (req, res) => {
  const agentId = req.params.agentId;
  console.log("req.params: ", req.params);
  console.log("agentId: ", agentId);

  //select all details of agent and count the properties of the agent

  const sql = `
  SELECT * FROM users 
  INNER JOIN property
  ON users.userId = property.userId
  INNER JOIN propertyImages 
  ON property.propertyId = propertyImages.propertyId
  WHERE users.userId = ?;
 `;
  con.query(sql, [agentId], (err, result) => {
    if (err) {
      console.error("Error fetching agent details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Agent not found" });
    }

    res.json(result); // Assuming you only expect one agent
  });
});

//select all and count the total number of users and set it to the variable totalUsersNumber, then total verified users and set it to the variable totalVerifiedUsers, then total number users in property table, then total listings and set it to the variable totalListings then combine them in one object and send it to the frontend

router.get("/getUsers", (req, res) => {
  const sql = `SELECT * FROM users`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalUsersNumber = result.length;

    const sqlVerified = `SELECT * FROM users WHERE verification = 'Verified'`;

    con.query(sqlVerified, (err, resultVerified) => {
      if (err) {
        console.error("Error fetching verified users:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const totalVerifiedUsers = resultVerified.length;

      const sqlProperties = `SELECT * FROM property`;

      con.query(sqlProperties, (err, resultProperties) => {
        if (err) {
          console.error("Error fetching properties:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const totalListings = resultProperties.length;

        //now count the total number of userId in property table and set it to the variable total sellers
        const sqlSellers = `SELECT COUNT(DISTINCT userId) AS count FROM property`;

        con.query(sqlSellers, (err, resultSellers) => {
          if (err) {
            console.error("Error fetching sellers:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          const totalSellers = resultSellers[0].count;

          const data = {
            totalUsersNumber,
            totalVerifiedUsers,
            totalSellers,
            totalListings,
          };

          res.json(data);
        });
      });
    });
  });
}
);

module.exports = router;
