$(function(){
	var socket = io();
	var username;
	
	var xTurn = true;
	
	
	$('#00').click(function(){		
		var coord = $(this).attr('id');
		console.log(coord);
		
		if($(this).html() == ""){//cell is empty, can be filled in
			//console.log("NULL VALUE");
			if(xTurn == true){
				$(this).append("<li class='x'>X</li>");
				socket.emit('mark board', {cell: "00", val: "X"});
				xTurn = false;
			}
			else{
				$(this).append("<li class='o'>O</li>");
				socket.emit('mark board', {cell: "00", val: "O"});
				xTurn = true;
			}
		}
		









			
	});
	
	


	




	
	socket.on('new user', function(data){
		console.log(data.username + " has connected");
		//$('#messages').append('<li>' + data.username + ' has connected. Say hello!</li>');
	});


});



