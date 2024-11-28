
const Lead = require("../models/Lead");
const mongoose = require('mongoose');
const createLeadContoller = async (req,res) =>{
    try {

       
        const { name,firstName,description,statut} = req.body;

        const lead = await Lead.create({
            name,
            firstName,
            description ,
            statut,

        });

        res.json({
            status: "success",
            data : lead,
        })

    } catch (error) {
        res.json(error.message);        
    }
};


const GetLeadByIdContoller = async (req, res) => {
    try {
        
        const leadId = req.params.id;

        
        const lead = await Lead.findById(leadId);
        
        res.json({
            status: "success",
            data: lead,
        });
    } catch (error) {
        
        res.json({
            status: "error",
            message: error.message,
        });
    }
};

const GetAllLeadContoller = async (req,res) => {
    try {

        const  leads = await Lead.find();
        res.json({
            status: "success",
            data: leads,
        })
    } catch (error) {
        res.json(error.message);        
    }
};
const deleteLeadByIdContoller = async (req,res) => {
    try {
        const dele=req.params.id;
        const del= await Lead.deleteOne({ _id: dele })
        res.json({
            status: "success",
            message: "Post deleted successfully",
            
        })
    } catch (error) {
        res.json(error.message);        
    }
};
const updateLeadByIdContoller = async (req,res) => {
    try {
        const upd = req.params.id; 
        const { name,firstName,description, statut } = req.body;
        const updatedLead = await Lead.findByIdAndUpdate(
            upd,{ name,firstName,description, statut },     
        );
        res.json({
            status: "success",
            data: updatedLead,
        })
    } catch (error) {
        res.json(error.message);        
    }
}; 

module.exports = {
    GetLeadByIdContoller,
    GetAllLeadContoller,
    deleteLeadByIdContoller,
    updateLeadByIdContoller,
    createLeadContoller,
}