module.exports = {
  port: process.env.PORT || 8000,
  mongodb: {
    uri: process.env.MONGODB_URI
  },
  cors: {
    origin: [
      'https://learnflow.vercel.app',      // Add your Vercel domain
      'https://www.learnflow.vercel.app',   // Add www subdomain
      process.env.FRONTEND_URL             // Flexible frontend URL from env
    ].filter(Boolean), // Remove falsy values
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400 // 24 hours in seconds
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  },
  logging: {
    level: 'error',
    showStack: false
  },
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", 'https://api.openai.com']
        }
      }
    }
  }
};
