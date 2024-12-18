import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContactById } from "../../services/contactService";

const ViewContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const data = await getContactById(id);
      setContact(data);
    } catch (error) {
      console.error("Error fetching contact:", error.message);
    }
  };

  if (!contact) {
    return <div>Loading contact details...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <div className="bg-white p-4 shadow rounded">
        <p>
          <strong>Name:</strong> {contact.name}
        </p>
        <p>
          <strong>First Name:</strong> {contact.firstName}
        </p>
        <p>
          <strong>Login:</strong> {contact.login}
        </p>
        <p>
          <strong>Role:</strong> {contact.role}
        </p>
        <p>
          <strong>Status:</strong> {contact.status}
        </p>
        <p>
          <strong>Company:</strong> {contact.company}
        </p>
      </div>
      <button
        onClick={() => (window.location.href = "/contacts")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default ViewContact;
