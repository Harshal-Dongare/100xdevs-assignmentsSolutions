
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second


let numberOfRequestsForUser = {};

// this function sets the object to empty for every one second
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000)

app.use(function(req, res, next){
  // stores the user id
  const userId = req.headers["user-id"];

  // from the 2nd request, control will reach here
  if(numberOfRequestsForUser[userId]){
    // increment the request count 
    numberOfRequestsForUser[userId]++;

    // if the request are more than 5, block the user
    if(numberOfRequestsForUser[userId] > 5){
      res.status(404).send("No entry");
    }else{
      next();
    }
  }
  else{
    // if the request is first time, then it will add the user and its request count in the numberofrequest obj
    // it will use userId as a key and 1 as a value which is nothing but request count
    numberOfRequestsForUser[userId] = 1;
    next();
  }
})

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;