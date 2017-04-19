/*
	Tetris
*/

var S_SHAPE = 		[
						[
							[0,0,0,0,0],
							[0,0,1,1,0],
							[0,1,1,0,0],
							[0,0,0,0,0],
							[0,0,0,0,0],
						],

						[	
							[0,0,0,0,0],
							[0,1,0,0,0],
							[0,1,1,0,0],
							[0,0,1,0,0],
							[0,0,0,0,0]
						]		
					]

var Z_SHAPE = 		[	
						[
							[0,0,0,0,0],
							[0,1,1,0,0],
							[0,0,1,1,0],
							[0,0,0,0,0],
							[0,0,0,0,0]
						],

						[	[0,0,0,0,0],
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
							[0,0,0,0,0],
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

	 var 	HORIZONTALMARGIN 	= ( ( WINDOWWIDTH - ( BOARDWIDTH * BOXSIZE ) ) / 2 );
	 var	TOPMARGIN			= ( ( WINDOWHEIGHT - ( BOARDHEIGHT * BOXSIZE ) ) - 5 );

	 var	PIECEWIDTH			= 5;
	 var 	PIECEHEIGHT			= 5;


	/*
	 * 		colors
	 *
	 */

	 var    BLACK 				= "#000000" ;
	 var	WHITE				= "#ffffff" ;
	 var	RED 				= "B32400"  ;
	 var 	BLUE				= "005CE6"  ;

	 var 	colors 				= [ RED, BLUE ];

	 var	LEFT_KEY			= "37";
	 var	UP_KEY				= "38";
	 var 	RIGHT_KEY			= "39";
	 var 	DOWN_KEY			= "40";

	 var 	globalPosition_X 	= 2; 
	 var 	globalPosition_Y 	= 2;
		
	 var 	pieces	 			= [ CUBE_SHAPE, I_SHAPE, Z_SHAPE, S_SHAPE ];
	 var 	canvas 				= document.getElementById( canvas_id );
	 var 	ctx 				= canvas.getContext( "2d" );


	 	//  function init(canvas_id) { 
	 		

	 	//  	// var GameBoard = initGameBoard();

	 	 	
	  // }

	  // init(canvas_id);
	  // var gameBoard = initGameBoard();


	  // main loop

	  var testPiece =  NewPiece(pieces, colors);

	  function update(gameBoard) {
	  	// check which direction the piece is goin to move
	  	// check whether the piece will hit anythin in the direction it's moving.
	  	// if not hitting anything, move the piece in the direction requested by the keyboard
	  	// EX: move to the left: if (gameBoard[testPiece.x - 1][testPiece.y] != false)

	  	document.onkeydown = checkKey;

	  	if ( testPiece.y < 21 ) { 
	  	testPiece.y += 1;
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
		var color = ["red"];
		for ( let x = 0; x < 5; ++x ) {
			for ( let y = 0; y < 5; ++y ) {
				if ( piece.rotation[y][x] != false) {
					drawFrame( (x + piece.x) * BOXSIZE, (y + piece.y) * BOXSIZE, BOXSIZE, BOXSIZE, color[0]);
				}
			}
		}
	}

	function drawFrame(globalX, globalY, x, y, fillstyle) {
			// window.requestAnimationFrame( drawFrame );
			// drawing code here
			
			// ctx.beginPath();
			ctx.fillStyle = fillstyle;
			ctx.fillRect(globalX, globalY, BOXSIZE - 1, BOXSIZE - 1);
			// ctx.closePath();
			// ctx.fill();
			
			// ctx.fillStyle = fillstyle
			// ctx.fillRect(globalX, globalY, x, y)	
	}
}


function initGameBoard() {
	var gameBoard = [];

	for ( let i = 0; i < BOARDWIDTH; ++i ) {
		gameBoard[i] = ( [false] * BOARDHEIGHT );
	return new gameBoard;
	}
}	

function addPieceToGameBoard(gameBoard, piece) {
	for ( let x = 0; x < PIECEWIDTH; ++x) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece.rotation[y][x] != false ) {
				gameBoard[ x + piece.x ][ y + piece.y ] = piece.color;
			}
		}
	}
}

function checkKey(e) {
	if ( e.keycode == LEFT_KEY ) {

	}
}

function NewPiece(piece, colors) {

	var Piece = function() {

		this.piece 		= piece[Math.floor(Math.random() * piece.length)];
		this.rotation 	= this.piece[Math.floor(Math.random() * this.piece.length)];
		this.color 		= colors[Math.floor(Math.random() * 3)];
		this.x 			= 13;
		this.y 			= 0;
	}

	return new Piece;
}





