const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const config = require('../config');

const setupSecurity = (app) => {
  // Rate limiting
  if (process.env.NODE_ENV === 'production') {
    app.use(rateLimit(config.security.rateLimit));
  }

  // Security headers
  app.use(helmet(config.security.helmet));

  // Trust proxy (important for rate limiting behind reverse proxies)
  app.set('trust proxy', 1);
};

module.exports = setupSecurity;
