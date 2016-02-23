var express = require('express');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);


var runningCount = 0;
var numUsers = 0;

var cells = new Array();
for(var i = 0; i < 3; i++){
	cells[i]= new Array();
	for(var j = 0; j < 3; j++){
		cells[i][j]=" _ ";
	}
}

function printBoard(){
		console.log("Printing....");
		for(var i=0; i < 3; i++){
		console.log(cells[i][0] + "" + cells[i][1] + "" + cells[i][2] + "\n");
	}
}







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
	
	
	
	socket.on('mark board', function(input){
		var i= parseInt(input.cell.charAt(0));
		var j = parseInt(input.cell.charAt(1));
		console.log("cell marked: " + i + ", " + j + " with " + input.val);
		
	});
	
	
	
});


http.listen(3000, function(){
	console.log('listening on *:\nhttp://localhost:3000/');
});