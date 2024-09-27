import jwt from 'jsonwebtoken';

export const authorizedToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization
  if (token != undefined && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }
  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'token is not passed'
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: 'invalid token'
    })
  }
};