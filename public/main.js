$(function(){
	var socket = io();
	var username;
	
	var xTurn = true;
	


	$('#game').click(function(){
		console.log("click");
	});
	
	$('#00').click(function(){
		//console.log("0,0");
		//console.log($(this).html());
		if($(this).html() == ""){//cell is empty, can be filled in
			//console.log("NULL VALUE");
			if(xTurn == true){
				$(this).append("<li class='x'>X</li>");
				xTurn = false;
			}
			else{
				$(this).append("<li class='o'>O</li>");
				xTurn = true;
			}
		}

			
	});
	
	


	




	
	socket.on('new user', function(data){
		console.log(data.username + " has connected");
		//$('#messages').append('<li>' + data.username + ' has connected. Say hello!</li>');
	});


});



