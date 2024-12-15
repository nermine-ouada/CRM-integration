import axios from "axios";

const API_URL = "http://localhost:3000/api/companies/";

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const create = async (name, sector, telephone, adresse, email) => {
  const response = await axios.post(API_URL, {
    name,
    sector,
    telephone,
    adresse,
    email,
  });
  return response.data;
};

const update = async (id, name, sector, telephone, adresse, email) => {
  const response = await axios.put(API_URL + id, {
    name,
    sector,
    telephone,
    adresse,
    email,
  });
  return response.data;
};

const deleteCompany = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const CompanyService = {
  getAll,
  get,
  create,
  update,
  delete: deleteCompany,
};

export default CompanyService;
