// fake code that pretends to be the event loop

// node myFile.js
myFile.runContents();

function shouldContinue() {
  // 
}

// every time the event loop runs, the entire body of this while loop executes in one 'tick'
while(shouldContinue()) {

}



// exit back to terminal