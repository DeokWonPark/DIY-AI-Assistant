const express = require('express');
const fs = require("fs"); //s
const app = express();
const server = app.listen(3000,function(){
    console.log('Listening on port *: 3000');
})

const io = require('socket.io')(server);
const dialogflow = require("dialogflow");  //s
const keyFile = JSON.parse(fs.readFileSync("key.json"));  //s

const projectId = keyFile["project_id"];
const privateKey = keyFile["private_key"];
const clientEmail = keyFile["client_email"];

console.log(projectId, privateKey, clientEmail);

let config = {
    credentials: {
      private_key: privateKey,
      client_email: clientEmail
    }
  };
const sessionClient = new dialogflow.SessionsClient(config);

//  데이터베이스 코드 start //
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'apmsetup',
  database : 'user_info'
});

connection.connect();

var sqlname='INSERT INTO users(client_id, name) VALUES(?,?)';
var sqlselname='SELECT name FROM users WHERE client_id=?';
var sqldelname='DELETE FROM users WHERE client_id=?';
var sqldbname='SELECT name FROM users';
var sqlmsg='INSERT INTO msgdb(name, msg) VALUES(?,?)';
var sqlsearch="SELECT * FROM msgdb WHERE msg LIKE CONCAT('%', ?,  '%')";

//app.use(express.static('dist'));  //dist 파일 접근허용

var prams=[];
var pramsmsg=[];
var culname=null;
var client_id=null;

io.on('connection', (socket) => {
    console.log(socket.client.id); // Prints client socket id
    client_id=socket.client.id;
    socket.on('userdata',(name) =>{
        culname=name;
        prams[0]=client_id;
        prams[1]=culname;
        connection.query(sqlname,prams,function(err,rows,fields){ //유저 접속시 db insert
            if(err){
                console.log(err);
            }
            else{
                console.log('입장하신 분 ID:',rows.insertId);
            }
        
        });
        io.emit('joinroom', (culname));
        // io.emit('dbuser',(rows));
        connection.query(sqldbname,function(err,rows,fields){ //유저 디비 정보 userlist로 보낼려고
            if(err){
                console.log(err);
            }
            else{
                console.log('보내@@@@@@@@@@@');
                io.emit('dbuser',(rows));
            }
        })
    });

    //   클라이언트 접속 해제 시 DB에서 정보 제거 start  //
    socket.on('disconnect',()=>{
        console.log("연결종료"+socket.id);
        connection.query(sqlselname,socket.id,function(err,rows,fields){ //접속해제시 누가나갔는지 알려고 select
            if(err){
                console.log(err);
            }
            else{
                io.emit('outroom',(rows[0].name));
                console.log(rows[0].name);
            }
        });

        connection.query(sqldelname,socket.id,function(err,rows,fields){ //접속해제시 delete
            if(err){
                console.log(err);
            }
            else{
                console.log('디비 딜리트 정상동작');
            }
        })

    });

    //   클라이언트 접속 해제 시 DB에서 정보 제거 end  //

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data)); //나를 제외한 모든 사용자 에게만
        //await tryDF(data.message);
        console.log(data);
        pramsmsg[0]=data.name;
        pramsmsg[1]=data.message;
        connection.query(sqlmsg,pramsmsg,function(err,rows,fields){
            if(err){
                console.log(err);
            }
            else{
                console.log("메세지 정상적인 추가");
            }
        })
    });      

    socket.on('chat-messagebot', (data) => {
        //socket.emit('chat-messagebot', (data)); //나한테만
        tryDF(data.message);
        console.log(data);
        // pramsmsg[0]=data.name;
        // pramsmsg[1]=data.message;
        // connection.query(sqlmsg,pramsmsg,function(err,rows,fields){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log("메세지 정상적인 추가");
        //     }
        // })
    });      


    async function tryDF(data) {
        let response = await detectIntent(projectId, socket.client.id, data, "ko-KR");
        console.log("response:" + response.queryResult.fulfillmentText);
        // console.log(response.queryResult.action);
        // console.log(response.queryResult.parameters);
        // console.log(response.queryResult.allRequiredParamsPresent);
        //console.log(response.queryResult.outputContexts);
    
         let payload = response.queryResult.fulfillmentMessages.find(elem=>{return elem.message==='payload'});
         if (payload){console.log(payload.payload.fields.hint.stringValue);}
    
        socket.emit("chat-messagebot", {
          message: "비틀즈: " + response.queryResult.fulfillmentText
        });
      }

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
        console.log(data);
    }); 
    
    socket.on('search', (data) => {
        connection.query(sqlsearch,data.keyword,function(err,rows,fields){
            if(err){
                console.log(err);
            }
            else{
                socket.emit('search', (rows)); //검색한 사용자에게만
                console.log(rows);
            }
        })
    });   


});

async function detectIntent(projectId, sessionId, query, languageCode) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode
        }
      }
    };
  
    // if (contexts && contexts.length > 0) {
    //   request.queryParams = {
    //     contexts: contexts,
    //   };
    // }
  
    const responses = await sessionClient.detectIntent(request); //dialogflow 제공함수 핵심
    return responses[0]; //response에 담긴다
  }


// connection.end();