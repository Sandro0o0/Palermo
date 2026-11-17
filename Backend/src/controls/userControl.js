const CustomAPIError = require("../errors/customAPI.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  // check if body is undefined
  if (!req.body) {
    throw new CustomAPIError("request body is undefiend", 400);
  }
  // Validate Data check
  const { username, email, password, confirm_password } = req.body;
  if (!confirm_password) {
    throw new CustomAPIError("confirm_password rquired", 400);
  }
  // Check if passwords Match
  if (password !== confirm_password) {
    throw new CustomAPIError(
      "bad request password musth match confirm password",
      400,
    );
  }

  // Create user obj
  const userObj = {
    username,
    email,
    password,
  };

  // create DB/JWT user
  const user = await User.create({ ...userObj });
  const tokens = await user.createJwt(user);

  // Tokens not generated error
  if (!tokens) {
    throw new CustomAPIError("Tokens not generated", 500);
  }
  // console.log(tokens);

  res.status(201).json(tokens);
};

const login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError("Please Provide email/password", 400);
  }

  const getUser = await User.findOne({ email: email });

  if (!getUser) {
    throw new CustomAPIError("User with this email doesnot exist", 404);
  }

  // Check Password
  const passwordMatch = await getUser.comparePassword(password);

  if (!passwordMatch) {
    throw new CustomAPIError("incorrect password/email", 400);
  }

  const userObj = {
    role: getUser.role,
    email: getUser.email,
    _id: getUser._id,
  };
  const tokens = await getUser.createJwt(userObj);
  console.log("userObj :" + userObj);
  res.status(200).json(tokens);
};

const refresh = async (req, res) => {
  try {
    const { refresh } = req.params;

    // Verify JWT
    const payload = jwt.verify(refresh, process.env.JWT_REFRESH);

    // Find DB user
    const findUser = await User.findOne({ _id: payload.userId });

    const userObj = {
      password: findUser.password,
      role: findUser.role,
      _id: findUser._id,
    };
    const tokens = await findUser.createJwt(userObj);
    const access_token = tokens.access_token;
    res.status(200).json({ access_token });
  } catch (err) {
    console.error(err);
  }
};
module.exports = { register, login, refresh };
