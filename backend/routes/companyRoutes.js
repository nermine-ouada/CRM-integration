const express = require("express");
const {
  createCompanyContoller,
  GetCompanyByIdContoller,
  GetAllCompaniesContoller,
  deleteCompanyByIdContoller,
  updateCompanyByIdContoller,
} = require("../controllers/companyController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/checkRole");

const companyRouter = express.Router();

companyRouter.post(
  "/",
  authMiddleware,
  checkRole(["admin", "user"]),
  createCompanyContoller
);
companyRouter.get(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  GetCompanyByIdContoller
);
companyRouter.get(
  "/",
  authMiddleware,
  checkRole(["admin", "user"]),
  GetAllCompaniesContoller
);
companyRouter.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  deleteCompanyByIdContoller
);
companyRouter.put(
  "/:id",
  authMiddleware,
  checkRole(["admin", "user"]),
  updateCompanyByIdContoller
);

module.exports = companyRouter;
