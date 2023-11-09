// fake code that pretends to be the event loop

// node myFile.js
myFile.runContents();

function shouldContinue() {
  // check one: any pending setTimeout, setInterval, setImmediated?
  // if one of these functions is still pending, our program does not exit

  // check two: any pending OS tasks? (like server listening to port)
  // check three: any pending long running operations (like fs module)
}

// every time the event loop runs, the entire body of this while loop executes in one 'tick'
while(shouldContinue()) {

}



// exit back to terminal