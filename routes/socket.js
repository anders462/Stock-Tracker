
"use strict"

module.exports = function(io){

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('stock', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('stock', function(msg){
    io.emit('stock', msg);
  });
});

}
