$(function(){
	var socket = io();
	var username;
	
	var xTurn = true;
	
	
	
	//function that handles the click on the board
	function mark(coord, $target){
		//console.log("Coordinate is " + coord);
		
		
		if($($target).html() == ""){//cell is empty, can be filled in

			if(xTurn == true){
				$($target).append("<li class='x'>X</li>");
				socket.emit('mark board', {cell: coord, val: "X"});
				xTurn = false;
			}
			else{
				$($target).append("<li class='o'>O</li>");
				socket.emit('mark board', {cell: coord, val: "O"});
				xTurn = true;
			}
		}
		
	}
	
	
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
	
	
	
	
	


	




	
	socket.on('new user', function(data){
		console.log(data.username + " has connected");
		//$('#messages').append('<li>' + data.username + ' has connected. Say hello!</li>');
	});


});



