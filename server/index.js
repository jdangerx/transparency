var io = require('socket.io')(3001);

io.on('connection', (socket) => {
  console.log("connected");
  socket.on('room', (room) => {
    console.log(`joining room: ${room}`);
    socket.join(room);
    socket.room = room;
  }
  );
  socket.on('message', (msg) => {
    const { typed } = JSON.parse(msg);
    console.log(`typed: ${typed}`);
    socket.broadcast.to(socket.room).emit('message', typed);
  });
  socket.on('disconnect', () => {console.log("disconnected");});
});
