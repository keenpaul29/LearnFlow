const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const setupSecurity = (app) => {
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });

  // Apply rate limiting to all routes
  if (process.env.NODE_ENV === 'production') {
    app.use(limiter);
  }

  // Security headers with helmet
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.openai.com']
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  }));

  // Trust proxy (important for rate limiting behind reverse proxies)
  app.set('trust proxy', 1);
};

module.exports = setupSecurity;
