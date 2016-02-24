$(function(){
	$('.resetButton').hide();
	var socket = io();
	var username;
	var xTurn = true;
	var gameOver = false;
	
	
	
	//first row
	$('#00').click(function(){		
		var coord = $(this).attr('id');		
		mark(coord, this);
	});
	$('#01').click(function(){		
		var coord = $(this).attr('id');
		mark(coord, this);
	});
	$('#02').click(function(){		
		var coord = $(this).attr('id');
		mark(coord, this);	
	});	
	//second row
	$('#10').click(function(){		
		var coord = $(this).attr('id');		
		mark(coord, this);
	});
	$('#11').click(function(){		
		var coord = $(this).attr('id');
		mark(coord, this);
	});
	$('#12').click(function(){		
		var coord = $(this).attr('id');
		mark(coord, this);	
	});	
	//third row
	$('#20').click(function(){		
		var coord = $(this).attr('id');		
		mark(coord, this);
	});
	$('#21').click(function(){		
		var coord = $(this).attr('id');
		mark(coord, this);
	});
	$('#22').click(function(){		
		var coord = $(this).attr('id');
		mark(coord, this);	
	});	
	
	
	//function that handles the click on the board
	function mark(coord, $target){
		//console.log("Coordinate is " + coord);
		if(gameOver == false){
			//console.log("Marking....");
			if($($target).html() == ""){//cell is empty, can be filled in

				if(xTurn == true){
					socket.emit('mark board', coord);
					xTurn = false;
				}
				else{
					socket.emit('mark board', coord);
					xTurn = true;
				}
			}
		}
		else{
			//don't do anything
		}
	}	
	
	
	
	
	
	
	
	
	socket.on('place marker', function(data){
		var $space = "#" + data.cell;
		var mark = data.val;
		var lower = mark.toLowerCase();
		console.log("Placing marker on boards: " + mark + " at " + $space);
		$($space).append("<li class='" + lower + "'>" +  mark + "</li>");
	
	});
	
	socket.on('game over', function(){
		gameOver = true;
		console.log("GAME OVER");
		$('#messages').append("<li>Game over!!!!!</li>");
		$('.resetButton').show();
	});
	
	
	socket.on('new user', function(data){
		console.log(data.username + " has connected");
		//$('#messages').append('<li>' + data.username + ' has connected. Say hello!</li>');
	});


});



