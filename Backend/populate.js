// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGO_URI =
  "mongodb+srv://sandrogogitidze2018_db_user:palermo448@cluster0.cdnpx1d.mongodb.net/palermo";

// Match your existing Ingredient schema (include your actual fields here)
// const ingredientSchema = new mongoose.Schema(
//   {
//     name: String,
//     active: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { strict: false }, // Allows working with existing documents even if schema fields differ slightly
// );

const Ingredient = require("./src/models/ingredients");

async function populateActiveField() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Only update documents that do not already have the `active` field
    const result = await Ingredient.updateMany(
      { active: { $exists: false } },
      { $set: { active: true } },
    );

    console.log(
      `Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`,
    );
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    try {
      await mongoose.disconnect();
    } catch (_) {
      // Ignore disconnect errors on failure
    }
    process.exit(1);
  }
}

populateActiveField();
