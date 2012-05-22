var express = require( 'express' ), 
    ejs = require( 'ejs' ),
    io = require( 'socket.io' )

 var app = module.exports = express.createServer();

 var title = 'Teste de chat do zero' ;
 var port = process.env.PORT;

 app.configure( function () {
   app.set( 'views' , __dirname + '/views' );
   app.set( 'view engine' , 'ejs' );
   app.set( 'view options' , { layout: false } );
   app.use(express. static (__dirname + '/public' ));
 } );
 app.get( '/views' , function (req, res) {
   res.render( 'index' , { locals: { port:port, title:title } } );
 } );

 app.listen(port);
 console.log( "Express server listening on port %d" , app.address().port);

 var socket = io.listen(app);

 // ▼ 接続時実行 ▼
 socket.sockets.on( 'connection' , function (client) {

   // ▼ クライアントからサーバへメッセージ送信 ▼
   client.on( 'msg send' , function (msg) {
     date = getDateAndTime();
     if (msg == '' ) return ;
     client.emit( 'msg push' , msg, date );
     client.broadcast.emit( 'msg push' , msg, date );
   } );
   // ▲ クライアントからサーバへメッセージ送信 ▲
 } );
 // ▲ 接続時実行 ▲

 // 現在の日時を YYYY/MM/DD hh:mm:dd 形式で返す関数
 function getDateAndTime() {
   dd = new Date ();
   year = (dd.getYear() < 2000 ? dd.getYear()+1900 : dd.getYear() );
   month = (dd.getMonth() < 9 ? "0" + (dd.getMonth()+1) : dd.getMonth()+1 );
   day = (dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate() );
   hour = (dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours() );
   minute = (dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes() );
   second = (dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds() );
   return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
 }