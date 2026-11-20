const { CustomAPIError } = require("../errors/index");

// Import Models
const Product = require("../models/product");
const Category = require("../models/category");
const Ingredient = require("../models/ingredients");

// filter
const { GetFilter } = require("../services/date");

// Get all
const getAll = async (req, res) => {
  const filter = GetFilter(req);

  const totalProducts = await Product.countDocuments(filter);

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);

  const skip = (page - 1) * limit;
  const maxPage = Math.ceil(totalProducts / limit);

  const result = await Product.findAllWithAvailableAmount(skip, limit, filter);

  res.status(200).json({
    totalProducts,
    limit,
    page,
    maxPage,
    data: result,
  });
};
// Get Single
const getSingle = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new CustomAPIError("Product Not Found", 404);
  }
  // const getAvailableAmount = await product.getAvailableAmount();
  res.status(200).json({
    product,
    // availableAmount: getAvailableAmount,
  });
};

// create One
const create = async (req, res) => {
  // import data from request body
  const { title, description, category, image, requirements } = req.body;

  // check if valued are provided
  if (!title || !description || !category || !requirements) {
    throw new CustomAPIError(
      "Please Provide  title, price:{original}, description, discount_percentage, category, requirements",
      400,
    );
  }

  // check if body provided price
  if (!req.body.price) {
    throw new CustomAPIError("Provide price: {original:123}", 400);
  }

  const { original, discount_percentage } = req.body.price;
  const categoryDoc = await Category.createCategory(category);
  // product Create obj
  const productObj = {
    title: title.toLowerCase().trim(),
    description,
    price: { original, discount_percentage },
    category: categoryDoc._id,
    image,
    requirements,
  };
  let product = await Product.create(productObj);

  // get expanded value of ingredient
  await product.populate({
    path: "requirements.ingredient",
    select: "amount title",
  });

  // update product stock by calculating from requirements
  product.stock = await product.getAvailableAmount();
  res.status(200).json({
    product,
  });
};
const getLowStock = async (req, res) => {};

module.exports = { create, getSingle, getAll, getLowStock };
