import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ContactService from "services/ContactService";

const CompanyContacts = () => {
  const { id } = useParams(); // Get company ID from the route
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await ContactService.getAllContactsByCompanyId(id); // Replace with your API call
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>
      <Link
        to="/dashboard/companies"
        className="mb-4 inline-block bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Companies
      </Link>
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="border-t">
              <td className="py-2 px-4">{contact.name}</td>
              <td className="py-2 px-4">{contact.email}</td>
              <td className="py-2 px-4">{contact.role}</td>
              <td className="py-2 px-4">{contact.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyContacts;
