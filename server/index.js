const express = require('express');
const app = express();
const server = app.listen(3000,function(){
    console.log('Listening on port *: 3000');
})

const io = require('socket.io')(server);
//  데이터베이스 코드 start //
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'user_info'
});

connection.connect();

var sqlname='INSERT INTO users(name) VALUES(?)';

app.use(express.static('dist'));

var culname=null;
io.on('connection', (socket) => {
    console.log(socket.client.id); // Prints client socket id

    socket.on('userdata',(name) =>{
        culname=name;
        connection.query(sqlname,name,function(err,row,fields){
            if(err){
                console.log(err);
            }
            else{
                console.log('입장하신 분 ID:',row.insertId);
            }
        
        });
        io.emit('joinroom', (culname));
    });

    socket.on('chat-message', (data) => {
        io.emit('chat-message', (data));
        console.log(data);
    });      

});
// connection.end();