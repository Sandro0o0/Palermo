const saveAvailableAmounts = async (id) => {
  const Product = require("../models/product");
  console.log(id);

  const products = await Product.find({});

  await Promise.all(
    products.map(async (product) => {
      const availableAmount = await product.getAvailableAmount();

      product.stock = availableAmount;

      await product.save();
    }),
  );
};

const saveSingleAvailableAmounts = async (id) => {
  const Product = require("../models/product");

  const product = await Product.findOne({ "requirements.ingredient": id });
  const availableAmount = await product.getAvailableAmount();

  product.stock = availableAmount;

  await product.save();
};

module.exports = { saveSingleAvailableAmounts, saveAvailableAmounts };
