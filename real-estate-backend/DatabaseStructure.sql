/* database */
CREATE DATABASE serenity;

/* tables */
/* users */
CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phoneNumber INT,
    date_of_birth DATE,
    profilePicture VARCHAR(255),
    verification ENUM('Pending', 'Verified', 'Rejected')
);

/* property */
CREATE TABLE property (
    propertyId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    propertyName VARCHAR(255),
    provision VARCHAR(255), 
    district VARCHAR(255), 
    municipality VARCHAR(255), 
    village VARCHAR(255), 
    propertyType ENUM('commercial', 'residential'),
    bedrooms INT,
    bathrooms INT,
    kitchen INT,
    price INT,
    yearBuilt INT,
    size INT,
    parking ENUM('available', 'not-available', 'unspecified'),
    garden ENUM('available', 'not-available', 'unspecified'),
    fireplace ENUM('available', 'not-available', 'unspecified'),
    cooling ENUM('room-air-conditioner', 'ductless-system', 'fans', 'unspecified'),
    heating ENUM('forced-air', 'electric-space-heating', 'fireplace', 'unspecified'),
    laundry ENUM('available', 'not-available', 'unspecified'),
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT userId FOREIGN KEY(userId) REFERENCES users(userId)
);
/* propertyImages */
CREATE TABLE propertyImages (
    propertyImageId INT PRIMARY KEY AUTO_INCREMENT,
    propertyId INT,
    image1 VARCHAR(255),
    image2 VARCHAR(255),
    image3 VARCHAR(255),
    CONSTRAINT propertyId FOREIGN KEY(propertyId) REFERENCES property(propertyId)
);

-- admin
CREATE TABLE admin(
adminId int PRIMARY KEY AUTO_INCREMENT,
adminName varchar (125),
adminEmail varchar (125),
adminPassword varchar(125)
);

-- kyc verification
CREATE TABLE kycForm ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    uID INT, firstName VARCHAR(255), 
    lastName VARCHAR(255), 
    date_of_birth DATE, 
    phoneNumber INT, 
    provision VARCHAR(255), 
    district VARCHAR(255), 
    municipality VARCHAR(255), 
    village VARCHAR(255), 
    userPhoto varchar(225), 
    CFPhoto varchar(255), 
    CBPhoto varchar(255), 
    verification ENUM('Pending', 'Verifed', 'Rejected') DEFAULT 'Pending', 
    CONSTRAINT uID FOREIGN KEY(uID) REFERENCES users(userId)
);

CREATE TABLE property (
    propertyId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    propertyName VARCHAR(255),
    provision VARCHAR(255), 
    district VARCHAR(255), 
    municipality VARCHAR(255), 
    village VARCHAR(255), 
    propertyType ENUM('commercial', 'residential'),
    bedrooms INT,
    bathrooms INT,
    kitchen INT,
    price INT,
    yearBuilt INT,
    size INT,
    parking ENUM('available', 'not-available', 'unspecified'),
    garden ENUM('available', 'not-available', 'unspecified'),
    fireplace ENUM('available', 'not-available', 'unspecified'),
    cooling ENUM('room-air-conditioner', 'ductless-system', 'fans', 'unspecified'),
    heating ENUM('forced-air', 'electric-space-heating', 'fireplace', 'unspecified'),
    laundry ENUM('available', 'not-available', 'unspecified'),
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT userId FOREIGN KEY(userId) REFERENCES users(userId)
);
/* propertyImages */
CREATE TABLE propertyImages (
    propertyImageId INT PRIMARY KEY AUTO_INCREMENT,
    propertyId INT,
    image1 VARCHAR(255),
    image2 VARCHAR(255),
    image3 VARCHAR(255),
    CONSTRAINT propertyId FOREIGN KEY(propertyId) REFERENCES property(propertyId)
);

-- admin
CREATE TABLE admin(
adminId int PRIMARY KEY AUTO_INCREMENT,
adminName varchar (125),
adminEmail varchar (125),
adminPassword varchar(125)
);

-- kyc verification
CREATE TABLE kycForm ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    uID INT, firstName VARCHAR(255), 
    lastName VARCHAR(255), 
    date_of_birth DATE, 
    phoneNumber INT, 
    provision VARCHAR(255), 
    district VARCHAR(255), 
    municipality VARCHAR(255), 
    village VARCHAR(255), 
    userPhoto varchar(225), 
    CFPhoto varchar(255), 
    CBPhoto varchar(255), 
    verification ENUM('Pending', 'Verified', 'Rejected') DEFAULT 'Pending', 
    CONSTRAINT uID FOREIGN KEY(uID) REFERENCES users(userId)
);

INSERT INto admin(adminName,adminEmail,adminPassword)
VALUES('Sunil Nath','sunilnath0109@gmail.com','Sunil@123')

/* all data select */
SELECT * FROM users LEFT JOIN property ON users.userId = property.userId INNER JOIN propertyImages ON property.propertyId = propertyImages.propertyId;
ALTER TABLE `property` CHANGE `date` `date`