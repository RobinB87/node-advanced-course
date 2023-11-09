const crypto = require("crypto");

const start = Date.now();
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  // this callback is run after the pbkdf2 is finished
  console.log("1:", Date.now() - start);
});

// both these pbkdf2 methods are executed more or less at the exact same time.
// this second one does NOT wait for the first one to be finished
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});
