const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead name is required"],
    },
    description: {
      type: String,
      required: [true, "Lead description is required"],
    },
    statut: {
      type: String,
      required: [true, "Lead statut is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", userSchema);
module.exports = Lead;
