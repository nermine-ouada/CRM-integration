import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyService from "services/CompanyService";

const EditCompany = () => {
  const { id } = useParams(); // Extract the `id` from the URL
  console.log("Extracted ID:", id);
  const navigate = useNavigate();
  const [company, setCompany] = useState(null); // Default to null until data is loaded
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        console.log(id);
        const response = await CompanyService.get(id); // Fetch the company by ID
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CompanyService.update(
        id,
        company.name,
        company.sector,
        company.telephone,
        company.adresse,
        company.email // Add the email field to the update request
      );
      navigate("/dashboard/companies"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating company", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!company) {
    return <p>Company not found</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Sector</label>
          <input
            type="text"
            name="sector"
            value={company.sector}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Telephone</label>
          <input
            type="text"
            name="telephone"
            value={company.telephone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Address</label>
          <input
            type="text"
            name="adresse"
            value={company.adresse}
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
            value={company.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
