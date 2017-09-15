var socket = io();
socket.on('connect',function (){
  console.log("Connected to server");
  socket.emit('createMessage',{
    from : 'Poochu',
    text : 'Hi Pukku'
  });
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(msg){
  console.log(`${msg.from} : ${msg.text}`);
});
