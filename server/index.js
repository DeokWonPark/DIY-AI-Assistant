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

var sqlname='INSERT INTO users(client_id, name) VALUES(?,?)';
var sqldelname='DELETE FROM users WHERE client_id=?';

app.use(express.static('dist'));  //dist 파일 접근허용

var prams=[];
var culname=null;
var client_id=null;

io.on('connection', (socket) => {
    console.log(socket.client.id); // Prints client socket id
    client_id=socket.client.id;
    socket.on('userdata',(name) =>{
        culname=name;
        prams[0]=client_id;
        prams[1]=culname;
        connection.query(sqlname,prams,function(err,row,fields){
            if(err){
                console.log(err);
            }
            else{
                console.log('디비 딜리트 정상동작');
            }
        
        });
        io.emit('joinroom', (culname));
    });

    socket.on('disconnect',()=>{
        console.log("연결종료"+socket.id);
        connection.query(sqldelname,socket.id,function(err,row,fields){
            if(err){
                console.log(err);
            }
            else{
                console.log('나가신 분 ID:',row.insertId);
            }
        })

    });

    socket.on('chat-message', (data) => {
        io.emit('chat-message', (data));
        console.log(data);
    });      

});


// connection.end();