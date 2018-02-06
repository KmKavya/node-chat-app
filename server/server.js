const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;
var app=express();

var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

socket.on('createMessage' ,(message,callback)=> {
  console.log('createMessage',message);
  io.emit('newMessage', generateMessage(message.from,message.text));
  callback();
// socket.broadcast.emit('newMessage', {
//     from:message.from,
//     text:message.text,
//     createdAt:new Date().getTime()
//   });
});

socket.on('createLocationMessage',(coords)=> {
  io.emit('newLocationMessage',generateLocationMessage('Kavya',`${coords.latitude},${coords.longitude}`));
});
socket.on('disconnect', ()=> {
  console.log('user was disconnected');
});
});

server.listen(port, ()=> {
  console.log(`server is up on port ${port}`);
});
