# Threads

When you start a node program, node automatically creates one thread and executes all code in that single thread.

# Event loop

- main/event-loop.js

Inside that thread is something called an event loop. This loop decides what the thread does at any single point in time.
The event loop is the absolute core of every node program that you run, and every program has exactly one event loop.

# Is node single threaded?

- main/threads.js

- The node event loopt IS single threaded
  Single thread means that a node program could only run on on core on our cpu.

- SOME of the functions included inside of the standard library of node are NOT single threaded. These run outside of the event loop, hence outside of the single thread.

So a lot of the node code that we write does not actually execute inside of the single thread entirely

# OS tasks

- main.async.js

# Espress

npm init
npm install --save express
