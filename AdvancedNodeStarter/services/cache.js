const mongoose = require("mongoose");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);

const util = require("util");
//client.get = util.promisify(client.get); // overwrite the existing client.get get with util.promisify
client.hget = util.promisify(client.hget);

// monkey patching a libary...

// get reference to existing default exec function on a mongoose query
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

// use function and not arrow, as these have different implementations on the this keyword
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // const cacheValue = await client.get(key);
  const cacheValue = await client.hget(this.hashKey, key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result), "EX", 10);

  return result;
};
