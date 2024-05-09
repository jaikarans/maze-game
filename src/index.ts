import '../index.css'
import { Maze } from './maze/maze';
import { Player } from './player/player';
import { goBottom, goLeft, goRight, goTop } from './player/playerControlls';
import { assignCanvasWidthHight } from './utils/canvasGeometry';
import { renderMazePath } from './maze/mazeBoundaryRender';
import { reduceAlpha } from './maze/reduceAlpha';
import '../assets/playerWalkSoundDum60.wav'
import { showMainMenu } from './pages/mainMenu';


export const config = {
	mobile: true,
	numberOfRows: 14,
	numberOfColumns: 14,
	wallLineWidth: 1,
	

}

export const theme = {
	bodybackgroundColor: '#2D5A0E',
	backgroundColor: '#4B9618',
	wallColor: '#ffffff',
	objectShadow: '#2d5a0e',
	playerRecentPathHighlightColor: '#915db5',
	playerColor: '#631896',
	playerShadowColor: '#451378',
	enemyColor: '#ff0000',
	enemyShadowColor: '#cc0000',
	wallShadowColor: '#A0153E',

}

showMainMenu();

const canvas = document?.getElementById('canvas') as HTMLCanvasElement;

// setting canvas height and width without overflowing on device screen
assignCanvasWidthHight(canvas);

export const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

const body = document.getElementsByTagName('body')[0];
body.style.backgroundColor = theme.bodybackgroundColor;


export const game = {
	maze: new Maze(ctx, config.numberOfRows, config.numberOfColumns, theme.wallColor, theme.wallShadowColor, theme.backgroundColor, theme.objectShadow, theme.playerColor, theme.playerRecentPathHighlightColor, config.wallLineWidth),
	

}

renderMazePath(game.maze)

export const players = {
	player: new Player(0, 0, game.maze.wCell, game.maze.hCell, game.maze, ctx, theme.playerColor, theme.playerShadowColor, theme.enemyColor, theme.enemyShadowColor, 1),

}

// renderPlayer(player, maze, ctx);

document.onkeydown = checkKey;



function checkKey(e: any) {

	e = e || window.event;

    // else if (e.keyCode === 65) keyCode = 37; // A key to left arrow
    // else if (keyCode === 83) keyCode = 40; // S key to down arrow
    // else if (keyCode === 68) keyCode = 39; // D key to right arrow

	if (e.keyCode == '38' || e.keyCode == 87) {
		// up arrow or w
		if (!players.player.isPlayerAnimating){
			console.log('up arrow');
			goTop(players.player, game.maze, ctx);
			players.player.animatePlayer();
		} else {

			console.log('up arrow No');
		}

	}
	else if (e.keyCode == '40' || e.keyCode == 83) {
		// down arrow or s
		if (!players.player.isPlayerAnimating) {
			console.log('down swap');
			// erasePlayerAndPath (player, maze,ctx);
        	goBottom(players.player, game.maze, ctx);
			players.player.animatePlayer();
		} else {
			console.log('down arrow No')
		}
		

		
	}
	else if (e.keyCode == '37' || e.keyCode == 65) {
		// left arrow or a
		if (!players.player.isPlayerAnimating) {
			console.log('left swap');
			goLeft(players.player, game.maze, ctx);
			players.player.animatePlayer();
			
		} else {
			console.log('left arrow No');
		}
		
	}
	else if (e.keyCode == '39' || e.keyCode == 68) {
		// right arrow or d
		if (!players.player.isPlayerAnimating) {
			
			console.log('right swap');
			goRight(players.player, game.maze, ctx);
			players.player.animatePlayer();
		} else {
			console.log('righ arrow No');
		}
		
	}
}

setInterval(() => {
	reduceAlpha(game.maze.cells, players.player, 0.01, 0);
	// highlightVisitedCells(maze, player);

	if(players.player.isGameEnded) {
		game.maze = new Maze(ctx, config.numberOfRows, config.numberOfColumns, theme.wallColor, theme.wallShadowColor, theme.backgroundColor, theme.objectShadow, theme.playerColor, theme.playerRecentPathHighlightColor, config.wallLineWidth);
		players.player = new Player(0,0, game.maze.wCell, game.maze.hCell, game.maze, ctx, theme.playerColor, theme.playerShadowColor, theme.enemyColor, theme.enemyShadowColor, 1);
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
    if (Math.abs(deltaX) > 50) {
        // Horizontal swipe
        if (deltaX > 0) {
            // Swiped right
			event.preventDefault();
			if (!players.player.isPlayerAnimating) {
				console.log('Swiped right');
				goRight(players.player, game.maze, ctx);
				players.player.animatePlayer();
			} else {
				console.log('can not go right')
			}
        } else {
            // Swiped left
			event.preventDefault();
			if (!players.player.isPlayerAnimating) {
				console.log('Swiped left');
				goLeft(players.player, game.maze, ctx);
				players.player.animatePlayer();

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
			if (!players.player.isPlayerAnimating) {
				goBottom(players.player, game.maze, ctx);
				players.player.animatePlayer();

			} else {
				console.log('can not go swiped down')
			}
        } else {
			// Swiped up
			event.preventDefault();
			if (!players.player.isPlayerAnimating) {
				console.log('Swiped up');
				goTop(players.player, game.maze, ctx);
				players.player.animatePlayer();

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
