const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end();
});

server.listen(3000);

/*
 socket.emit = nereden mesaj göndermek  istiyorsak onu gönderiyoruz
 örnek;
 socket.emit('merhaba de');
  burda merhaba de adında bir isim veriyoruz emite
 karşı tarafta da
 socket.on('merhaba de',()=>{
    console.log('MERHABALAR');
    });
 kodu ile öncelikle kullanıcı bağlandığında burda değer atayacağımız için emitlediğimiz ismi yazıyoruz.
 sonra da console.log'a merhaba yazdırtıyoruz.

 socket.on = ile de karşı taraftan onu karşılıyoruz

*/


//socket.io tarafında 3000 portuna gelen istekleri dinlemek için yazılır.
const io = socketio.listen(server);

//io nun altına sockets adında bir nesne var. connect bir event emitter dır.kullanıcı html sayfasına bağlandığında
//tetiklenerek yapılmak isteneni yaptırır
io.sockets.on('connect', (socket) => {
    console.log('Kullanıcı bağlandı');


    setTimeout((data) => {
        socket.emit('merhaba de',{name:'samed'});
    }, 2000);

    socket.on('isim',(data)=>{
        console.log('isim'+' '+ data.isim)
    });

    socket.emit('soyad',{soyadi:'pekedis'});



    socket.on('selam ver', (data) => {
        console.log('selamlar',data.name);
    });

    socket.on('disconnect', () => {
        console.log('kullanıcı ayrıldı');
    });
});