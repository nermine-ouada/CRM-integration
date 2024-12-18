import React, { useState, useEffect } from "react";
import ContactService from "services/ContactService"; // Adjust the import path as necessary
import CompanyService from "services/CompanyService"; // Service to fetch companies

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consultant"); // Default role
  const [customRole, setCustomRole] = useState(""); // For custom role
  const [status, setStatus] = useState("active"); // Default status
  const [company, setCompany] = useState(""); // Selected company ID
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

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setPassword(newName.toLowerCase().replace(/\s+/g, "") + "123"); // Auto-generate password
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Reset custom role if "Other" is not selected
    if (selectedRole !== "other") {
      setCustomRole("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setName("");
      setEmail("");
      setPassword("");
      setRole("consultant");
      setCustomRole("");
      setStatus("active");
      setCompany("");
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
            value={name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Password</label>
          <input
            type="text"
            value={password}
            readOnly
            className="w-full px-4 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Role</label>
          <select
            value={role}
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
        {role === "other" && (
          <div className="mb-4">
            <label className="block mb-2 font-bold">Custom Role</label>
            <input
              type="text"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
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
