import '../index.css'
import { Maze } from './maze/maze';
import { Player } from './player/player';
import { goBottom, goLeft, goRight, goTop } from './player/playerControlls';
import { renderPlayer } from './player/renderPlayer';
import { CellsWithoutAnyOpenSide, printCellPath } from './tests/cell';
import { assignCanvasWidthHight } from './utils/canvasGeometry';

const canvas = document?.getElementById('canvas') as HTMLCanvasElement;

// setting canvas height and width without overflowing on device screen
assignCanvasWidthHight(canvas);

const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

let wallColor = 'white';
let surfaceColor = '#ff0040';
let playerColor = '#00ffff';
let enemyColor = 'black';

let maze = new Maze(ctx, 15, 20, wallColor, surfaceColor, playerColor, enemyColor);
maze.renderPath();

let player = new Player(0,0, maze.wCell, maze.hCell, maze, ctx, playerColor, 1);
renderPlayer(player, maze, ctx);

document.onkeydown = checkKey;

function checkKey(e: any) {

	e = e || window.event;

	if (e.keyCode == '38') {
		// up arrow
		console.log('up swap');
		goTop(player, maze, ctx);

	}
	else if (e.keyCode == '40') {
		// down arrow
		console.log('down swap');
        goBottom(player, maze, ctx);
		
	}
	else if (e.keyCode == '37') {
		// left arrow
		console.log('left swap');
        goLeft(player, maze, ctx);
		
	}
	else if (e.keyCode == '39') {
		// right arrow
		console.log('right swap');
        goRight(player, maze, ctx);
		
	}
}

// tests
// CellsWithoutAnyOpenSide(maze.cells);
// printCellPath(maze, ctx);


console.log("viportWidth: ", window.innerWidth, " viewportHeight: ", window.innerHeight)
