import '../index.css'
import { Maze } from './maze/maze';
import { Player } from './player/player';
import { goBottom, goLeft, goRight, goTop } from './player/playerControlls';
import { renderPlayer } from './player/renderPlayer';
import { CellsWithoutAnyOpenSide, printCellPath } from './tests/cell';
import { assignCanvasWidthHight } from './utils/canvasGeometry';
import { renderMazePath } from './maze/mazeBoundaryRender';
import { reduceAlpha } from './maze/reduceAlpha';
import { highlightVisitedCells } from './maze/cellRender';


const canvas = document?.getElementById('canvas') as HTMLCanvasElement;

// setting canvas height and width without overflowing on device screen
assignCanvasWidthHight(canvas);

const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

let wallColor = 'white';
let wallShadowColor = '#A0153E';
let surfaceColor = '#C40C0C';
let playerColor = 'green';
let playerShadowColor = '#ff1f1f';
let enemyColor = 'red';

let maze = new Maze(ctx, 20, 20, wallColor, wallShadowColor, surfaceColor, playerColor, enemyColor);
renderMazePath(maze);


let player = new Player(0,0, maze.wCell, maze.hCell, maze, ctx, playerShadowColor, playerColor, enemyColor, 1);
// renderPlayer(player, maze, ctx);

document.onkeydown = checkKey;

function checkKey(e: any) {

	e = e || window.event;

	if (e.keyCode == '38') {
		// up arrow
		console.log('up swap');
		goTop(player, maze, ctx);
		player.animatePlayer();

	}
	else if (e.keyCode == '40') {
		// down arrow
		console.log('down swap');
		// erasePlayerAndPath (player, maze,ctx);
        goBottom(player, maze, ctx);
		player.animatePlayer();

		
	}
	else if (e.keyCode == '37') {
		// left arrow
		console.log('left swap');
        goLeft(player, maze, ctx);
		player.animatePlayer();
		
	}
	else if (e.keyCode == '39') {
		// right arrow
		console.log('right swap');
        goRight(player, maze, ctx);
		player.animatePlayer();
		
	}
}

setInterval(() => {
	reduceAlpha(maze.cells, player, 0.01, 0);
	// highlightVisitedCells(maze, player);
}, 100)



console.log("viportWidth: ", window.innerWidth, " viewportHeight: ", window.innerHeight)
