import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyService from "services/CompanyService";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await CompanyService.getAll();
        if (response && response.data && Array.isArray(response.data)) {
          setCompanies(response.data);
        } else {
          console.error("Data received is not in the expected array format");
        }
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleDelete = async (id, name) => {
    const confirm = window.confirm(
      `Are you sure you want to delete the company: ${name}?`
    );
    if (confirm) {
      try {
        await CompanyService.delete(id);
        setCompanies(companies.filter((company) => company._id !== id)); // Assuming your backend returns company._id
      } catch (error) {
        console.error("Error deleting company", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Companies</h2>
      <Link
        to="/dashboard/companies/add"
        className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Company
      </Link>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Sector</th>
            <th className="py-2 px-4">Email</th> {/* Added Email field */}
            <th className="py-2 px-4">Telephone</th>
            <th className="py-2 px-4">Address</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id} className="border-t">
              <td className="py-2 px-4">{company.name}</td>
              <td className="py-2 px-4">{company.sector}</td>
              <td className="py-2 px-4">{company.email}</td>{" "}
              {/* Display email */}
              <td className="py-2 px-4">{company.telephone}</td>
              <td className="py-2 px-4">{company.adresse}</td>
              <td className="py-2 px-4">
                <Link
                  to={`/dashboard/companies/edit/${company._id}`}
                  className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(company._id, company.name)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
