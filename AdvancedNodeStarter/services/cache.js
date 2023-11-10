const mongoose = require("mongoose");

// get reference to existing default exec function on a mongoose query
const exec = mongoose.Query.prototype.exec;

// use function and not arrow, as these have different implementations on the this keyword
mongoose.Query.prototype.exec = function () {
  console.log("IM ABOUT TO RUN A QUERY");
  return exec.apply(this, arguments);
};
