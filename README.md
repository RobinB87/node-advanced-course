# Threads
When you start a node program, node automatically creates one thread and executes all code in that single thread.

# Event loop
Inside that thread is something called an event loop. This loop decides what the thread does at any single point in time.
The event loop is the absolute core of every node program that you run, and every program has exactly one event loop.


