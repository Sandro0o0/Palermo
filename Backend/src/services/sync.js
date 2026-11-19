const { saveAvailableAmounts } = require("./saveAmount");
const { StatusCodes } = require("http-status-codes");

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
