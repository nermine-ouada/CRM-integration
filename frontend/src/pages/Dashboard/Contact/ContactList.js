import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContactService from "services/ContactService";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        console.log("Fetching contacts...");
        const response = await ContactService.getAllContacts();
        setContacts(response);
      } catch (error) {
        console.error(
          "Error fetching contacts:",
          error.response?.data || error.message
        );
        alert("Failed to fetch contacts. Please try again later.");
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await ContactService.deleteContact(id);
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
        alert("Contact deleted successfully!");
      } catch (error) {
        console.error(
          "Error deleting contact:",
          error.response?.data || error.message
        );
        alert("Failed to delete contact. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>
      <Link
        to="/dashboard/contacts/add"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add New Contact
      </Link>
      <table className="min-w-full bg-white border border-gray-200 mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Company ID</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No contacts found.
              </td>
            </tr>
          ) : (
            contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="py-2 px-4">{contact.name || "No Name"}</td>
                <td className="py-2 px-4">{contact.email || "No Email"}</td>
                <td className="py-2 px-4">{contact.role || "No Role"}</td>
                <td className="py-2 px-4">{contact.status || "No Status"}</td>
                <td className="py-2 px-4">{contact.company?.id || "N/A"}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(contact._id, contact.name)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/contacts/edit/${contact._id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
