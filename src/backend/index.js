const express = require("express"); 
const app = express(); 
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000; 
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http); 

io.on("connection", socket => {
   console.log("User connection");
});

server.listen(port, () => console.log("Server running on port" + port)); 
// Terminal : cd backend
//           npm i -g nodemon
//           nodemon index.js