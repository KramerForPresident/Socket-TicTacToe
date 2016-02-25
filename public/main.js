$(function(){
	$('.resetButton').hide();
	$('.standby').hide();
	var socket = io();
	var team;
	var opp;
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
	
	
	//reset button handler. appears when game ends, disappears when clicked
	$('.resetButton').click(function(){
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
	
	//removes board HTML elements
	function removeMarkers(){
		var target;
		
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				$target = "#" + i + "" + j;
				$($target).children().remove();
			}
		}
		//console.log("board cleared");
	}
	
	
/*____________________Socket Functions____________________________*/



	//Sets the client's team (either X or O)
	//This gets called upon connecting to server
	socket.on('set team', function(data){
		//here we will set the client's team, as well as their opponent
		team = data.t;
		if(team == "X"){
			opp = "O";
		}
		else{
			opp = "X";
		}
		
		console.log("Team is.... " + team);

	});	


	//displays whose turn it is
	socket.on('show turn', function(data){
		var turn = data.t;
		var message;
		
		if(turn == team){
			//it's currently your turn
			message = "You are " + team + ". It's your turn.";
		}else{
			message = "Waiting for " + opp + " to make a move."
		}
		
		$('#pane').text(message);
	});
	
	
	//hides reset buttons, starts a new game
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
		//console.log("Placing marker on boards: " + mark + " at " + $space);
		$($space).append("<li class='" + lower + "'>" +  mark + "</li>");
	
	});
	
	
	//game over state has been achieved: display a message
	socket.on('game over', function(){
		gameOver = true;
		$('.resetButton').show();
	});
	
});



