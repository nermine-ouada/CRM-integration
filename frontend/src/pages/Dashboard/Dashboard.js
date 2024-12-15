import React from "react";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import CompanyList from "./Company/CompanyList";
import AddCompany from "./Company/AddCompany";
import EditCompany from "./Company/EditCompany";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <Routes>
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/add" element={<AddCompany />} />
          <Route
            path="/companies/edit/:id"
            element={<EditCompany />}
          />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
