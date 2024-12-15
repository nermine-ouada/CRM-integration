const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
    },

    sector: {
      type: String,
      required: [true, "Company sector is required"],
    },
    telephone: {
      type: String,
      required: [true, "Company telephone is required"],
    },
    adresse: {
      type: String,
      required: [true, "Company adresse is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", postSchema);
module.exports = Company;
