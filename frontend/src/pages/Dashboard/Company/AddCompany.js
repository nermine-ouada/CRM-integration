import React, { useState, useEffect } from "react";
import ContactService from "services/ContactService"; // Adjust the import path as necessary
import CompanyService from "services/CompanyService"; // Service to fetch companies

const AddContact = () => {
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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Auto-generate password when name changes
    if (name === "name") {
      setFormData((prevData) => ({
        ...prevData,
        password: value.toLowerCase().replace(/\s+/g, "") + "123",
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role, customRole, status, company } =
      formData;

    // Use customRole if role is "Other"
    const finalRole = role === "other" ? customRole : role;

    // Basic validation
    if (!name || !email || !password || !finalRole || !company) {
      alert("All fields are required.");
      return;
    }

    try {
      const contactData = {
        name,
        email,
        password,
        role: finalRole,
        status,
        company,
      };
      const result = await ContactService.addContact(contactData);
      alert("Contact added successfully!");
      console.log(result);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "consultant",
        customRole: "",
        status: "active",
        company: "",
      });
    } catch (error) {
      console.error("Error adding contact:", error);
      alert(
        error.response?.data?.message ||
          "There was an error adding the contact. Please try again."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Role</label>
          <select
            name="role"
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
              name="customRole"
              value={formData.customRole}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
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
            name="company"
            value={formData.company}
            onChange={handleInputChange}
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
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;
