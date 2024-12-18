import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard/Dashboard";

import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import CompanyList from "pages/Dashboard/Company/CompanyList";
import ContactList from "pages/Dashboard/Contact/ContactList";

import "./assets/styles/index.css";

// Create a root
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Render the components inside the Router component
root.render(
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="companies" element={<CompanyList />} />

        {/* Contact Management Routes (nested under Dashboard) */}
        <Route path="contacts" element={<ContactList />} />
       
      </Route>
    </Routes>
  </Router>
);
