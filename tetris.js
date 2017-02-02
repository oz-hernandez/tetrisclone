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
							[0,0,1,0,0]
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
	 var    BOXSIZE 	  		= 20;
	 var	BOARDWIDTH    		= 10;
	 var	BOARDHEIGHT   		= 20;

	 var 	HORIZONTALMARGIN 	= ( ( WINDOWWIDTH - (BOARDWIDTH * BOXSIZE)) / 2 );
	 var	TOPMARGIN			= ( ( WINDOWHEIGHT - ( BOARDHEIGHT * BOXSIZE )) - 5 );

	 var	PIECEWIDTH			= 5;
	 var 	PIECEHEIGHT			= 5;


	/*
	 * 		colors
	 *
	 */

	 var    BLACK 		= (   0,   0,   0 );
	 var	WHITE		= ( 255, 255, 255 );
	 var	RED 		= ( 155,   0,   0 );


	

	 	 function init(canvas_id) { 
	 		var canvas = document.getElementById(canvas_id);
	 		var ctx = canvas.getContext("2d");

	 	 	var GameBoard = initGameBoard();

	 	 	ctx.fillStyle = BLACK;
	 	 	ctx.fillRect(0, 0, WINDOWWIDTH, WINDOWHEIGHT);
	  }

	  init(canvas_id);
	  var board = initGameBoard();

	}	
}

function initGameBoard() {
	var gameBoard = [];

	for ( let i = 0; i < BOARDWIDTH; ++i ) {
		gameBoard[i] = ( [false] * BOARDHEIGHT );

	return gameBoard;
}

function addPieceToGameBoard(gameBoard, piece) {
	for ( let i = 0; i < PIECEWIDTH; ++i) {
		for ( let j = 0; j < PIECEHEIGHT; ++j ) {
			if piece[j][i] != false {
				gameBoard[ i + globalPosition_X][ j + globalPosition_Y] = color['color']
			}
		}
	}
}



var game = new main;
game.init('tetris_canvas');











			