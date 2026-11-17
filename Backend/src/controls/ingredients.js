const Ingredients = require("../models/ingredients");
const { CustomAPIError } = require("../errors/index");

// ####
const { StatusCodes } = require("http-status-codes");
const create = async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || amount === undefined) {
      throw new CustomAPIError(
        "Requires title, amount",
        StatusCodes.BAD_REQUEST,
      );
    }

    console.log(title);
    let ingredient = await Ingredients.findOne({
      title: title,
    });

    if (ingredient) {
      throw new CustomAPIError(
        "Ingredient already exists",
        StatusCodes.CONFLICT,
      );
    }

    ingredient = new Ingredients({ title, amount });

    await ingredient.save();

    res.status(StatusCodes.CREATED).json(ingredient);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
module.exports = { create };
