const { saveAvailableAmounts } = require("./saveAmount");
const { StatusCodes } = require("http-status-codes");

// Syncronyzing all the data if not up to date
const Sync = async (req, res) => {
  try {
    await saveAvailableAmounts();
  } catch (err) {
    console.error(err);
  }

  res.status(StatusCodes.OK).json({
    message: "sync successful",
  });
};

module.exports = Sync;
