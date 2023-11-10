const mongoose = require("mongoose");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

const util = require("util");
client.get = util.promisify(client.get); // overwrite the existing client.get get with util.promisify

// monkey patching a libary...

// get reference to existing default exec function on a mongoose query
const exec = mongoose.Query.prototype.exec;

// use function and not arrow, as these have different implementations on the this keyword
mongoose.Query.prototype.exec = function () {
  console.log("IM ABOUT TO RUN A QUERY");
  console.log(this.getQuery());
  console.log(this.mongooseCollection.name);
  return exec.apply(this, arguments);
};
