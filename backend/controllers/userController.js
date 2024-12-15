const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createUserContoller = async (req,res) =>{
    try {

        const {name, email, password, role} = req.body;

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
           email,
            password: hashedPassword,
            role
        });
        

        res.json({
            status: "success",
            data : user,
        })

    } catch (error) {
        res.json(error.message);        
    }
};

const GetUserByIdContoller = async (req,res) => {
    try {

        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            status: "success",
            data: user,
        })
    } catch (error) {
        res.json(error.message);        
    }
};

const GetAllUsersContoller = async (req,res) => {
    try {

        const users = await User.find();

        res.json({
            status: "success",
            data: users,
        })
    } catch (error) {
        res.json(error.message);        
    }
};

const deleteUserByIdContoller = async (req,res) => {
    try {

        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            status: "success",
            data: "user deleted successfully",
        })
    } catch (error) {
        res.json(error.message);        
    }
};

const updateUserByIdContoller = async (req,res) => {
    try {

        const userId = req.params.id;
        const { name,  email, password, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { name,  email, password, role}, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            status: "success",
            data: updatedUser,
        })
    } catch (error) {
        res.json(error.message);        
    }
}; 

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            status: "success",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports ={
    GetUserByIdContoller,
    GetAllUsersContoller,
    deleteUserByIdContoller,
    updateUserByIdContoller,
    createUserContoller,
    loginController
}