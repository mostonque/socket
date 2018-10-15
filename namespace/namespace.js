const http=require('http');
const socketio=require('socket.io');
const server=http.createServer((req,res)=>{
    res.end();
});
server.listen(3000);
const io=socketio.listen(server);

const nsp=io.of('/deneme');
nsp.on('connection',(socket)=>{
    console.log('kullanıcı bağlandı');


    setTimeout(()=>{
        socket.emit('welcome')
    },500);


    socket.on('msg',(msg)=>{
        nsp.emit('new name',{name:'Serhat',msg:msg.msg});
    //socket.emit dersek  sadece isteği  yapan mesajı görür mesaj yada datayı
    //ama nsp.emit demek o namespace e bağlı olan tüm clientlere (kişilere)gönderilir.
        //broadcast burda çalışmaz. herkese yaymak için namespacesin tanımlı olduğu
        // değişkeni yazdırırız yani burdaki değişken" nsp "
    // socket.emit('new name',{name:'Serhat'});
    });

    socket.on('disconnect',()=>{
        console.log('kullanıcı ayrıldı');
    });
});

const nsp2=io.of('/test');
nsp2.on('connection',(socket)=>{
    console.log('connected nsp2');

    socket.on('message',(data)=>{
        nsp2.emit('new message',{msg:data.msg});
    });

    socket.on('disconnect',()=>{
        console.log('disconnected  nsp2');
    });
});