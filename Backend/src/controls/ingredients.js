const Ingredients = require("../models/ingredients");
const { CustomAPIError } = require("../errors/index");

// ####
const { StatusCodes } = require("http-status-codes");
const getAll = async (req, res) => {
  const totalIngredients = await Ingredients.countDocuments({});

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);

  const skip = (page - 1) * limit;
  const maxPage = Math.ceil(totalIngredients / limit);

  const result = await Ingredients.find({}).limit(limit).skip(skip);

  res.status(200).json({
    totalIngredients,
    limit,
    page,
    maxPage,
    data: result,
  });
};
const getSingle = async (req, res) => {
  const { id } = req.params;

  const result = await Ingredients.findById({ _id: id });
  if (!result) {
    throw new CustomAPIError("Ingredient not Found", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json(result);
};

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
module.exports = { create, getAll, getSingle };
