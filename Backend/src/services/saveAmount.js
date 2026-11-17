const saveAvailableAmounts = async () => {
  const Product = require("../models/product");

  const products = await Product.find({});

  await Promise.all(
    products.map(async (product) => {
      const availableAmount = await product.getAvailableAmount();

      product.stock = availableAmount;

      await product.save();
    }),
  );
};

module.exports = saveAvailableAmounts;
