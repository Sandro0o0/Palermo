const { CustomAPIError } = require("../errors/index");
const Product = require("../models/product");
const Category = require("../models/category");
const Ingredient = require("../models/ingredients");

// Get all
const getAll = async (req, res) => {
  const totalProducts = await Product.countDocuments({});

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);

  const skip = (page - 1) * limit;
  const maxPage = Math.ceil(totalProducts / limit);

  const result = await Product.findAllWithAvailableAmount(skip, limit);

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
  // --add requirements
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

  const findCategory = await Category.findOne({ title: category });

  let newCategory;

  if (!findCategory) {
    newCategory = await Category.createCategory(category);
  }

  const categoryId = findCategory ? findCategory._id : newCategory._id;
  const productObj = {
    title: title.toLowerCase().trim(),
    description,
    price: { original, discount_percentage },
    category: categoryId,
    image,
    requirements,
  };
  let product = await Product.create(productObj);

  // await product.populate({
  //   path: "requirements.ingredient",
  //   select: "title",
  // });

  // const ingredient = await Ingredient.findById(
  //   "6af5e6021ef280a81d80a3e9",
  // ).lean();

  // console.log(ingredient);
  // product = await product.populate("category");

  // const getAvailableAmount = await product.getAvailableAmount();
  res.status(200).json({
    product,
    // availableAmount: getAvailableAmount,
  });
};
const getLowStock = async (req, res) => {};

module.exports = { create, getSingle, getAll, getLowStock };
