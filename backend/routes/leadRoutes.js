const express = require("express");
const {
    GetLeadByIdContoller,
    GetAllLeadContoller,
    deleteLeadByIdContoller,
    updateLeadByIdContoller,
    createLeadContoller,
    
} = require('../controllers/leadController');

const leadRouter = express.Router();




leadRouter.post("/", createLeadContoller);
leadRouter.delete('/:id',deleteLeadByIdContoller);
leadRouter.put('/:id',updateLeadByIdContoller);
leadRouter.get('/:id', GetLeadByIdContoller);
leadRouter.get('/', GetAllLeadContoller);

module.exports = leadRouter;
