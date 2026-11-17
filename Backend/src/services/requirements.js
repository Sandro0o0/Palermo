const { CustomAPIError } = require("../errors");
const Ingredient = require("../models/ingredients");

///
const calculateSingleRequirement = (req) => {
  const result = {
    title: req.title,
    result: Math.floor(req.ingredientAmount / req.requiredAmount),
  };
  return result;
};

const requirementsHandle = async (requirements = []) => {
  // Get ingredients amount

  const ingredientAmounts = await requirements.reduce(
    async (prevPromise, currRequirement) => {
      const prevRequirement = await prevPromise;

      const ingredient = await Ingredient.findById(currRequirement.ingredient);

      if (!ingredient) {
        throw new CustomAPIError(
          "ingredient does not exist try creating ingredient first",
          404,
        );
      }

      prevRequirement.push({
        title: ingredient.title,
        ingredient: ingredient._id,
        ingredientAmount: ingredient.amount,
        requiredAmount: currRequirement.amount,
      });

      return prevRequirement;
    },
    Promise.resolve([]),
  );

  const resultObj = {};
  //=========>
  ingredientAmounts.forEach((element) => {
    const clacResult = calculateSingleRequirement(element);
    resultObj[clacResult.title] = clacResult.result;
  });

  const availableAmount = Math.min(...Object.values(resultObj));

  return availableAmount;
};

module.exports = requirementsHandle;
