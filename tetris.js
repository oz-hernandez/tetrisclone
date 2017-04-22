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

	 var	LEFT_KEY			= 37;
	 var	UP_KEY				= 38;
	 var 	RIGHT_KEY			= 39;
	 var 	DOWN_KEY			= 40;

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

	 var 	colors 				= [ "red", "blue", "yellow", "orange", "green" ];
		
	 var 	pieces	 			= [ CUBE_SHAPE, I_SHAPE, Z_SHAPE, S_SHAPE ];
	 var 	canvas 				= document.getElementById( canvas_id );
	 var 	ctx 				= canvas.getContext( "2d" );

	 function clearScreen() {
	 	ctx.clearRect(0,0,WINDOWWIDTH,WINDOWHEIGHT);
	  	ctx.fillStyle = "black";
	  	ctx.fillRect(0,0,WINDOWWIDTH,WINDOWHEIGHT);
	 }

	  var gameBoard 	= initGameBoard(BOARDHEIGHT, BOARDWIDTH);
	  var currentPiece 	=  NewPiece(pieces, colors);

	  function update(piece) {

	  	document.onkeydown = checkKey;
	  	piece.y += 1;
		
	  	function checkKey(e) {
			if ( e.keyCode == LEFT_KEY ) {
				piece.x -= 1;
				clearScreen();
				drawPiece(piece);
			}
			else if ( e.keyCode == RIGHT_KEY ) {
				piece.x += 1;
				clearScreen();
				drawPiece(piece);
			}
			else if ( e.keyCode == UP_KEY ) {
				piece.rotation = (piece.rotation + 1) % piece.piece.length;
				clearScreen();
				drawPiece(piece);
			} 
		}
	  }

	  // main loop
	  function gameLoop() {
	  	clearScreen();
	  	update(currentPiece);
	  	drawPiece(currentPiece);
	  	
	  	setTimeout(function () {
	  		requestAnimationFrame(gameLoop);
	  	}, 1000 * 0.50)
	  }
	
	  gameLoop();

	function drawPiece(piece) {
		for ( let x = 0; x < 5; ++x ) {
			for ( let y = 0; y < 5; ++y ) {
				if ( piece.piece[piece.rotation][y][x] != false ) {
					drawBox( (x + piece.x) * BOXSIZE, (y + piece.y) * BOXSIZE, BOXSIZE, BOXSIZE, piece.color );
				}
			}
		}
	}

	function drawBox(globalX, globalY, x, y, fillstyle) {
			// draw each individual box
			ctx.fillStyle = fillstyle;
			ctx.fillRect( globalX, globalY, BOXSIZE - 1, BOXSIZE - 1 );
	}
}

function initGameBoard(boardheight, boardwidth) {
	var gameBoard = function() {
		this.board = [];

		for ( let i = 0; i < boardwidth; ++i ) {
			this.board[i] = ( [false] * boardheight );
		}
		return new gameBoard;
	}
}	

function addPieceToGameBoard(gameBoard, piece) {
	for ( let x = 0; x < PIECEWIDTH; ++x) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece.piece[piece.rotation][y][x] != false ) {
				gameBoard.board[ x + piece.x ][ y + piece.y ] = piece.color;
			}
		}
	}
}

function NewPiece(piece, colors) {

	var Piece = function() {

		this.piece 		= piece[Math.floor(Math.random() * piece.length)];
		this.rotation 	= Math.floor(Math.random() * this.piece.length);
		this.color 		= colors[Math.floor(Math.random() * 5)];
		this.x 			= 13;
		this.y 			= 0;
	}
	return new Piece;
}
