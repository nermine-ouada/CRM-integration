const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name is required"],
    },
    firstName: {
      type: String,
      required: [true, "Contact first name is required"],
    },
    login: {
      type: String,
      required: [true, "Contact login is required"],
      unique: [true, "Contact login must be unique"],
    },
    password: {
      type: String,
      required: [true, "Contact password is required"],
      unique: [true, "Contact password must be unique"],
    },
    role: {
      type: String,
      required: [true, "Contact role is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
      required: [true, "Contact status is required"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Contact must be associated with a company"],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
