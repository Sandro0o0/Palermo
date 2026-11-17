const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxlenght: [20, "Character lenght must be under 20"],
      minlenght: [2, "Character lenght must be over 2"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      required: [true, "role required"],
      default: "user",
      enum: {
        values: ["user", "waiter"],
        message: "{VALUE} does not mathch",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidate) {
  console.log(candidate);
  return await bcrypt.compare(candidate, this.password);
};
userSchema.methods.createJwt = async function (user) {
  const result = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  console.log("ACCESS:", !!process.env.JWT_ACCESS);
  console.log("REFRESH:", !!process.env.JWT_REFRESH);
  const access_token = await jwt.sign(result, process.env.JWT_ACCESS, {
    expiresIn: "15m",
  });
  const refresh_token = await jwt.sign(result, process.env.JWT_REFRESH, {
    expiresIn: "30d",
  });
  const tokens = {
    access_token,
    refresh_token,
  };
  return tokens;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
