/*
	Tetris
*/

var S_SHAPE = 		[
						[
							[0,0,1,1,0],
							[0,1,1,0,0],
							[0,0,0,0,0],
							[0,0,0,0,0],
						],

						[	
							[0,1,0,0,0],
							[0,1,1,0,0],
							[0,0,1,0,0],
							[0,0,0,0,0]
						]		
					]

var Z_SHAPE = 		[	
						[
							[0,1,1,0,0],
							[0,0,1,1,0],
							[0,0,0,0,0],
							[0,0,0,0,0]
						],

						[	
							[0,0,1,0,0],
							[0,1,1,0,0],
							[0,1,0,0,0],
							[0,0,0,0,0]
						]
					]


var I_SHAPE =		[
						[
							[0,0,1,0,0],
							[0,0,1,0,0],
							[0,0,1,0,0],
							[0,0,1,0,0],
							[0,0,0,0,0]
						],

						[
							[0,0,0,0,0],
							[0,0,0,0,0],
							[1,1,1,1,0],
							[0,0,0,0,0]
						]
					]

var CUBE_SHAPE = 	[
						[
							[0,0,0,0,0],
							[0,1,1,0,0],
							[0,1,1,0,0],
							[0,0,0,0,0],
							[0,0,0,0,0]
						]
					]

function main(canvas_id) {

	/*
	 * 	board and shape sizes
	 *
	 */

	 var	WINDOWWIDTH   		= 640;
	 var 	WINDOWHEIGHT  		= 480;
	 var	BOXSIZE				= 20;
	 var	BOARDWIDTH    		= 10;
	 var	BOARDHEIGHT   		= 20;

	 var 	HORIZONTALMARGIN 	= ( ( WINDOWWIDTH - ( BOARDWIDTH * BOXSIZE )) / 2 );
	 var	TOPMARGIN			= ( ( WINDOWHEIGHT - ( BOARDHEIGHT * BOXSIZE )) - 5 );

	 var	PIECEWIDTH			= 5;
	 var 	PIECEHEIGHT			= 5;


	/*
	 * 		colors
	 *
	 */

	 var    BLACK 				= "#000000";
	 var	WHITE				= "#ffffff";
	 var	RED 				= "b32400";
	 var 	BLUE				= "005ce6";

	 var 	globalPosition_X 	= 2; 
	 var 	globalPosition_Y 	= 2;
		
	 var 	rotation 			= I_SHAPE[0];
	 var 	canvas 				= document.getElementById(canvas_id);
	 var 	ctx 				= canvas.getContext("2d");


	 	//  function init(canvas_id) { 
	 		

	 	//  	// var GameBoard = initGameBoard();

	 	 	
	  // }

	  // init(canvas_id);
	  // var board = initGameBoard();


	  // main loop


	    function piece() {
	  	this.x = 0;
	  	this.y = 3;
	  	this.rotation = rotation;
	  }

	  var testPiece = new piece();

	  function update() {
	  	if ( testPiece.y < 200 ) { 
	  	testPiece.y += 10;

	  	}
	  	
	  }

	  function gameLoop() {
	  	
	  	ctx.clearRect(0,0,WINDOWWIDTH,WINDOWHEIGHT);
	  	ctx.fillStyle = BLACK;
	  	ctx.fillRect(0,0,WINDOWWIDTH,WINDOWHEIGHT);
	  	update();
	  	drawPiece(testPiece);
	  	
	  	setTimeout(function () {
	  		requestAnimationFrame(gameLoop);
	  	}, 1000 * 0.80)
	  }
	

	  gameLoop();

	function drawPiece(piece) {
		for ( let x = 0; x < 5; ++x ) {
			for ( let y = 0; y < 5; ++y ) {
				if ( piece.rotation[y][x] != false) {
					drawFrame( (piece.x * globalPosition_X) + 1, (piece.y * globalPosition_Y) + 1, BOXSIZE * globalPosition_X, BOXSIZE * globalPosition_Y, RED);
				}
			}
		}
	}



	function drawFrame(globalX, globalY, x, y, fillstyle) {
			// window.requestAnimationFrame( drawFrame );
			// drawing code here
			
			// ctx.beginPath();
			ctx.fillStyle = fillstyle;
			ctx.fillRect(globalX, globalY, x, y);
			// ctx.closePath();
			// ctx.fill();
			
			// ctx.fillStyle = fillstyle
			// ctx.fillRect(globalX, globalY, x, y)	
	}
}



// function getNewPiece() {

// }

function initGameBoard() {
	var gameBoard = [];

	for ( let i = 0; i < BOARDWIDTH; ++i ) {
		gameBoard[i] = ( [false] * BOARDHEIGHT );
	return new gameBoard;
	}
}	

function addPieceToGameBoard(gameBoard, piece, block) {
	for ( let x = 0; x < PIECEWIDTH; ++x) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece[y][x] != false ) {
				gameBoard[ x + globalPosition_X ][ y + globalPosition_Y ] = block;
			}
		}
	}
}

var Block = function(ctx) {
	this.size 		= 20;
	this.color 		= '';
	this.currentX 	= 0;
	this.currentY 	= 0;

	this.drawMe = function(ctx) {
		ctx.fillStyle = this.color;
				
	}
}





