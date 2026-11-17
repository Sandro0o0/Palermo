const TransactionSchema = require("../models/transaction");
const User = require("../models/user");
const Ingredient = require("../models/ingredients");
const { CustomAPIError } = require("../errors/index");

class Transaction {
  constructor(amount) {
    this.amount = amount;
  }

  async init(userId, ingredientId) {
    this.user = await User.findById(userId);
    this.ingredient = await Ingredient.findById(ingredientId);
  }

  async deposit(ingredientId) {
    console.log(this.amount);
    const ingredient = await Ingredient.findOneAndUpdate(
      { _id: ingredientId },
      {
        $inc: { amount: this.amount },
      },
      {
        returnDocument: "after",
      },
    );
    if (!ingredient) {
      throw new CustomAPIError("Not Found", 404);
    }
    return {
      status: true,
      message: "deposit succsessful",
      data: ingredient,
    };
  }
  async withdraw(ingredientId) {
    const ingredient = await Ingredient.findOneAndUpdate(
      { _id: ingredientId, amount: { $gte: this.amount } },
      {
        $inc: { amount: -this.amount },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    if (!ingredient) {
      throw new CustomAPIError("Cannot be withdrawed", 400);
    }
    return {
      status: true,
      message: "withdraw succsessful",
      data: ingredient,
    };
  }

  abstraction() {
    console.log("User :" + this.user);
    console.log("Ingredient :" + this.ingredient);
  }
}

module.exports = Transaction;

// // Test ============================
// require("dotenv").config();
// const dns = require("dns");
// dns.setServers(["8.8.8.8", "1.1.1.1"]);
// const mongoose = require("mongoose");
// const { CustomAPIError } = require("../errors");

// const runTest = async () => {
//   try {
//     // Connect to database
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("Database connected!");

//     // Create and initialize transaction
//     const test = new Transaction({
//       userId: "6af2a1622698b39c4b2664f7",
//       ingredientId: "6af187b52d998503674abef9",
//       amount: 100,
//       transaction_type: "withdraw",
//     });

//     // await test.init("6af2a1622698b39c4b2664f7", "6af187b52d998503674abef9");
//     await test.withdraw("6af187b52d998503674abef9");
//     await test.init("6af2a1622698b39c4b2664f7", "6af187b52d998503674abef9");

//     test.abstraction();
//   } catch (error) {
//     console.error("Test failed:", error);
//   } finally {
//     // Always disconnect
//     await mongoose.disconnect();

//     console.log("Database disconnected!");
//   }
// };

// runTest();
