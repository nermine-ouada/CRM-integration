const express = require("express");
const {
  GetUserByIdContoller,
  GetAllUsersContoller,
  deleteUserByIdContoller,
  updateUserByIdContoller,
  createUserContoller,
  loginController
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const userRouter = express.Router();

userRouter.post("/register", createUserContoller); 
userRouter.get('/:id', authMiddleware, checkRole(["admin","user","rh"]), GetUserByIdContoller); 
userRouter.get('/', authMiddleware,checkRole("rh"), GetAllUsersContoller); 
userRouter.delete('/:id', authMiddleware, checkRole("admin"), deleteUserByIdContoller); 
userRouter.put('/:id', authMiddleware, checkRole("admin"), updateUserByIdContoller); 
userRouter.post("/login", loginController); 

module.exports = userRouter;

