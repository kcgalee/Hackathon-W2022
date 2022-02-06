const express = require('express'); 
const app = express(); 
const io = require("socket.io").listen(server);
const cors = require('cors')

app.use(cors())
app.use(express.json()); 

const server = app.listen('3001', ()=> {
    console.log("Server running on Port 3001..."); 
});

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
