// ========================================================
// Imports
// ========================================================
import process from 'node:process';

// ========================================================
// Config
// ========================================================
const env = process.env.NODE_ENV;
const development = {
  accessTokenDuration: '60m',
  refreshTokenDuration: '1d',
  cookieDuration: 24 * 60 * 60 * 1000,
};
const production = {
  accessTokenDuration: '30s',
  refreshTokenDuration: '1d',
  cookieDuration: 24 * 60 * 60 * 1000,
};

const config = { development, production };
// ========================================================
// Exports
// ========================================================

//We are exporting only one object depending on current NODE_ENV system variable
export default config[env];
