import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContactService from "services/ContactService"; // Adjust the import path if necessary
import CompanyService from "services/CompanyService"; // Service to fetch companies

const EditContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "consultant", // Default role
    customRole: "", // For custom role
    status: "active", // Default status
    company: "", // Selected company ID
  });
  const [companies, setCompanies] = useState([]); // List of companies

  useEffect(() => {
    // Fetch all companies on component mount
    const fetchCompanies = async () => {
      try {
        const response = await CompanyService.getAll();
        setCompanies(response.data); // Assuming the data is an array of companies
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const data = await ContactService.getContactById(id);
      setFormData({
        name: data.name,
        email: data.email,
        password: data.password, // Assuming password is also returned
        role: data.role,
        status: data.status,
        company: data.company,
      }); // Populate the form with the contact's current data
    } catch (error) {
      console.error("Error fetching contact:", error.message);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      name: newName,
      password: newName.toLowerCase().replace(/\s+/g, "") + "123", // Auto-generate password
    }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      role: selectedRole,
    }));

    // Reset custom role if "Other" is not selected
    if (selectedRole !== "other") {
      setFormData((prevData) => ({
        ...prevData,
        customRole: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use customRole if role is "Other"
    const finalRole =
      formData.role === "other" ? formData.customRole : formData.role;

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !finalRole ||
      !formData.company
    ) {
      alert("All fields are required.");
      return;
    }

    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: finalRole,
        status: formData.status,
        company: formData.company,
      };
      await ContactService.updateContact(id, contactData);
      window.location.href = "/contacts"; // Redirect to contact list
    } catch (error) {
      console.error("Error updating contact:", error.message);
      alert(
        error.response?.data?.message ||
          "There was an error updating the contact. Please try again."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Password</label>
          <input
            type="text"
            value={formData.password}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Role</label>
          <select
            value={formData.role}
            onChange={handleRoleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="consultant">Consultant</option>
            <option value="RH">RH</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
        {formData.role === "other" && (
          <div className="mb-4">
            <label className="block mb-2 font-bold">Custom Role</label>
            <input
              type="text"
              value={formData.customRole}
              onChange={(e) =>
                setFormData({ ...formData, customRole: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Status</label>
          <select
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Company</label>
          <select
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select a Company</option>
            {companies.map((comp) => (
              <option key={comp._id} value={comp._id}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;
