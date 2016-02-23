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
		cells[i][j]= null;
	}
}

function printBoard(){
		for(var i=0; i < 3; i++){
		console.log(cells[i][0] + "" + cells[i][1] + "" + cells[i][2]);
	}
	console.log("\n");
}



function checkWin(){

	//check the rows

	for(var i = 0; i < 3; i++){
		if(cells[i][0] != null && (
			(cells[i][0] == cells[i][1])&&
			(cells[i][0] == cells[i][2])&&
			(cells[i][1] == cells[i][2]))){
				//console.log("That's a win");
				return true;
		}
	}
	
	//check the columns
	for(var j = 0; j < 3; j++){
		if(cells[0][j] != null && (
			(cells[0][j] == cells[1][j])&&
			(cells[0][j] == cells[1][j])&&
			(cells[1][j] == cells[2][j]))){
				//console.log("That's a win");
				return true;
		}
	}
	
	//special (diagonals)
	
	if(cells[0][0] != null && (
		(cells[0][0] == cells[1][1])&&
		(cells[0][0] == cells[2][2])&&
		(cells[1][1] == cells[2][2]))){
			//console.log("That's a win");
			return true;
	}
	
	if(cells[0][2] != null && (
		(cells[0][2] == cells[1][1])&&
		(cells[0][2] == cells[2][0])&&
		(cells[1][1] == cells[2][2]))){
			//console.log("That's a win");
			return true;
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
		//console.log("cell marked: " + i + ", " + j + " with " + input.val);
		cells[i][j] = input.val;
		
		printBoard();

		if(checkWin()){
		//	console.log("That's a win!!");
			socket.emit('game over');
		}		
		
	});
	
	
	
});


http.listen(3000, function(){
	console.log('listening on *:\nhttp://localhost:3000/');
});