const cloudinary = require('cloudinary').v2;


// Configuration 

cloudinary.config(JSON.parse(`${process.env.CD_CONFIG}`));

module.exports = cloudinary;