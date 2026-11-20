const Ingredients = require("../models/ingredients");
const { CustomAPIError } = require("../errors/index");

// ####
const { StatusCodes } = require("http-status-codes");
const { GetFilter } = require("../services/date");

const getAll = async (req, res) => {
  // const active = req.query.active || true;
  const filter = GetFilter(req);

  const totalIngredients = await Ingredients.countDocuments(filter);

  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.max(1, Number(req.query.limit) || 10);

  const skip = (page - 1) * limit;
  const maxPage = Math.ceil(totalIngredients / limit);

  const sortOrder = req.query.sort === "asc" ? 1 : -1; // -1 = newest first, 1 = oldest first

  const result = await Ingredients.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: sortOrder });

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

  const result = await Ingredients.findOne({ _id: id });

  if (!result) {
    throw new CustomAPIError("Ingredient not Found", StatusCodes.NOT_FOUND);
  }
  if (!result.active) {
    throw new CustomAPIError("Ingredient Deactivated", StatusCodes.NOT_FOUND);
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

const deactivate = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredients.findOneAndUpdate(
      { _id: id },
      { $set: { active: false } },
      {
        returnDocument: "after",
      },
    );
    if (!ingredient) {
      throw new CustomAPIError("ingredient not deleted", 400);
    }
    res
      .status(200)
      .json({ message: "deActivated successfuly unsuccsessfully" });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
module.exports = { create, getAll, getSingle, deactivate };
