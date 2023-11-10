const express = require("express");
const app = express();

// block the event loop example

// purpose of this function: try to use as much CPU processing power as possible for a set duration
function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {
    // this function is trying to execute this while loop as fast as it can for some set duration in ms
    // and do absolutely nothing else
  }
}

app.get("/", (req, res) => {
  doWork(5000); // processed inside of the event loop, now the event loop can do nothing else
  res.send("hi there");
});

app.listen(3000);
