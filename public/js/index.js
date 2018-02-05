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
//
// socket.emit('createMessage' ,{
//   from:'kavya',
//   text:'Hi'
// }, function(data) {
//   console.log('got it',data);
// });
//

jQuery('#message-form').on('submit' ,function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from:'User',
    text:jQuery('[name=message]').val()
  },function() {

  });

});
