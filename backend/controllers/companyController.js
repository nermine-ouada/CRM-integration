const Company = require("../models/Company");

const createCompanyContoller = async (req, res) => {
  try {
    const { name, sector, telephone, adresse, email } = req.body;

    const company = await Company.create({
      name,
      sector,
      telephone,
      adresse,
      email,
    });

    res.json({
      status: "success",
      data: company,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const GetCompanyByIdContoller = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      status: "success",
      data: company,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const GetAllCompaniesContoller = async (req, res) => {
  try {
    const companies = await Company.find();

    res.json({
      status: "success",
      data: companies,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteCompanyByIdContoller = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      status: "success",
      data: "company deleted successfully",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateCompanyByIdContoller = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, sector, telephone, adresse, email } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { name, sector, telephone, adresse, email },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      status: "success",
      data: updatedCompany,
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createCompanyContoller,
  GetCompanyByIdContoller,
  GetAllCompaniesContoller,
  deleteCompanyByIdContoller,
  updateCompanyByIdContoller,
};
