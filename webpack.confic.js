const Dotenv = require('dotenv-webpack')

module.exports = {
  // ... other webpack config options ...
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
}
