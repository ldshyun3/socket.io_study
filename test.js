
var io 				= require('socket.io')(3000);
var shortId 		= require('shortid');

var clients			= [];
/*
var cluster = require('cluster');   
var os      = require('os');

var numCPUs = os.cpus().length;

console.log("cluster.isMaster: " + cluster.isMaster);
console.log("numCPUs: " + numCPUs);

if (cluster.isMaster) {  
    
  // Master:
  // Let's fork as many workers as you have CPU cores

  for (var i = 0; i < numCPUs; ++i) {
      //console.log("i: " + i + " , cluster.fork(); ");
        cluster.fork();
  }
} else {
  // Worker:
  // Let's spawn a HTTP server
  // (Workers can share any TCP connection.
  //  In this case its a HTTP server
}
*/
var address ;

io.on('connection', function (socket) {
    
    
    
    console.log("Server: EC1 | connection | clientIp: " + clientIp);
    
    var currentUser;

    socket.on('disconnect', function () {
        console.log("Server: EC1 | disconnect | clientIp: " + clientIp);
    });

    socket.on('close', function () {
        console.log("Server: EC1 | close | clientIp: " + clientIp);
    });
    
    socket.on('send', function (data,fn) {
        //
        //address = socket.handshake.address

        var dataJson = JSON.stringify(data);

        // http://stackoverflow.com/questions/6458083/get-the-clients-ip-address-in-socket-io
        //var socketId = socket.id;
        var clientIp = socket.request.connection.remoteAddress;

        console.log("Server: EC1 | data: " + dataJson.toString() + "  , clientIp: " + clientIp);
        //console.log(dataJson.toString() + "   |   from= " + data.address + " : " + data.port);
        /*
        var currentUser = {
            //adress:data.Client,
            //id:shortId.generate(),
            Server:"EC`1",
            
        }
        
        clients.push(currentUser);
        socket.emit('fc_emit',currentUser );
        socket.broadcast.emit('fc_broadcast_emit',currentUser);
        */
        
        fn(true); //<-- 클라이언트의 emit의 콜백이 정의되있으면 send후 응답콜백으로 해줌.
        
    });


    socket.on('OnApplicationQuit', function (){
        console.log("OnApplicationQuit...");
    });


    socket.on('OnApplicationPause', function (){
        console.log("OnApplicationPause...");
    });


});


console.log("------- server is running -------");