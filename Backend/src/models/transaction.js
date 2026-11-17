const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
    },
    transaction_type: {
      type: String,
      enum: {
        values: ["withdraw", "deposit"],
        message: "{VALUE} is not valid. Only withdraw/deposit are allowed.",
      },
      required: [true, "Transaction type is required"],
    },
    ingredient: {
      type: mongoose.Types.ObjectId,
      ref: "ingredient",
      required: true,
    },
  },
  { Timestamp: true, toJson: { virtuals: true } },
);

const model = mongoose.model("inventory", transactionSchema);

module.exports = model;
