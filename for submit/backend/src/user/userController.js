import UserRepository from "./userRepository.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  // Register User
  register = async (req, res) => {
    try {
      const { username, password, email, gender } = req.body;

      // Check if the email already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ status: false, message: 'The user already exists.' });
      }

      // Hash the password and create a new user
      const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));
      const user = await this.userRepository.add(username, hashPassword, email, gender);
      return res.status(201).json({ status: true, user });
      
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  }

  // Login User
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
    
        
      // Check if the email exists
      const user = await this.userRepository.findByEmail(email);
      console.log('in controller user', user);
      
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: 'Incorrect password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Store token in session or send as response
      req.session.user = { id: user._id, email: user.email, token:token };
      return res.status(200).json({ status: true,user:token });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  }

  // Change Password
  changePass = async (req, res) => {
    try {
      const { id, newPassword } = req.body;
      const hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT));

      const result = await this.userRepository.changePassword(id, hashPassword);
      if (result) {
        return res.status(200).json({ status: true, message: 'Password reset successfully' });
      } else {
        return res.status(400).json({ status: false, message: 'Password reset failed' });
      }
      
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  }

  // OTP Verification
  checkOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(404).json({ status: false, message: 'Email not found' });
      }

      if (user.randomKey === otp && Date.now() < new Date(user.expiresAt).getTime()) {
        return res.status(200).json({ status: true, user: user._id });
      } else {
        return res.status(400).json({ status: false, message: 'Invalid or expired OTP' });
      }

    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  }

  // Forgot Password and Send OTP
  forgot = async (req, res) => {
    try {
      const { email } = req.body;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(404).json({ status: false, message: 'No Email ID found' });
      }

      // Generate OTP
      const createResetKey = Math.floor(Math.random() * 90000) + 10000;

      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.USER_ID,
          pass: process.env.USER_PASS
        }
      });

      const mailOptions = {
        from: process.env.USER_ID,
        to: email,
        subject: 'RESET OTP',
        text: `The Reset OTP is ${createResetKey}`
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Failed to send OTP' });
        } else {
          // Update OTP in the user record
          const updateOtp = await this.userRepository.updateOtp(createResetKey, email);
          if (updateOtp) {
            return res.status(200).json({ status: true, message: 'OTP sent successfully' });
          }
          console.log('Email sent: ', info.response);
        }
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  }
}

export default UserController;





























