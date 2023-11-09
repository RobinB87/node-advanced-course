const https = require("https");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

// 7 tasks all completing simultaneously?
// libuv sees we want to perform various http requests
// neither libuv nor node has any code to handle all of this super low level
// operations that are involved with network requests.

// Libuv is actually delegating the work to our operating system OS
// which does the real http request
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
