const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact name is required"],
    },
    email: {
      type: String,
      required: [true, "Contact email is required"],
      unique: [true, "Contact email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Contact password is required"],
    },
    role: {
      type: String,
      required: [true, "Contact role is required"],
      default: "user",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "pending"],
        message: "Status must be one of 'active', 'inactive', or 'pending'",
      },
      default: "active",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Contact must be associated with a company"],
    },
    login: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values if login is optional
      default: function () {
        return `${this.name.toLowerCase().replace(/\s+/g, "")}${Math.floor(
          Math.random() * 1000
        )}`;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
