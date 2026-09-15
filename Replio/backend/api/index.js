const app = require("../dist/app");

// Vercel serverless function handler
module.exports = (req, res) => {
  app(req, res);
};
