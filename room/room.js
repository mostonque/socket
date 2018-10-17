const http=require('http');
const socketio=require('socket.io');
const server=http.createServer((req,res)=>{
    res.end();
});
server.listen(3000);
const io=socketio.listen(server);

io.on('connection',(socket)=>{
    console.log('connected');

    socket.on('joinRoom',(data)=>{
      socket.join(data.name,()=>{
          io.to(data.name).emit('new join',{count:getOnlineCount(io,data)});
          socket.emit('me',{name:data.name});
      });
    });

    socket.on('leaveRoom',(data)=>{
        socket.leave(data.name,()=>{
        io.to(data.name).emit('leavedRoom',{count:getOnlineCount(io,data)});
        socket.emit('leaveMsg',{name:data.name});
        })
    });
});

const getOnlineCount=(io,data)=> {
    const room=io.sockets.adapter.rooms[data.name];
    //daha kısa kod hali şu
    // return room ? room.lenght :0
    //yani room varsa room varsa room.lenght i bana ver yoksa 0 döndür
    if (room){
        return room.length;
    } else{
        return 0;
    }
};