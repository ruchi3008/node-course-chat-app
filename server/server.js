const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;

var app = express();

var publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage',{
    from :'Pukku',
    text :'Hi Poochu',
    createdAt : new Date().getTime()
  });

  socket.on('createMessage',function(msg){
    console.log(`${msg.from} : ${msg.text}`);
  });

  socket.on('disconnect',() => {
    console.log('User was disconnected');
  });
});
// app.get('/',(req,res) => {
//   res.send('abc');
// });

server.listen(port,() => {
  console.log(`Server listening on port ${port}`);
});
