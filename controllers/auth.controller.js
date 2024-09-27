import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../db/models/user.js';
import Utils from '../utils/common.util.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const createdUser = await UserModel.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword
    });

    if (createdUser) {
      return res.status(200).json({
        success: true,
        message: 'User registered successfully'
      });
    }
  } catch (error) {
    console.error('register(): catch error: ', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await UserModel.findOne({
      email: email
    })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const authToken = Utils.generateAuthToken(user);
    return res.status(200).json({
      success: true,
      message: 'User logged successfully',
      data: {
        userId: user.id,
        email: user.email,
        role: user.role,
        access: authToken.access,
        expiresAt: authToken.access_expire_time,
        refresh: authToken.refresh,
        emailVerified: user.email_verified,
        // phoneVerified: user.phone_verified
      }
    });
    
  } catch (error) {
    console.error('register(): catch error: ', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};