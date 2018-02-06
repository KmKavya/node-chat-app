var socket=io();
socket.on('connect',function() {
  console.log(' connected to server');
});

socket.on('disconnect',function() {
  console.log(' disconnected to server');
});


socket.on('newMessage',function(message) {
  console.log(' new Message',message);

var li=jQuery('<li></li>');
li.text(`${message.from}: ${message.text}`);
jQuery('#messages').append(li);

});

 socket.on('newLocationMessage',function(message) {
   var li=jQuery('<li></li>');
   var a=jQuery('<a target="_blank">MyCurrentLocation</a>');
   li.text(`${message.from}:`);
   a.attr('href',message.url);
   li.append(a);
   jQuery('#messages').append(li);
 });

jQuery('#message-form').on('submit' ,function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  },function() {

  });

});

var locationButton=jQuery('#send-location');
locationButton.on('click',function() {
  if(!navigator.geolocation) {
    return alert('geolocation not supported by ur browser')
  }
  navigator.geolocation.getCurrentPosition(
    function (Position) {
socket.emit('createLocationMessage', {
  latitude:Position.coords.latitude,
  longitude:Position.coords.longitude
});
    },function() {
      alert('Unable to fetch the code');
    }
  );
});
