const express = require('express');
const app = express();
const server = app.listen(3000,function(){
    console.log('Listening on port *: 3000');
})

const io = require('socket.io')(server);

app.use(express.static('dist'));

io.on('connection', (socket) => {
    console.log(socket.client.id); // Prints client socket id
    io.emit('joinroom', {nickname : socket.client.id});

    socket.on('chat-message', (data) => {
        io.emit('chat-message', (data));
        console.log(data);
    });      

});