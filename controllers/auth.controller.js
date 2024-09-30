import bcrypt from "bcryptjs";
import { UserModel } from "../db/models/user.js";
import Utils from "../utils/common.util.js";
import { errorMessages } from "../utils/error.messages.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    if (createdUser) {
      return res.status(200).json({
        success: true,
        message: "User registered successfully"
      });
    }
  } catch (error) {
    console.error("register(): catch error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const user = await UserModel.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: errorMessages.USER_NOT_FOUND
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const authToken = Utils.generateAuthToken(user);
    return res.status(200).json({
      success: true,
      message: "User logged successfully",
      data: {
        userId: user.id,
        email: user.email,
        role: user.role,
        access: authToken.access,
        expiresAt: authToken.accessExpireTime,
        refresh: authToken.refresh,
        emailVerified: user.emailVerified
      }
    });
  } catch (error) {
    console.error("register(): catch error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};
