const express = require("express"); 
const app = express(); 
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000; 

app.use(cors()); 
app.use(express.json()); 

io.on("connection", socket => {
   console.log(socket.id)

   socket.on('Join_Room', (data) => {
      socket.join(data)
      console.log("User joined room: " + data);
   });
   
   socket.on('Disconnect', ()=> {
      console.log('User disconnected')
   });
});

server.listen(port, () => console.log("Server running on port" + port)); 
