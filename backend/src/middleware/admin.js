const adminMiddleware = (req, res, next) => {
    // List of admin IDs from your authentication system
    const adminIds = ['1', '2', '3'];
  
    if (!req.user || !adminIds.includes(req.user.userId)) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
  
    next();
  };
  
  module.exports = adminMiddleware;