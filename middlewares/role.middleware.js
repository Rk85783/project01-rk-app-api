import { errorMessages } from "../utils/error.messages.js";

/**
 * This method will validate token role for given grant roles.
 * @param {*} grantRoles An array of roles which you want to allow to access API
 * @author Rohit Kumar Mahor
 */
export const hasRole = (grantRoles) => {
  return function (req, res, next) {
    if (req.user) {
      const role = req.user.role;
      if (role && grantRoles.includes(role)) {
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: errorMessages.NOT_AUTHORIZED
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: errorMessages.AUTH_TOKEN_IS_NOT_VALID
      });
    }
  };
};
