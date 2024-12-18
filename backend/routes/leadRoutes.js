const express = require("express");
const {
  getLeadByIdController,
  getAllLeadsController,
  deleteLeadByIdController,
  updateLeadByIdController,
  createLeadController,
  convertLeadToContactController,
} = require("../controllers/leadController");

const leadRouter = express.Router();

// Route to create a new lead
leadRouter.post("/", createLeadController);

// Route to delete a lead by ID
leadRouter.delete("/:id", deleteLeadByIdController);

// Route to update a lead by ID
leadRouter.put("/:id", updateLeadByIdController);

// Route to get a lead by ID
leadRouter.get("/:id", getLeadByIdController);

// Route to get all leads
leadRouter.get("/", getAllLeadsController);

// Route to convert a lead to a contact
leadRouter.post("/convert/:id", convertLeadToContactController);

module.exports = leadRouter;
