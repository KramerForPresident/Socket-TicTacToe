$(function(){
	var socket = io();
	var username;
	
	var xTurn = true;
	


	$('#game').click(function(){
		console.log("click");
	});
	
	$('#00').click(function(){
		console.log("0,0");
		$(this).append("<li class='x'>X</li>");
	});


	




	
	socket.on('new user', function(data){
		console.log(data.username + " has connected");
		//$('#messages').append('<li>' + data.username + ' has connected. Say hello!</li>');
	});


});



