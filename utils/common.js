import jwt from "jsonwebtoken";

class Utils {
  static generateAuthToken = (user) => {
    const payload = {
      userId: user._id,
      role: user.role
    };
    const aToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        subject: "access",
        expiresIn: process.env.JWT_ACCESS_TOKEN_TIME
      }
    );
    const aDecoded = jwt.verify(aToken, process.env.JWT_SECRET_KEY);

    // Generate Refresh Token
    const rToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        subject: "refresh",
        expiresIn: process.env.JWT_REFRESH_TOKEN_TIME
      }
    );

    return {
      access: aToken,
      accessExpireTime: aDecoded.exp,
      refresh: rToken
    };
  };
}
export default Utils;
