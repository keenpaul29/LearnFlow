module.exports = {
  port: process.env.PORT || 8000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/learnflow'
  },
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  },
  logging: {
    level: 'debug',
    showStack: true
  }
};
