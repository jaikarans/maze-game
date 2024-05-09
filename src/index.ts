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
import { showMainMenu } from './pages/mainMenu';



showMainMenu();

const canvas = document?.getElementById('canvas') as HTMLCanvasElement;

// setting canvas height and width without overflowing on device screen
assignCanvasWidthHight(canvas);

const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

const body = document.getElementsByTagName('body')[0];


// let backgroundColor = '#b7b7b7';
// body.style.backgroundColor = '#cccccc'

// // let backgroundColor = '#267247'; // background color is #40BF77
// let wallColor = '#141414'; // dark Grey color theory
// // let wallColor = '#8cd8ad'; 
// let objectShadow = '#515151';

// let playerRecentPathHighlightColor = '#7f7fff'
// let playerColor = '#0000FF'; // player color #E54624 complementry of background color
// let playerShadowColor = '#00007f';
// let enemyColor = '#990000'; // triadic color of background color #8D41BF
// let enemyShadowColor = '#4c0000';


// let wallShadowColor = '#A0153E';

let backgroundColor = '#4B9618';
body.style.backgroundColor = '#2D5A0E'

// let backgroundColor = '#267247'; // background color is #40BF77
let wallColor = '#ffffff'; // dark Grey color theory
// let wallColor = '#8cd8ad'; 
let objectShadow = '#2d5a0e';

let playerRecentPathHighlightColor = '#915db5'
let playerColor = '#631896'; // player color #E54624 complementry of background color
let playerShadowColor = '#451378';
let enemyColor = '#ff0000'; // triadic color of background color #8D41BF
let enemyShadowColor = '#cc0000';


let wallShadowColor = '#A0153E';

// **************************************

// *****************************************
let playerWalkSound = new Audio('../assets/playerWalkSoundDum60.wav');
// try {
// 	playerWalkSound.play();

// } catch (e) {
// 	console.log('audio not played ', e)
// }

let numberOfRows = 10;
let numberOfColumns = 10;
let wallLineWidth = 5;
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
