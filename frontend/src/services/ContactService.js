import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/contacts";

// Fetch all contacts
const getAllContacts = async () => {
  const response = await axios.get("/");
  return response.data;
};

// Get contact by ID
const getContactById = async (id) => {
  const response = await axios.get(`/${id}`);
  return response.data;
};

// Create a new contact
const createContact = async (contactData) => {
  const requiredFields = [
    "name",
    "email",
    "role",
    "status",
    "password",
    "company",
  ];
  requiredFields.forEach((field) => {
    if (!contactData[field]) {
      throw new Error(`The field '${field}' is missing in the request.`);
    }
  });

  try {
    const response = await axios.post("/", contactData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("An error occurred while creating the contact.");
    }
  }
};

// Update an existing contact
const updateContact = async (id, contactData) => {
  const requiredFields = ["name", "email", "role", "status", "company"];
  requiredFields.forEach((field) => {
    if (!contactData[field]) {
      throw new Error(`The field '${field}' is missing in the request.`);
    }
  });

  const response = await axios.put(`/${id}`, contactData);
  return response.data;
};

// Delete a contact
const deleteContact = async (id) => {
  const response = await axios.delete(`/${id}`);
  return response.data;
};

// Fetch all contacts for a specific company
const getAllContactsByCompany = async (companyId) => {
  const response = await axios.get(`/company/${companyId}/contacts`);
  return response.data;
};

const ContactService = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getAllContactsByCompany, // New method
};

export default ContactService;
