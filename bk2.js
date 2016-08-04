
var io 				= require('socket.io')(3000);
var shortId 		= require('shortid');

var clients			= [];

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


io.on('connection', function (socket) {
    console.log("connection...");
    
    var currentUser;

    socket.on('disconnect', function () {
        console.log("disconnect...");
    });

    socket.on('close', function () {
        console.log("close...");
    });
    
    socket.on('send', function (data) {

        var dataJson = JSON.stringify(data);

        console.log(dataJson.toString());

    });


    socket.on('OnApplicationQuit', function (){
        console.log("OnApplicationQuit...");
    });


    socket.on('OnApplicationPause', function (){
        console.log("OnApplicationPause...");
    });


});


console.log("------- server is running -------");