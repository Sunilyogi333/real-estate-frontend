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
    profilePicture VARCHAR(255)
);

/* property */
CREATE TABLE property (
    propertyId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    propertyName VARCHAR(255),
    location VARCHAR(255),
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
    date DATE,
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