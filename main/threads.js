const crypto = require("crypto");

const start = Date.now();
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  // this callback is run after the pbkdf2 is finished
  console.log("1:", Date.now() - start);
});

// both these pbkdf2 methods are executed more or less at the exact same time.
// this second one does NOT wait for the first one to be finished
// the computation in the pbkdf2 is delegated to the c++ libuv library, which makes use of a thread pool:
//  - so node + libuv might compute outside of the single thread
//  - the thread pool has 4 threads that can be used to run computational intensive tasks
//  - so next to the event loop, there are 4 other threads that can be used to offload some heavy work
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2:", Date.now() - start);
});
