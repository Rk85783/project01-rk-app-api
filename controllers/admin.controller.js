import bcrypt from "bcryptjs";

import { UserModel } from "../db/models/user.js";
import { errorMessages } from "../utils/error.messages.js";

/**
 * Create an new admin
 * @param {*} req 
 * @param {*} res 
 * @author Rohit Kumar Mahor
 */
export const adminCreate = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(200).json({
        success: true,
        message: "All fields are required"
      });
    }
    await UserModel.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      role: "ADMIN"
    });
    res.status(200).json({
      success: true,
      message: "Added successfully"
    });
  } catch (error) {
    console.log("adminCreate(): catch error : ", error);
    res.status(500).json({
      success: 500,
      message: errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};

/**
 * Return all admins list
 * @param {*} req 
 * @param {*} res 
 * @author Rohit Kumar Mahor
 */
export const adminList = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the offset (skip) based on 1-based indexing
    const skip = (pageNumber - 1) * limitNumber;

    // Build the search query
    const searchQuery = {
      role: 'ADMIN',
      $or: [
        { firstName: { $regex: search, $options: 'i' } }, // Case-insensitive search
        { lastName: { $regex: search, $options: 'i' } }
      ]
    };

    // Determine sort order
    const sortOrderValue = sortOrder === 'asc' ? 1 : -1;

    const adminArray = await UserModel.find(searchQuery)
      .select('-password')
      .sort({ [sortBy]: sortOrderValue })
      .skip(skip)
      .limit(limitNumber);

    const totalAdmins = await UserModel.countDocuments(searchQuery); // Count total matching admins

    res.status(200).json({
      success: true,
      message: "List fetched successfully",
      data: adminArray,
      pagination: {
        total: totalAdmins,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalAdmins / limitNumber)
      }
    });
  } catch (error) {
    console.error("adminList(): catch error:", error);
    res.status(500).json({
      success: false,
      message: errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};

/**
 * View an single admin
 * @param {*} req 
 * @param {*} res 
 * @author Rohit Kumar Mahor
 */
export const adminView = async (req, res) => {
  try {
    const { id } = req.params;
    const adminData = await UserModel.findById(id).select('-password');
    if (!adminData) {
      return res.status(404).json({
        success: true,
        message: errorMessages.USER_NOT_FOUND
      });
    }
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: adminData
    });
  } catch (error) {
    console.error("adminView(): catch error:", error);
    res.status(500).json({
      success: false,
      message: errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};

/**
 * Update an admin
 * @param {*} req 
 * @param {*} res 
 * @author Rohit Kumar Mahor
 */
export const adminEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(200).json({
        success: true,
        message: "All fields are required"
      });
    }

    const updatedAdmin = await UserModel.findByIdAndUpdate(id, {
      firstName,
      lastName
    });
    if (!updatedAdmin) {
      return res.status(404).json({
        success: true,
        message: errorMessages.USER_NOT_FOUND
      });
    }
    res.status(200).json({
      success: true,
      message: "Updated successfully"
    });
  } catch (error) {
    console.log("adminEdit(): catch error : ", error);
    res.status(500).json({
      success: 500,
      message: errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};

/**
 * Delete an admin
 * @param {*} req 
 * @param {*} res 
 * @author Rohit Kumar Mahor
 */
export const adminDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const adminData = await UserModel.findByIdAndDelete(id);
    if (!adminData) {
      return res.status(404).json({
        success: false,
        message: errorMessages.USER_NOT_FOUND
      })
    }
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: adminData
    });
  } catch (error) {
    console.error("adminDelete(): catch error:", error);
    res.status(500).json({
      success: false,
      message: errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};

/**
 * Show self-profile data for admin
 * @param {*} req 
 * @param {*} res 
 * @author Rohit Kumar Mahor
 */
export const adminProfile = async (req, res) => {
  try {
    const adminProfile = await UserModel.findById(req.user.userId);
    res.status(200).json({
      success: true,
      message: "Profile details fetch successfully",
      data: adminProfile
    });
  } catch (error) {
    console.log("adminProfile(): catch error : ", error);
    res.status(500).json({
      success: 500,
      message: errorMessages.INTERNAL_SERVER_ERROR
    });
  }
};
