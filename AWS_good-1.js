
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
    
    address = socket.handshake.address;
    
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
        console.log("from ' + address.address + ' : ' + address.port");

    });


    socket.on('OnApplicationQuit', function (){
        console.log("OnApplicationQuit...");
    });


    socket.on('OnApplicationPause', function (){
        console.log("OnApplicationPause...");
    });


});


console.log("------- server is running -------");



// ----------------아마존 ---------------------
// EC2 아마존용 리눅스 첫 생성시 
// vim /etc/yum.repos.d/epel.repo 열어서  enabled=0 -> enabled=1 교체후 재부팅

// 아마존 EC2시큐리그룹 인바운드 : 커스텀 TCP 3000 개방

// ---------------유니티 ------------------------------------
// 유니티 컴포넌트스크립트 : 주소는 임시주소. 
// url = "ws://ec2-00-00-00-00.ap-northeast-2.compute.amazonaws.com:3000/socket.io/?EIO=3&transport=websocket";
// 




