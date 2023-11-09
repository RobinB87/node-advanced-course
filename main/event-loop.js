// fake code that pretends to be the event loop
// node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // check one: any pending setTimeout, setInterval, setImmediated?
  // if one of these functions is still pending, our program does not exit

  // check two: any pending OS tasks? (like server listening to port)
  // check three: any pending long running operations (like fs module)
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// every time the event loop runs, the entire body of this while loop executes in one 'tick'
// these 5 steps are executed during every execution of the event loop
// during every single 'tick'
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called
  // (setTimeout, setInterval)
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // (like handling an incoming request) (99% of the code we write)
  // 3) Pause execution. Continue when...
  // - a new pendingOSTasks is done
  // - a new pendingOperations is done
  // - a timer is about to complete
  // 4) Look at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events => cleaning up code
  // eg readStream.on('close', () => console.log('cleanup code'));
}

// exit back to terminal
