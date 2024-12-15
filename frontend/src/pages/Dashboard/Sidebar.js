import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed">
      <h2 className="text-2xl font-bold mb-6 p-4">QC CRM</h2>
      <ul className="space-y-4 p-4">
        <li>
          <Link
            to="/dashboard/companies"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Companies
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/contacts"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Contacts
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/leads"
            className="block py-2 px-4 rounded hover:bg-gray-700"
          >
            Leads
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
