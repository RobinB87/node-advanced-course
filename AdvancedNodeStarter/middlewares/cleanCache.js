const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  // call the next function (which is the route handler) and wait untill it has done everything it needs to do
  await next();

  clearHash(req.user.id);
};
