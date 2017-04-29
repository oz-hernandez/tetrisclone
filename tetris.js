/*
	Tetris
*/


/*
 *	tetris	
 *
 */

var S_SHAPE = 		[
						[
							[0,0,0,0,0],
							[0,0,0,0,0],
							[0,0,1,1,0],
							[0,1,1,0,0],
							[0,0,0,0,0]
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
							[0,0,0,0,0],
							[0,1,1,0,0],
							[0,0,1,1,0],
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
							[0,0,0,0,0],
							[1,1,1,1,0],
							[0,0,0,0,0]
						]
					]

var CUBE_SHAPE = 	[
						[
							[0,0,0,0,0],
							[0,0,0,0,0],
							[0,1,1,0,0],
							[0,1,1,0,0],
							[0,0,0,0,0]
						]
					]

	/*
	 * 		key events
	 *
	 */

	 var	LEFT_KEY			= 37;
	 var	UP_KEY				= 38;
	 var 	RIGHT_KEY			= 39;
	 var 	DOWN_KEY			= 40;


	 /*
	  * 	board and shape sizes
	  *
	  */

	 var	PIECEWIDTH			= 5;
	 var 	PIECEHEIGHT			= 5;

	 var	WINDOWWIDTH   		= 640;
	 var 	WINDOWHEIGHT  		= 480;
	 var	BOXSIZE				= 20;
	 var	BOARDWIDTH    		= 10;
	 var	BOARDHEIGHT   		= 20;

	 var 	HORIZONTALMARGIN 	= ( ( WINDOWWIDTH - ( BOARDWIDTH * BOXSIZE ) ) / 2 );
	 var	TOPMARGIN			= ( ( WINDOWHEIGHT - ( BOARDHEIGHT * BOXSIZE ) ) - 5 );


