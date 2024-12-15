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
      required: [true, "Company address is required"],
    },
    email: {
      type: String,
      required: [true, "Company email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Ensure it's a valid email
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", postSchema);
module.exports = Company;
