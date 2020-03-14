const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on("connection",socket=>{
    console.log('connection')
    let Room;
    const safeJoin = currentRoom => {
      socket.leave(Room);
      socket.join(currentRoom);
      Room = currentRoom;
    };

    socket.on('joinroom',roomid=>{
        //todo 从code中得到队名,
        //todo 确认连接者的角色 是选手还是裁判
        let teamName='todoname'
        safeJoin(roomid)
        //向别人发送加入消息
        socket.to(roomid).emit('teamin',teamName)
    })

    socket.on('bpmsg',msg=>{
        console.log(JSON.stringify(msg))
        io.to(Room).emit('bpmsg',msg)
    })

  

    //建立使用的data





})

http.listen(4444);