const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
var app=express();
const port=process.env.PORT || 3000;
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {
  console.log('new user connected');

socket.on('createMessage' ,(message)=> {
  console.log('createMessage',message);
  io.emit('newMessage', {
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
  });
});

socket.on('disconnect', ()=> {
  console.log('user was disconnected');
});
});

server.listen(port, ()=> {
  console.log(`server is up on port ${port}`);
})
