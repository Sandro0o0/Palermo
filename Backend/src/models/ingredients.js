const mongoose = require("mongoose");
const { saveSingleAvailableAmounts } = require("../services/saveAmount");

const ingredientSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
      required: [true, "active field is required"],
    },
  },
  {
    id: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ingredientSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc || doc.active === false) return;
  await saveSingleAvailableAmounts(doc._id);
});

ingredientSchema.virtual("getAmount").get(function () {
  return {
    gram: this.amount * 1000,
    kilo: this.amount,
  };
});
const model = mongoose.model("ingredient", ingredientSchema);

// console.log("dsad");

module.exports = model;
