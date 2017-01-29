/*
	Tetris
*/

var S_SHAPE = 		[
						[
							[0,0,1,1],
							[0,1,1,0],
						]

						[	
							[0,1,0,0],
							[0,1,1,0],
							[0,0,1,0]
						]		
					]

var Z_SHAPE = 		[	
						[
							[0,1,1,0],
							[0,0,1,1]
						]

						[	
							[0,0,1,0],
							[0,1,1,0],
							[0,1,0,0]
						]
					]


var I_SHAPE =		[
						[
							[0,0,1,0,0],
							[0,0,1,0,0],
							[0,0,1,0,0],
							[0,0,1,0,0],
						]

						[
							[1,1,1,1,0],
							[0,0,0,0,0]
						]
					]

var CUBE_SHAPE = 	[
						[
							[0,1,1,0],
							[0,1,1,0]
						]
					]

function main() {

	/*
	 * board and shape sizes
	 *
	 */

	var BOXSIZE 	= 20,
		BOARDWIDTH  = 10,
		BOARDHEIGHT = 20;

	/*
	 * color macros
	 *
	 */

	 var BLACK 		= (   0,   0,   0 ),
	 	 WHITE		= ( 255, 255, 255 ),
	 	 RED 		= ( 155,   0,   0 );


	this.initGameBoard = function {
	var gameBoard = [];

	for ( let i = 0; i < BOARDWIDTH; ++i ) {
		gameBoard[i] = ( [false] * BOARDHEIGHT );
	}
}



}



function renderPieceToBoard(ctx) {


}

function drawGameBoard(ctx) {
	
}





var game = new main;
game.init('tetris_canvas');





			