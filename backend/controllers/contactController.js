const Contact = require("../models/Contact");
const Company = require("../models/Company");

const createContact = async (req, res) => {
  try {
    const { company, ...contactData } = req.body;

    const existingCompany = await Company.findById(company);
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    const contact = new Contact({ ...contactData, company });
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate({
      path: "company",
      select: "name adresse telephone sector createdAt updatedAt",
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id).populate({
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

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.company) {
      const existingCompany = await Company.findById(req.body.company);
      if (!existingCompany) {
        return res.status(404).json({ message: "Company not found" });
      }
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
