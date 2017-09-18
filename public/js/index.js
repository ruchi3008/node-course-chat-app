  var socket = io();
socket.on('connect',function (){
  console.log("Connected to server");
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage',function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    from : msg.from,
    text: msg.text,
    createdAt : formattedTime
  });
  jQuery('#messages').append(html);
  // console.log(`${msg.from} ${formattedTime}: ${msg.text}`);
  // var li = jQuery('<li></li>');
  // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(msg){
var formattedTime = moment(msg.createdAt).format('h:mm a');
var template = jQuery('#location-message-template').html();
var html = Mustache.render(template,{
  from : msg.from,
  url: msg.url,
  createdAt: formattedTime
});
 jQuery('#messages').append(html);
// var li = jQuery('<li></li>');
// var a = jQuery('<a target="_blank">My current location</a>');
// li.text(`${msg.from} ${formattedTime}:`);
// a.attr('href',msg.url);
// li.append(a);
// jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
e.preventDefault();
var messageTextBox = jQuery('[name=message]')
socket.emit('createMessage',{
  from : 'Admin',
  text : messageTextBox.val()
},function(){
  messageTextBox.val('');
});
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
  if (!"geolocation" in navigator) {
  return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending location');
  navigator.geolocation.getCurrentPosition(function(position) {
     locationButton.removeAttr('disabled').text('Send location');
     socket.emit('createLocationMessage',{
     latitude :position.coords.latitude,
     longitude :position.coords.longitude
   });
 },function(){
   locationButton.removeAttr('disabled').text('Send location');
   alert('Unable to fetch location');
 });
});
