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
mongoose.Query.prototype.exec = async function () {
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  const cacheValue = await client.get(key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result));

  return result;
};
