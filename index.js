var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


var runningCount = 0;
var numUsers = 0;



app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	runningCount++;
	numUsers++;
	var assignedName = 'User ' + String.fromCharCode(64 + runningCount);
	console.log(assignedName + ' has connected.');
	socket.username = assignedName;
		
	
	socket.on('disconnect', function(){
		console.log(socket.username + ' has disconnected');
		numUsers--;
	});
	
	
	
	
	
});


http.listen(3000, function(){
	console.log('listening on *:\nhttp://localhost:3000/');
});