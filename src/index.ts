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
import '../assets/playerWalkSoundDum60.wav'


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

let playerWalkSound = new Audio('../assets/playerWalkSoundDum60.wav');
// try {
// 	playerWalkSound.play();

// } catch (e) {
// 	console.log('audio not played ', e)
// }

let maze = new Maze(ctx, 30, 30, wallColor, wallShadowColor, surfaceColor, playerColor, enemyColor);
renderMazePath(maze);


let player = new Player(0,0, maze.wCell, maze.hCell, maze, ctx, playerShadowColor, playerWalkSound, playerColor, enemyColor, 1);
// renderPlayer(player, maze, ctx);

document.onkeydown = checkKey;

function checkKey(e: any) {

	e = e || window.event;

	if (e.keyCode == '38') {
		// up arrow
		if (!player.isPlayerAnimating){
			console.log('up arrow');
			goTop(player, maze, ctx);
			player.animatePlayer();
		} else {

			console.log('up arrow No');
		}

	}
	else if (e.keyCode == '40') {
		// down arrow
		if (!player.isPlayerAnimating) {
			console.log('down swap');
			// erasePlayerAndPath (player, maze,ctx);
        	goBottom(player, maze, ctx);
			player.animatePlayer();
		} else {
			console.log('down arrow No')
		}
		

		
	}
	else if (e.keyCode == '37') {
		// left arrow
		if (!player.isPlayerAnimating) {
			console.log('left swap');
			goLeft(player, maze, ctx);
			player.animatePlayer();
			
		} else {
			console.log('left arrow No');
		}
		
	}
	else if (e.keyCode == '39') {
		// right arrow
		if (!player.isPlayerAnimating) {
			
			console.log('right swap');
			goRight(player, maze, ctx);
			player.animatePlayer();
		} else {
			console.log('righ arrow No');
		}
		
	}
}

setInterval(() => {
	reduceAlpha(maze.cells, player, 0.01, 0);
	// highlightVisitedCells(maze, player);
}, 200)



console.log("viportWidth: ", window.innerWidth, " viewportHeight: ", window.innerHeight)
