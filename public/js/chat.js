  var socket = io();

function scrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
    }
}
socket.on('connect',function (){
  var params = jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No error');
    }
  });
  console.log("Connected to server");
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
   console.log(users);
   var ol = jQuery('<ol></ol>');
   users.forEach(function (user) {
     ol.append(jQuery('<li></li>').text(user));
   });
   jQuery('#users').html(ol);
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
  scrollToBottom();
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
 scrollToBottom();
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
