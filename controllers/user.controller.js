import { UserModel } from "../db/models/user.js";

export const userProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile data fetch successfully",
      data: user
    });
  } catch (error) {
    console.error("userProfile(): catch error: ", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