function main(canvas_id) {

	 var 	colors 				= [ "red", "blue", "yellow", "orange", "green", "white", "grey", "pink" ];
		
	 var 	pieces	 			= [ CUBE_SHAPE, I_SHAPE, Z_SHAPE, S_SHAPE ];
	 var 	canvas 				= document.getElementById( canvas_id );
	 var 	ctx 				= canvas.getContext( "2d" );

	 function clearScreen() {
	
	 	ctx.clearRect( 0, 0, WINDOWWIDTH, WINDOWHEIGHT );
	  	ctx.fillStyle = "black";
	  	ctx.fillRect( 0, 0, WINDOWWIDTH, WINDOWHEIGHT )
	  	ctx.fillStyle = "#006699"
	  	ctx.fillRect(HORIZONTALMARGIN, TOPMARGIN, BOXSIZE * BOARDWIDTH, BOXSIZE * BOARDHEIGHT);
	 }

	  var gameBoard 	= initGameBoard(BOARDHEIGHT, BOARDWIDTH);
	  var currentPiece 	= NewPiece(pieces, colors);
	  var nextPiece		= NewPiece(pieces, colors);
	  var needNewPiece 	= false;

	  function update(gameboard, piece) {
	  	document.onkeydown = checkKey;

	  	// add piece to board if on top of another or if piece has reached the bottom of the board
	  	if ( !validPosition( gameboard, piece, adjacentx = 0, adjacentY = 1) ) {
	  		addPieceToGameBoard(gameboard, piece);
	  		needNewPiece = true;
	  	}
	  	else 
	  		piece.y += 1;
		
	  	function checkKey(e) {

	  		// don't accept input until piece has entered the gameboard
	  		if (piece.y == 0) {
	  			// maybe write a check here to see if new piece will collide with another
	  			// which probably means the game is over
	  			return;
	  		}

			if ( e.keyCode == LEFT_KEY && validPosition( gameboard, piece, adjacentX = -1, adjacentY = 0) ) {
				piece.x -= 1;
				clearScreen();
				drawPiece(piece);
				drawBoard(gameBoard);
			}
			else if ( e.keyCode == RIGHT_KEY && validPosition( gameboard, piece, adjacentX = 1, adjacentY = 0 ) ) {
				piece.x += 1;
				clearScreen();
				drawPiece(piece);
				drawBoard(gameBoard);
			}
			// TODO: check that piece doesn't go out of bounds if rotated
			else if ( e.keyCode == UP_KEY ) {
				piece.rotation = (piece.rotation + 1) % piece.piece.length;
				if ( !validPosition( gameboard, piece ) ) {
					piece.rotation = (piece.rotation + 1) % piece.piece.length;
				}
				clearScreen();
				drawPiece(piece);
				drawBoard(gameBoard);
			}
			else if ( e.keyCode == DOWN_KEY && validPosition( gameboard, piece, adjacentX = 0, adjacentY = 1 ) ) {
				piece.y += 1;
				clearScreen();
				drawPiece(piece);
				drawBoard(gameBoard);
			} 
		}
	  }

	  // main loop
	  function gameLoop() {
	  	needNewPiece = false;
	  	clearScreen();
	  	update(gameBoard, currentPiece);
	  	drawPiece(currentPiece);
	  	drawBoard(gameBoard);
	  	if (needNewPiece) {
	  		currentPiece = nextPiece;
	  		nextPiece = NewPiece(pieces, colors);
	  	}
	  	
	  	setTimeout(function () {
	  		requestAnimationFrame(gameLoop);
	  	}, 1000 * 0.50)
	  }
	
	  gameLoop();

	function drawPiece(piece) {
		for ( let x = 0; x < 5; ++x ) {
			for ( let y = 0; y < 5; ++y ) {
				if ( piece.piece[piece.rotation][y][x] ) {
					drawBox( (HORIZONTALMARGIN + (piece.x * BOXSIZE)) + (x * BOXSIZE), 
							 (TOPMARGIN + (piece.y * BOXSIZE)) + (y * BOXSIZE), 
							  BOXSIZE - 1, BOXSIZE - 1, piece.color );
				}
			}
		}
	}

	function drawBoard(gameboard) {
		for ( let x = 0; x < BOARDWIDTH; ++x) {
			for ( let y = 0; y < BOARDHEIGHT; ++y) {
				if ( gameboard.board[x][y] ) {
					drawBox( HORIZONTALMARGIN + (x * BOXSIZE), TOPMARGIN + (y * BOXSIZE), BOXSIZE - 1, BOXSIZE - 1, gameboard.board[x][y] );
				}
			}
		}
	}

	function drawBox(globalX, globalY, x, y, fillstyle) {
			// draw each individual box
			ctx.fillStyle = fillstyle;
			ctx.fillRect( globalX, globalY, x, y );
	}
}

function validPosition(gameboard, piece, adjacentX=0, adjacentY=0) {
	for ( let x = 0; x < PIECEWIDTH; ++x ) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece.piece[piece.rotation][y][x] ) {
				// check that we're within board bounds and not hitting another piece
				if ( !checkCordsAreWithinBounds( x + piece.x + adjacentX, y + piece.y + adjacentY ) 
					 || gameboard.board[x + piece.x + adjacentX][y + piece.y + adjacentY] )
					return false;
			}
		}
	}
	return true;
}

function checkCordsAreWithinBounds(x, y) {
	return x >= 0 && x < BOARDWIDTH && y < BOARDHEIGHT;
}

function initGameBoard() {
	var gameBoard = function() {
		this.board = [];
		// creating multidimensional arrays in javascript is weird :/
		for ( let i = 0; i < BOARDWIDTH; ++i ) {
			this.board[i] = [];
			for ( let j = 0; j < BOARDHEIGHT; ++j ) {
				this.board[i][j] = false;
			}
		}
	}
	return new gameBoard;
}	

function addPieceToGameBoard(gameBoard, piece) {
	for ( let x = 0; x < PIECEWIDTH; ++x) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece.piece[piece.rotation][y][x] ) {
				gameBoard.board[ x + piece.x ][ y + piece.y ] = piece.color;
			}
		}
	}
}

function NewPiece(piece, colors) {

	var Piece = function() {

		this.piece 		= piece[Math.floor(Math.random() * piece.length)];
		this.rotation 	= Math.floor(Math.random() * this.piece.length);
		this.color 		= colors[Math.floor(Math.random() * 8)];
		this.x 			= 3;
		this.y 			= 0;
	}
	return new Piece;
}
