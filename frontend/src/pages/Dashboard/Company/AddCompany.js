import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyService from "services/CompanyService";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState(""); // New email state
  const [sectorOtherVisible, setSectorOtherVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CompanyService.create(name, sector, telephone, adresse, email); // Pass email
      navigate("/dashboard/companies"); // Redirect after successful addition
    } catch (error) {
      console.error("Error adding company", error);
    }
  };

  const handleSectorChange = (e) => {
    const value = e.target.value;
    setSector(value);
    if (value === "Other") {
      setSectorOtherVisible(true);
    } else {
      setSectorOtherVisible(false);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Add New Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Sector</label>
          <select
            value={sector}
            onChange={handleSectorChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="" disabled>
              Select a sector
            </option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          {sectorOtherVisible && (
            <input
              type="text"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Specify other sector"
              className="w-full px-4 py-2 mt-2 border rounded"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Telephone</label>
          <div className="flex items-center border rounded">
            <select
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-1/4 px-4 py-2 border-r rounded-l"
              required
            >
              <option value="" disabled>
                Select country code
              </option>
              <option value="+216">+216 (Tunisia)</option>
              <option value="+1">+1 (USA/Canada)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+33">+33 (France)</option>
              <option value="+49">+49 (Germany)</option>
              <option value="+61">+61 (Australia)</option>
              <option value="+81">+81 (Japan)</option>
              <option value="+82">+82 (South Korea)</option>
              <option value="+86">+86 (China)</option>
              <option value="+91">+91 (India)</option>
              <option value="+52">+52 (Mexico)</option>
              <option value="+34">+34 (Spain)</option>
              <option value="+39">+39 (Italy)</option>
              <option value="+86">+86 (Mainland China)</option>
              <option value="+55">+55 (Brazil)</option>
              <option value="+55">+55 (Brazil)</option>
              <option value="+49">+49 (Germany)</option>
              <option value="+34">+34 (Spain)</option>
              <option value="+81">+81 (Japan)</option>
              <option value="+82">+82 (South Korea)</option>
              <option value="+86">+86 (China)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-3/4 px-4 py-2 border rounded-r"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold">Address</label>
          <input
            type="text"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
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
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AddCompany;