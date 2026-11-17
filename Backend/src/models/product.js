const mongoose = require("mongoose");
// import services
const requirementHandle = require("../services/requirements");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name Required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [35, "Name must be under 35 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description must be under 500 characters"],
      default: "N/A",
      trim: true,
    },

    requirements: [
      {
        _id: false,
        ingredient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ingredient",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    price: {
      original: {
        type: Number,
        min: 0,
        required: true,
      },
      discount_percentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      currency: {
        type: String,
        enum: {
          values: ["GEL", "USD"],
          message: "{VALUE} in not found use GEL, USD",
        },
        default: "GEL",
      },
      final_price: {
        type: Number,
        min: 0,
      },
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    low_stock_amount: {
      type: Number,
      default: 1,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// modify final_price on save
productSchema.pre("save", function () {
  if (
    this.isModified("price.original") ||
    this.isModified("price.discount_percentage") ||
    this.isNew
  ) {
    this.price.final_price =
      this.price.original * (1 - this.price.discount_percentage / 100);
  }
});

productSchema.virtual("isAvaiable", function () {
  return this.stock > 0;
});

// aveliableAmount
productSchema.statics.findAllWithAvailableAmount = async function (
  skip,
  limit,
) {
  const products = await this.find({}).skip(skip).limit(limit);

  return Promise.all(
    products.map(async (product) => ({
      ...product.toObject(),
      availableAmount: await product.getAvailableAmount(),
    })),
  );
};
// productSchema.statics.saveAvailableAmounts = async function () {

// };
productSchema.methods.getAvailableAmount = async function () {
  return await requirementHandle(this.requirements);
};

module.exports = mongoose.model("product", productSchema);
