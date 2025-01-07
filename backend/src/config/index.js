const development = require('./development');
const production = require('./production');

const environment = process.env.NODE_ENV || 'development';
const config = {
  development,
  production
}[environment];

if (!config) {
  throw new Error(`No configuration found for environment: ${environment}`);
}

module.exports = config;
