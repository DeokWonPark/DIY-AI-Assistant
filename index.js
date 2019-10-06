const express = require('express');
const app = express();
const server = app.listen(3000,function(){
    console.log('Listening on port *: 3000');
})

const io = require('socket.io')(server);

app.use(express.static('dist'));

var culname=null;
io.on('connection', (socket) => {
    console.log(socket.client.id); // Prints client socket id

    socket.on('chat-message', (data) => {
        io.emit('chat-message', (data));
        console.log(data);
    });
    socket.on('typing', (data) => {
        io.emit('typing', (data));
        console.log(data);
    });          

});
// connection.end();