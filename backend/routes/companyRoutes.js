const express = require("express");
const {
    createCompanyContoller,
    GetCompanyByIdContoller,
    GetAllCompaniesContoller,
    deleteCompanyByIdContoller,
    updateCompanyByIdContoller
} = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');


const companyRouter = express.Router();

companyRouter.post("/",createCompanyContoller); 
companyRouter.get('/:id', GetCompanyByIdContoller); 
companyRouter.get('/', GetAllCompaniesContoller); 
companyRouter.delete('/:id', deleteCompanyByIdContoller); 
companyRouter.put('/:id',updateCompanyByIdContoller); 

module.exports = companyRouter;

