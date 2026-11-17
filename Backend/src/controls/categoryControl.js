const CustomAPIError = require("../errors/customAPI");
const Category = require("../models/category");

const create = async (req, res) => {
  if (!req.body) {
    throw new CustomAPIError("provide body", 400);
  }
  const { title } = req.body;

  // Find if category exists
  const findCategory = await Category.findOne({ title });

  if (findCategory) {
    throw new CustomAPIError("category already exists", 400);
  }
  const category = await Category.createCategory(title);
  console.log(req.body);

  if (!category) {
    throw new CustomAPIError("something went wrong", 500);
  }
  res.status(200).json(category);
};

module.exports = { create };
