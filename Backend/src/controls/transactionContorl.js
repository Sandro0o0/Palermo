const Transaction = require("../models/transaction");
const TransactionClass = require("../services/transaction");
const { StatusCodes } = require("http-status-codes");

// Error
const { CustomAPIError } = require("../errors/index");

const create = async (req, res) => {
  const { amount, ingredientId, transaction_type } = req.body;
  const user = req.user;
  //   transaction_type = null;

  if (!user) {
    throw new CustomAPIError("User Not Found", StatusCodes.NOT_FOUND);
  }

  if (!amount || !ingredientId) {
    throw new CustomAPIError(
      "please insert amount/ingredientId/transaction_type",
      StatusCodes.BAD_REQUEST,
    );
  }

  // Check req status
  // if (transaction_type !== "deposit" || transaction_type !== "withdraw") {
  //   throw new CustomAPIError(
  //     "transaction_type has to be deposit/withdraw",
  //     400,
  //   );
  // }

  // Transaction input
  const transactionObj = {
    createdBy: user.userId,
    ingredient: ingredientId,
    transaction_type,
    amount,
  };
  console.log(transaction_type);

  const TransactionCreate = new TransactionClass(amount);

  const makeTransaction = {
    deposit: () => TransactionCreate.deposit(ingredientId),
    withdraw: () => TransactionCreate.withdraw(ingredientId),
  };

  const updateIngredient = await makeTransaction[transaction_type]();

  if (!updateIngredient.status) {
    throw new CustomAPIError(
      "Transaction unsuccsessful",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  // Transaction model create
  const createTransaction = await Transaction.create(transactionObj);
  if (!createTransaction) {
    throw new CustomAPIError(
      "log not created",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  // return Status
  res.status(StatusCodes.CREATED).json({
    status: updateIngredient.message,
    updatedIngredient: updateIngredient.data,
  });
};

module.exports = { create };
