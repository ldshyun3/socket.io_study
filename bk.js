/**
 * Created by example on 2016-06-06.
 */
/**
 * Created by example on 2016-06-04.
 */
/**
 * Created by example on 2016-06-04.
 */

/**
 * Module dependencies.
 */
/*
 var io = require('socket.io')();

 io.on('connection', function(socket){
 console.log("------- server is connection -------");
 });
 io.listen(3000);
 */
/*
 var io = require('socket.io');

 io.on('connection', function(socket){
 console.log("------- server is connection -------");
 });

 io.listen(3000);
 */
/*
 // socket.io : 0.9.6 , npm install socket.io@0.9.6
 var io = require('socket.io').listen(3000);

 io.sockets.on('connection', function (socket) {
 io.sockets.emit('this', { will: 'be received by everyone' });

 socket.on('private message', function (from, msg) {
 console.log('I received a private message by ', from, ' saying ', msg);
 });

 socket.on('disconnect', function () {
 io.sockets.emit('user disconnected');
 });
 });
 */
/*
 var io = require('socket.io')();

 io.on('connection', function(socket){
 console.log("------- server is connection -------");
 });
 io.listen(3000);

 console.log("------- server is running -------");
 */
/*
 // npm socket.io 1.4.6
 var io 				= require('socket.io')(3000);
 var shortId 		= require('shortid');


 var clients			= [];

 io.on('connection', function (socket) {

 var currentUser;

 socket.on('USER_CONNECT', function (){

 console.log('Users Connected ');
 for (var i = 0; i < clients.length; i++) {


 socket.emit('USER_CONNECTED',{

 name:clients[i].name,
 id:clients[i].id,
 position:clients[i].position

 });

 console.log('User name '+clients[i].name+' is connected..');

 };

 });

 socket.on('PLAY', function (data){
 currentUser = {
 name:data.name,
 id:shortId.generate(),
 position:data.position
 }

 clients.push(currentUser);
 socket.emit('PLAY',currentUser );
 socket.broadcast.emit('USER_CONNECTED',currentUser);

 });

 socket.on('disconnect', function (){

 socket.broadcast.emit('USER_DISCONNECTED',currentUser);
 for (var i = 0; i < clients.length; i++) {
 if (clients[i].name === currentUser.name && clients[i].id === currentUser.id) {

 console.log("User "+clients[i].name+" id: "+clients[i].id+" has disconnected");
 clients.splice(i,1);

 };
 };

 });

 socket.on('MOVE', function (data){

 // currentUser.name = data.name;
 // currentUser.id   = data.id;
 currentUser.position = data.position;

 socket.broadcast.emit('MOVE', currentUser);
 console.log(currentUser.name+" Move to "+currentUser.position);


 });


 });


 console.log("------- server is running -------");
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'xml_study'
});

connection.connect();
/*
 var query = "SELECT *, MAX(progress) as progress FROM User_Achievements WHERE user='aaa' GROUP BY idx";
 connection.query(query, function(err, rows, fields) {
 if (err) throw err;

 //console.log("count: " + rows.length + " , " + rows[0].length);

 for (var i = 0; i < rows.length; i++) {
 //console.log(i+"");
 console.log("no: " + rows[i].no + " , user: " + rows[i].user + " , progress: " + rows[i].progress + " , send_time: " + rows[i].send_time);
 };
 //console.log('The solution is: ', rows["0"].Resource);
 });
 */



var io 				= require('socket.io')(3000);
var shortId 		= require('shortid');

//io.set('heartbeat timeout', 4000);
//io.set('heartbeat interval', 2000);
var clients			= [];
/*
 io.on('timeout', function(){
 //my treatment
 console.log("timeout...");
 });

 io.on('disconnect', function () {
 console.log("disconnect...");
 });
 */
io.on('connection', function (socket) {
    console.log("connection...");
    var currentUser;
    /*
     socket.on('timeout', function () {
     console.log("disconnect...");
     });
     */
    socket.on('disconnect', function () {
        console.log("disconnect...");
    });

    socket.on('close', function () {
        console.log("close...");
    });
    socket.on('send', function (data) {

        var dataJson = JSON.stringify(data);

        console.log(dataJson.toString());
        console.log("data.version: " + data.version);
        console.log("data.Category : " + data.Category);
        console.log("data.Crops: " + data.Crops);

        for (var key in data.Crops) {
            console.log('key:' + key + ' value:' + data.Crops[key]);
            // Output
            // key:key value:value
            // key:anotherKey value:anotherValue
        }


        //var query = "INSERT INTO test3 (`no`, `data`) VALUES (null, 'aaa');";
        var query = "INSERT INTO test3 (`no`, `data`) VALUES (null, '" + dataJson.toString() + "');";
        connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log("err");
            }

            //console.log("count: " + rows.length + " , " + rows[0].length);
            /*
             for (var i = 0; i < rows.length; i++) {
             //console.log(i+"");
             console.log("no: " + rows[i].no + " , user: " + rows[i].user + " , progress: " + rows[i].progress + " , send_time: " + rows[i].send_time);
             };
             */
            console.log("ok");

            connection.end();
            //console.log('The solution is: ', rows["0"].Resource);
        });

        //console.log("data.Crops.Wheat : " + data.Crops.Wheat);


    });


    socket.on('OnApplicationQuit', function (){
        console.log("OnApplicationQuit...");
        /*
         socket.broadcast.emit('USER_DISCONNECTED',currentUser);
         for (var i = 0; i < clients.length; i++) {
         if (clients[i].name === currentUser.name && clients[i].id === currentUser.id) {

         console.log("User "+clients[i].name+" id: "+clients[i].id+" has disconnected");
         clients.splice(i,1);

         };
         };
         */

    });

    socket.on('OnApplicationPause', function (){
        console.log("OnApplicationPause...");
        /*
         socket.broadcast.emit('USER_DISCONNECTED',currentUser);
         for (var i = 0; i < clients.length; i++) {
         if (clients[i].name === currentUser.name && clients[i].id === currentUser.id) {

         console.log("User "+clients[i].name+" id: "+clients[i].id+" has disconnected");
         clients.splice(i,1);

         };
         };
         */

    });


    socket.on('USER_CONNECT', function (){

        console.log('Users Connected ');
        for (var i = 0; i < clients.length; i++) {


            socket.emit('USER_CONNECTED',{

                name:clients[i].name,
                id:clients[i].id,
                position:clients[i].position

            });

            console.log('User name '+clients[i].name+' is connected..');

        };

    });

    socket.on('PLAY', function (data){
        currentUser = {
            name:data.name,
            id:shortId.generate(),
            position:data.position
        }

        clients.push(currentUser);
        socket.emit('PLAY',currentUser );
        socket.broadcast.emit('USER_CONNECTED',currentUser);

    });


    socket.on('MOVE', function (data){

        // currentUser.name = data.name;
        // currentUser.id   = data.id;
        currentUser.position = data.position;

        socket.broadcast.emit('MOVE', currentUser);
        console.log(currentUser.name+" Move to "+currentUser.position);


    });


});


console.log("------- server is running -------");