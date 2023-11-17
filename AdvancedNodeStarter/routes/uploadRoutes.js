const AWS = require("aws-sdk");
const uuid = require("uuid/v1");
const keys = require("../config/keys");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "eu-central-1",
});

module.exports = (app) => {
  app.get("api/upload", (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl("putObject", {
      Bucket: "my-blog-bucket-temp",
      ContentType: "jpeg",
      Key: key,
    });
  });
};
