import express from 'express';
import UserController from './userController.js';

const userController = new UserController();


const userRought = express.Router();

userRought.post('/register',userController.register)
userRought.post('/login',userController.login)
userRought.post('/forgot',userController.forgot)
userRought.post('/checkOtp',userController.checkOtp)
userRought.post('/changePass',userController.changePass)
//userRought.post('/forget',userController.)



export default userRought;