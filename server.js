const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздача файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Новое анонимное подключение...');

    socket.on('chat message', (data) => {
        // Добавляем время к сообщению
        const msgData = {
            nick: data.nick || "ANON",
            text: data.text,
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        io.emit('chat message', msgData);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(Server started on port ${PORT});
});
