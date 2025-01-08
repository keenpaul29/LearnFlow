const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Log the entire Authorization header for debugging
    console.log('Full Authorization Header:', req.headers.authorization);

    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ 
        message: 'No authentication token provided',
        details: 'Authorization header is missing or invalid' 
      });
    }

    // Add more detailed token verification logging
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Decoded Token:', decoded);
      req.user = decoded;
      next();
    } catch (verifyError) {
      console.error('Token Verification Error:', verifyError);
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        error: verifyError.message,
        details: verifyError.name
      });
    }
  } catch (error) {
    console.error('Authentication Middleware Error:', error);
    res.status(500).json({ 
      message: 'Authentication error', 
      error: error.message 
    });
  }
};

module.exports = auth;
