// backend/src/middleware/admin.js
const adminAuth = async (req, res, next) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }
      next();
    } catch (error) {
      res.status(403).json({ message: 'Admin access denied' });
    }
  };
  
  module.exports = adminAuth;