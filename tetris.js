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

var L_SHAPE	=		[
						[
							[0,0,0,0,0],
							[0,0,1,0,0],
							[0,0,1,0,0],
							[0,0,1,1,0],
							[0,0,0,0,0]
						],

						[
							[0,0,0,0,0],
							[0,0,0,0,0],
							[0,1,1,1,0],
							[0,1,0,0,0],
							[0,0,0,0,0]
						],

						[
							[0,0,0,0,0],
							[0,0,1,1,0],
							[0,0,0,1,0],
							[0,0,0,1,0],
							[0,0,0,0,0]
						],

						[
							[0,0,0,0,0],
							[0,0,0,0,0],
							[0,0,0,1,0],
							[0,1,1,1,0],
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
	 var	SPACE_BAR			= 32;


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


function main( canvas_id ) {

	 var 	colors 				= [ "red", "blue", "yellow", "orange", "green", "white", "grey", "pink" ];
		
	 var 	pieces	 			= [ CUBE_SHAPE, I_SHAPE, Z_SHAPE, S_SHAPE, L_SHAPE ];
	 var 	canvas 				= document.getElementById( canvas_id );
	 var 	ctx 				= canvas.getContext( "2d" );

	 function clearScreen() {
	
		// draw window
	 	ctx.clearRect( 0, 0, WINDOWWIDTH, WINDOWHEIGHT );
	  	ctx.fillStyle = "black";
	  	ctx.fillRect( 0, 0, WINDOWWIDTH, WINDOWHEIGHT );
	  	// draw boarder
	  	ctx.fillStyle = "blue";
	  	ctx.fillRect ( HORIZONTALMARGIN - 3, TOPMARGIN - 3, (BOARDWIDTH * BOXSIZE) + 6, (BOARDHEIGHT * BOXSIZE) + 6);
	  	// draw board
	  	ctx.fillStyle = "black";
	  	ctx.fillRect( HORIZONTALMARGIN, TOPMARGIN, BOXSIZE * BOARDWIDTH, BOXSIZE * BOARDHEIGHT );
	  	// draw next piece text
	  	ctx.font = "25px ArialBold";
	  	ctx.fillStyle = "red";
	  	ctx.fillText("Next:",450,150);

	 }

	  var gameboard 	= new Gameboard();
	  var currentPiece 	= new Piece( pieces, colors );
	  var nextPiece		= new Piece( pieces, colors );
	  var isGameOver	= false;
	  var doNotDraw		= false;

	  function update( gameboard, piece ) {
	  	// check for game over
	  	if ( !validPosition( gameboard, piece ) ) {
	  		isGameOver = true;
	  		return;
	  	}
	  	// add piece to board if on top of another or if piece has reached the bottom of the board
	  	if ( !validPosition( gameboard, piece, adjacentx = 0, adjacentY = 1 ) ) {
	  		addPieceTogameboard( gameboard, piece );
	  		removeLines( gameboard );
	  		currentPiece = nextPiece;
	  		if ( !validPosition( gameboard, currentPiece ) ) {
	  			isGameOver = true;
	  			return;
	  		}	
	  		nextPiece = new Piece( pieces, colors );
	  	}
	  	else 
	  		piece.y += 1;

	  	document.onkeydown = checkKey;
		
	  	function checkKey( e ) {
			if ( e.keyCode == LEFT_KEY && validPosition( gameboard, piece, adjacentX = -1 ) ) {
				piece.x -= 1;
				clearScreen();
				drawPiece(piece);
				drawBoard(gameboard);
				drawNextPiece( nextPiece );
			}
			else if ( e.keyCode == RIGHT_KEY && validPosition( gameboard, piece, adjacentX = 1 ) ) {
				piece.x += 1;
				clearScreen();
				drawPiece(piece);
				drawBoard(gameboard);
				drawNextPiece( nextPiece );
			}
			// TODO: check that piece doesn't go out of bounds if rotated
			else if ( e.keyCode == UP_KEY ) {
				piece.rotation = (piece.rotation + 1) % piece.piece.length;
				if ( !validPosition( gameboard, piece ) ) {
					piece.rotation = (piece.rotation + 1) % piece.piece.length;
				}
				clearScreen();
				drawPiece(piece);
				drawBoard(gameboard);
				drawNextPiece( nextPiece );
			}
			else if ( e.keyCode == DOWN_KEY && validPosition( gameboard, piece, adjacentX = 0, adjacentY = 1 ) ) {
				piece.y += 1;
				clearScreen();
				drawPiece(piece);
				drawBoard(gameboard);
				drawNextPiece( nextPiece );
			}
			else if ( e.keyCode == SPACE_BAR ) {
				while ( validPosition( gameboard, piece, adjacentX = 0, adjacentY = 1 ) )
					piece.y += 1;
				addPieceTogameboard( gameboard, piece );
				removeLines( gameboard );
				currentPiece = nextPiece;
				nextPiece = new Piece( pieces, colors );
				clearScreen();
				drawBoard(gameboard);
				drawNextPiece( nextPiece );
			}
		}
	  }

	  // main loop
	  function gameLoop() {
  		clearScreen();
		update( gameboard, currentPiece );

		if ( !isGameOver )
			drawPiece( currentPiece );

		drawNextPiece( nextPiece );
		drawBoard( gameboard );
	  	gameover( isGameOver, ctx );
	  	
	  	setTimeout(function () {
	  		requestAnimationFrame(gameLoop);
	  	}, 1000 * 0.30)
	  }
	
	  gameLoop();

	function drawPiece( piece ) {
		for ( let x = 0; x < PIECEWIDTH; ++x ) {
			for ( let y = 0; y < PIECEHEIGHT; ++y ) {
				if ( piece.piece[piece.rotation][y][x] ) {
					drawBox( (HORIZONTALMARGIN + (piece.x * BOXSIZE)) + (x * BOXSIZE), 
							 (TOPMARGIN + (piece.y * BOXSIZE)) + (y * BOXSIZE), 
							  BOXSIZE - 1, BOXSIZE - 1, piece.color );
				}
			}
		}
	}

	function drawNextPiece( piece ) {
		for ( let x = 0; x < PIECEWIDTH; ++x ) {
			for ( let y = 0; y < PIECEHEIGHT; ++y ) {
				if ( piece.piece[piece.rotation][y][x] ) {
					drawBox( (WINDOWWIDTH - HORIZONTALMARGIN) + (piece.x * BOXSIZE) + (x * BOXSIZE + 2),
								(TOPMARGIN + (3 * BOXSIZE)) + (y * BOXSIZE),
								BOXSIZE - 1, BOXSIZE - 1, piece.color )
				}
			}
		}
	}

	function drawBoard( gameboard ) {
		for ( let x = 0; x < BOARDWIDTH; ++x) {
			for ( let y = 0; y < BOARDHEIGHT; ++y) {
				if ( gameboard.field[x][y] ) {
					drawBox( HORIZONTALMARGIN + x * BOXSIZE, TOPMARGIN + y * BOXSIZE, BOXSIZE - 1, BOXSIZE - 1, gameboard.field[x][y] );
				}
			}
		}
	}

	function drawBox( globalX, globalY, x, y, fillstyle ) {
			// draw each individual box
			ctx.fillStyle = fillstyle;
			ctx.fillRect( globalX, globalY, x, y );
	}
}

function isLineFull( gameboard, y ) {
	for ( let x = 0; x < BOARDWIDTH; ++x) {
		if ( !gameboard.field[x][y] )
			return false;
	}
	return true;
}

function removeLines( gameboard ) {
	for ( let y = BOARDHEIGHT; y >= 0; ) {
		// check if line is full
		if ( isLineFull( gameboard, y ) ) {
			for ( let x = 0; x < BOARDWIDTH; ++x ) {
				gameboard.field[x].splice(y, 1);
				gameboard.field[x].unshift(false);
			}
		}
		else {
			--y;
		}
	}
}

function gameover( gameover, frame ) {

	if ( gameover ) {
		frame.font = "50px ArialBold";
	  	frame.fillStyle = "red";
	  	frame.fillText( "Game Over", 208, 50 );
	}
}

function validPosition( gameboard, piece, adjacentX=0, adjacentY=0 ) {
	for ( let x = 0; x < PIECEWIDTH; ++x ) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece.piece[piece.rotation][y][x] ) {
				// check that we're within board bounds and not hitting another piece
				if ( !checkCordsAreWithinBounds( x + piece.x + adjacentX, y + piece.y + adjacentY ) 
					 || gameboard.field[x + piece.x + adjacentX][y + piece.y + adjacentY] )
					return false;
			}
		}
	}
	return true;
}

function checkCordsAreWithinBounds( x, y ) {
	return x >= 0 && x < BOARDWIDTH && y < BOARDHEIGHT;
}

function Gameboard() {
	this.field = [];
	// creating multidimensional arrays in javascript is weird :/
	for ( let i = 0; i < BOARDWIDTH; ++i ) {
		this.field[i] = [];
		for ( let j = 0; j < BOARDHEIGHT; ++j ) {
			this.field[i][j] = false;
		}
	}
}	

function addPieceTogameboard( gameboard, piece ) {
	for ( let x = 0; x < PIECEWIDTH; ++x) {
		for ( let y = 0; y < PIECEHEIGHT; ++y ) {
			if ( piece.piece[piece.rotation][y][x] ) {
				gameboard.field[ x + piece.x ][ y + piece.y ] = piece.color;
			}
		}
	}
}

function Piece( piece, colors ) {

		this.piece 		= piece[Math.floor(Math.random() * piece.length)];
		this.rotation 	= Math.floor(Math.random() * this.piece.length);
		this.color 		= colors[Math.floor(Math.random() * 8)];
		this.x 			= 3;
		this.y 			= -2;
}
