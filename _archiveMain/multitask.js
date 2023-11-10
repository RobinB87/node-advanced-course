const crypto = require("crypto");
const https = require("https");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("HTTP:", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

// the request does not care what happends in the app, it makes use of the underlying OS
doRequest();

// while one thread is waiting on the hard drive to return with some statistics
// this thread picks up the first hash
fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

// then, when the first hash is finished, it picks up the readFile action again
doHash();
doHash();
doHash();
doHash();
