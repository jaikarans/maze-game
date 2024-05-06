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

// let backgroundColor = '#CCCCCC'; // light grey
// 
let backgroundColor = '#267247'; // background color is #40BF77
// let wallColor = '#333333'; // dark Grey color theory
let wallColor = '#8cd8ad'; 
let objectShadow = '#205f3b';

// let playerRecentPathHighlightColor = '#f7c7bd'
let playerRecentPathHighlightColor = '#ef907b'
let playerColor = '#e54624'; // player color #E54624 complementry of background color
let playerShadowColor = '#b7381c';
let enemyColor = '#8D41BF'; // triadic color of background color #8D41BF
let enemyShadowColor = '#3e3498';


let wallShadowColor = '#A0153E';
let playerWalkSound = new Audio('../assets/playerWalkSoundDum60.wav');
// try {
// 	playerWalkSound.play();

// } catch (e) {
// 	console.log('audio not played ', e)
// }

let numberOfRows = 14;
let numberOfColumns = 18;
let wallLineWidth = 3;
let maze = new Maze(ctx, numberOfRows, numberOfColumns, wallColor, wallShadowColor, backgroundColor, objectShadow, playerColor, playerRecentPathHighlightColor, wallLineWidth);
renderMazePath(maze);


let player = new Player(0, 0, maze.wCell, maze.hCell, maze, ctx, playerWalkSound, playerColor, playerShadowColor, enemyColor, enemyShadowColor, 1);
// renderPlayer(player, maze, ctx);

document.onkeydown = checkKey;



function checkKey(e: any) {

	e = e || window.event;

    // else if (e.keyCode === 65) keyCode = 37; // A key to left arrow
    // else if (keyCode === 83) keyCode = 40; // S key to down arrow
    // else if (keyCode === 68) keyCode = 39; // D key to right arrow

	if (e.keyCode == '38' || e.keyCode == 87) {
		// up arrow or w
		if (!player.isPlayerAnimating){
			console.log('up arrow');
			goTop(player, maze, ctx);
			player.animatePlayer();
		} else {

			console.log('up arrow No');
		}

	}
	else if (e.keyCode == '40' || e.keyCode == 83) {
		// down arrow or s
		if (!player.isPlayerAnimating) {
			console.log('down swap');
			// erasePlayerAndPath (player, maze,ctx);
        	goBottom(player, maze, ctx);
			player.animatePlayer();
		} else {
			console.log('down arrow No')
		}
		

		
	}
	else if (e.keyCode == '37' || e.keyCode == 65) {
		// left arrow or a
		if (!player.isPlayerAnimating) {
			console.log('left swap');
			goLeft(player, maze, ctx);
			player.animatePlayer();
			
		} else {
			console.log('left arrow No');
		}
		
	}
	else if (e.keyCode == '39' || e.keyCode == 68) {
		// right arrow or d
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

	if(player.isGameEnded) {
		maze = new Maze(ctx, numberOfRows, numberOfColumns, wallColor, wallShadowColor, backgroundColor, objectShadow, playerColor, playerRecentPathHighlightColor, wallLineWidth);
		player = new Player(0,0, maze.wCell, maze.hCell, maze, ctx, playerWalkSound, playerColor, playerShadowColor, enemyColor, enemyShadowColor, 1);
	}
}, 200)


// mobile touch
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

document.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture(event);
}, false);

function handleGesture(event: any) {
    const deltaX = touchendX - touchstartX;
    const deltaY = touchendY - touchstartY;
    // You can adjust the threshold values as per your requirement
    if (Math.abs(deltaX) > 30) {
        // Horizontal swipe
        if (deltaX > 0) {
            // Swiped right
			event.preventDefault();
			if (!player.isPlayerAnimating) {
				console.log('Swiped right');
				goRight(player, maze, ctx);
				player.animatePlayer();
			} else {
				console.log('can not go right')
			}
        } else {
            // Swiped left
			event.preventDefault();
			if (!player.isPlayerAnimating) {
				console.log('Swiped left');
				goLeft(player, maze, ctx);
				player.animatePlayer();

			} else {
				console.log('can not go left')
			}
        }
    } else if (Math.abs(deltaY) > 30) {
        // Vertical swipe
        if (deltaY > 0) {
            // Swiped down
			event.preventDefault();
            console.log('Swiped down');
            // Prevent default behavior of scrolling down
			if (!player.isPlayerAnimating) {
				goBottom(player, maze, ctx);
				player.animatePlayer();

			} else {
				console.log('can not go swiped down')
			}
        } else {
			// Swiped up
			event.preventDefault();
			if (!player.isPlayerAnimating) {
				console.log('Swiped up');
				goTop(player, maze, ctx);
				player.animatePlayer();

			} else {
				console.log('can not go up')
			}
        }
    }
}

// Disable browser's down swipe reloading
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });


console.log("viportWidth: ", window.innerWidth, " viewportHeight: ", window.innerHeight)
