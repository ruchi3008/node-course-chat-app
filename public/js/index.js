  var socket = io();
socket.on('connect',function (){
  console.log("Connected to server");
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(msg){
  console.log(`${msg.from} : ${msg.text}`);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(msg){
var li = jQuery('<li></li>');
var a = jQuery('<a target="_blank">My current location</a>');
li.text(`${msg.from}:`);
a.attr('href',msg.url);
li.append(a);
jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
  from : 'Admin',
  text : jQuery('[name=message]').val()
},function(){
});
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
  if (!"geolocation" in navigator) {
  return alert('Geolocation not supported by your browser');
} else {
   navigator.geolocation.getCurrentPosition(function(position) {
     console.log(position);
   socket.emit('createLocationMessage',{
     latitude :position.coords.latitude,
     longitude :position.coords.longitude
   });
 },function(){
   alert('Unable to fetch location');
 });
}
});
