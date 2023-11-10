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

# Express

npm init
npm install --save express

# Clustering

By default node starts once, eg the index.js and creates one instance.

When using clustering, the first time you start node, the cluster manager is started. You get one copy of node which is the cluster manager.

The CM is then responsible for starting up worker instances. These are then responsible for handling incoming requests. To create these instances, the CM is going to 'require in' the cluster module from the node standard library (a standard library, just like fs or crypto).
This cluster module has one method called 'fork'. If you call this method from within the CM, something very interesting happens.

- node internally goes back to the index.js file and executes it a second time.
- this time in a slightly different mode: this now starts up our worker instance.
- so the index.js is going to be executed multiple times, first to create a CM, and every time after that a worker instance
