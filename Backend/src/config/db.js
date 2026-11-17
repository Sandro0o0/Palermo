const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB Connected");
  } catch (err) {
    console.log("DB Connection Error:", err);
    throw err;
  }
};

module.exports = connectDB;
