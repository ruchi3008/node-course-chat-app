const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

var app = express();

var publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

  socket.on('createMessage',function(msg,callback){
    console.log(`${msg.from} : ${msg.text}`);
    io.emit('newMessage',generateMessage(msg.from,msg.text));
    callback('This is from the server');
    // socket.broadcast.emit('newMessage',{
    //   from : msg.from,
    //   text : msg.text,
    //   createdAt : new Date().getTime
    // });

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
