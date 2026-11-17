const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " title is required"],
      unique: [true, "category already exists"],
    },
  },
  { timestamps: true },
);

categorySchema.statics.createCategory = async function (title) {
  try {
    const category = await this.findOneAndUpdate(
      { title },
      { $setOnInsert: { title } },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
    return category;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("category", categorySchema);
