const Lead = require("../models/Lead");
const Contact = require("../models/Contact"); // Import the Contact model

const createLeadController = async (req, res) => {
  try {
    const { name, description, statut } = req.body;
    const lead = await Lead.create({ name, description, statut });

    res.json({
      status: "success",
      data: lead,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

const getLeadByIdController = async (req, res) => {
  try {
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({
        status: "error",
        message: "Lead not found",
      });
    }

    res.json({
      status: "success",
      data: lead,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

const getAllLeadsController = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json({
      status: "success",
      data: leads,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

const deleteLeadByIdController = async (req, res) => {
  try {
    const leadId = req.params.id;
    await Lead.findByIdAndDelete(leadId);

    res.json({
      status: "success",
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

const updateLeadByIdController = async (req, res) => {
  try {
    const leadId = req.params.id;
    const { name, description, statut } = req.body;
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { name, description, statut },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({
        status: "error",
        message: "Lead not found",
      });
    }

    res.json({
      status: "success",
      data: updatedLead,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

const convertLeadToContactController = async (req, res) => {
  try {
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({
        status: "error",
        message: "Lead not found",
      });
    }

    const { name, description, statut } = lead;
    const { email, phone, company ,password} = req.body; // Additional data for the contact

    // Create a new contact
    const contact = await Contact.create({
      name,
      description,
      email,
      phone,
      company,password
    });

    // Optionally delete the lead after creating the contact
    await Lead.findByIdAndDelete(leadId);

    res.json({
      status: "success",
      message: "Lead converted to contact successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error converting lead to contact:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to convert lead to contact",
      error: error.message,
    });
  }
};

module.exports = {
  getLeadByIdController,
  getAllLeadsController,
  deleteLeadByIdController,
  updateLeadByIdController,
  createLeadController,
  convertLeadToContactController,
};
