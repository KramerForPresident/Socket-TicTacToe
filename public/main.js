$(function(){
	$('.resetButton').hide();
	$('.standby').hide();
	var socket = io();
	var team;
	var gameOver = false;
	
	
	
	
	//below are the click handlers for the board.
	//it calls the mark function by passing the div's id
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
	
	
	
	
	$('.resetButton').click(function(){
		console.log("Reset");
		socket.emit('new game');
		$('.resetButton').hide();
		$('.standby').show();
	});
	
	
	//receives the specific id and sends info to the server
	function mark(coord, $target){
		//console.log("Coordinate is " + coord);
		if	((gameOver == false)&&
			($($target).html() == "")){
			//cell is empty, can be filled in
			socket.emit('mark board', coord);
		}
		else{
			//don't do anything
		}
	}	
	
	
	function removeMarkers(){
		var target;
		
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				$target = "#" + i + "" + j;
				console.log(target);
				$($target).children().remove();
			}
		}
		console.log("board cleared");
	}
	
	
	socket.on('set team', function(data){
		team = data.t;
		console.log("Team is.... " + team);

	});
	
	
	socket.on('clear board', function(){
		$('.standby').hide();
		removeMarkers();
		gameOver = false;
		
	});	
	
	//places marker on all clients
	socket.on('place marker', function(data){
		var $space = "#" + data.cell;
		var mark = data.val;
		var lower = mark.toLowerCase();
		console.log("Placing marker on boards: " + mark + " at " + $space);
		$($space).append("<li class='" + lower + "'>" +  mark + "</li>");
	
	});
	
	//game over state has been achieved: display a message
	socket.on('game over', function(){
		gameOver = true;
		$('.resetButton').show();
	});
	
	
	socket.on('new user', function(data){
		console.log(data.username + " has connected");
	});


});



