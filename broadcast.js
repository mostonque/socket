const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end();
});
server.listen(3000);

const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('Kullanıcı bağlandı');
    socket.emit('karsıla');


    socket.on('selam ver', () => {
        console.log('selam verildi')
    });

    //burda emitlenen mesajı alıp tüm kullanıcılara göstermek için,
    //bu kez burda emitliyoruz. ve tekrar html dosyamızdan bunu user adını kullanarak çekmemiz gerekiyor
    //
    socket.on('new-user', (data) => {
        socket.broadcast.emit('user', {adi: data.adi, soyadi: data.soyadi})
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı Ayrıldı');
    });
});