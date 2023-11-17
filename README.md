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

This does not mean you can just add a lot of forks. In the end your computer has an upperlimit of how many bits and data it can process at any given point in time. So for example with 6 requests at the same time processing the pbkdf2 function, it means that the 6 separate threads that are running, in 6 children (6 forks) we are balancing between every hash function called. The cpu now tries to do a little bit of work on every one of them. The result is that it now takes longer for EVERY one of them to complete. So it might be good to be able to handle 6 requests at one single time, but here you reach a bottleneck where you try to do too much at one single time.

Increasing the number of children beyond the available number of 'physical' or 'logical' cores on your computer, you will probably experience a nett negative effect of performance. So, clustering is GREAT, but do not go overboard with it.

# Logical cores

This regards to multi threading. If you have a dual core machine (e.g. 2 PHYSICAL cores), each core can process two threads at the same time. So that means 4 LOGICAL cores. Hence, the number of physical cores times the number of threads that these can process at any given point in time.

# PM2 cli

- start

pm2 start index-pm2.js -i 0

-i 0 => let pm2 set up the number of instances equal to your number of logical cores.

pm2 delete index (or your filename instead of index, here; index-pm2) - to kill the running servers
pm2 list
pm2 show index-pm2
pm2 monit

# Webworker threads

npm i --save webworker-threads

# MongoDB VSCode setup

1. Set up devcontainer
2. Update mongoURI in dev.js
3. (optional) add mongodb extension to devcontainer

# Redis

redis-cli ping
start node repl with node (in terminal)
const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl)
client.set('hi', 'there')
client.get('hi', (err, value) => console.log(value))
client.get('hi', console.log)
can save json with client.set('colors', JSON.stringify({ red: 'rojo' }))
but you will also get this back as json: { 'red': 'rojo' }, so you need to parse it

# Redis nested hash

hset('spanish', 'red', 'rojo') (hash set)

---key---------------value  
------------nested key---nested value
'spanish'----'red'----------'rojo'
-----------'orange'---------'naranja'

'german'-----'red'----------'rot'

# Redis query

We want query keys that are consistent but unique between query executions

const blogs = await Blog.find({ \_user: req.user.id });
here the user id is unique. But if you also would have
const tweets = await Tweets.find({ \_user: req.user.id });
req.user.id is not unique anymore.

# Automated headless browser testing

Puppeteer is used to start up chromium:
https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix

Browser represents an open browser window
Page represents one individual tab

# AWS

Create S3 Bucket
Set up IAM policy to allow actions
Create IAM user
Create access key

1. npm install --save aws-sdk
2. npm i --save uuid

Set up CORS for the bucket (bucket => permissions => cors config)
