const Contact = require("../models/Contact");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { company, password, name, ...contactData } = req.body;

    // Check if the provided company ID exists
    const existingCompany = await Company.findById(company);
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Generate login if not provided
    const login =
      name.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 1000);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the contact
    const contact = new Contact({
      ...contactData,
      name,
      password: hashedPassword,
      login, // Ensure login is unique
      company,
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const contacts = await Contact.find()
      .select("-password")
      .populate({
        path: "company",
        select: "name adresse telephone sector createdAt updatedAt",
      })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id).select("-password").populate({
      path: "company",
      select: "name adresse telephone sector createdAt updatedAt",
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.company) {
      const existingCompany = await Company.findById(req.body.company);
      if (!existingCompany) {
        return res.status(404).json({ message: "Company not found" });
      }
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate({
      path: "company",
      select: "name adresse telephone sector createdAt updatedAt",
    });

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
