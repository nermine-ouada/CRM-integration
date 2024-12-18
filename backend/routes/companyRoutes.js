const express = require("express");
const {
  createCompanyContoller,
  GetCompanyByIdContoller,
  GetAllCompaniesContoller,
  deleteCompanyByIdContoller,
  updateCompanyByIdContoller,
  getAllContactsByCompanyIdController,
} = require("../controllers/companyController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const companyRouter = express.Router();

companyRouter.post("/",createCompanyContoller); 
companyRouter.get('/:id', GetCompanyByIdContoller); 
companyRouter.get('/', GetAllCompaniesContoller); 
companyRouter.delete('/:id', deleteCompanyByIdContoller); 
companyRouter.put('/:id',updateCompanyByIdContoller); 
companyRouter.get("/:id/contacts",getAllContactsByCompanyIdController)

module.exports = companyRouter;
