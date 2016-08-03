
var io 				= require('socket.io')(3000);
var shortId 		= require('shortid');

var clients			= [];


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
        /*
        console.log("data.version: " + data.version);
        console.log("data.Category : " + data.Category);
        console.log("data.Crops: " + data.Crops);

        for (var key in data.Crops) {
            console.log('key:' + key + ' value:' + data.Crops[key]);
            // Output
            // key:key value:value
            // key:anotherKey value:anotherValue
        }
        */
        

    });


    socket.on('OnApplicationQuit', function (){
        console.log("OnApplicationQuit...");
    });


    socket.on('OnApplicationPause', function (){
        console.log("OnApplicationPause...");
    });


});


console.log("------- server is running -------");