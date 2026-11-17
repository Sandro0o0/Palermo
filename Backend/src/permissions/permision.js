// import authenticate from "../middlwares/authenticate";
const { CustomAPIError } = require("../errors/index");
const authenticate = require("../middlwares/authenticate");

const givePermission = (roles = []) => {
  return (req, res, next) => {
    const user = req.user;
    // console.log(user);
    const rolesArray = Array.from(roles);

    // check iof the user is registered
    if (!user) {
      throw new CustomAPIError("user Not authenticated", 401);
    }

    // check if role match with permision
    if (!rolesArray.includes(user.role) && user.role !== "admin") {
      throw new CustomAPIError("user not authorized", 403);
    }
    next();
  };
};

module.exports = { givePermission };
