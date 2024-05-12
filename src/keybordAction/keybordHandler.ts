import { ctx, game, players } from "..";
import { goBottom, goLeft, goRight, goTop } from "../player/playerControlls";


function checkKey(e: any) {

	e = e || window.event;

    // else if (e.keyCode === 65) keyCode = 37; // A key to left arrow
    // else if (keyCode === 83) keyCode = 40; // S key to down arrow
    // else if (keyCode === 68) keyCode = 39; // D key to right arrow

	if (e.keyCode == '38' || e.keyCode == 87) {
		// up arrow or w
		if (!players.player.isPlayerAnimating){
			// console.log('up arrow');
			goTop(players.player, game.maze, ctx);
			players.player.animatePlayer();
		} else {

			// console.log('up arrow No');
		}

	}
	else if (e.keyCode == '40' || e.keyCode == 83) {
		// down arrow or s
		if (!players.player.isPlayerAnimating) {
			// console.log('down swap');
			// erasePlayerAndPath (player, maze,ctx);
        	goBottom(players.player, game.maze, ctx);
			players.player.animatePlayer();
		} else {
			// console.log('down arrow No')
		}
		

		
	}
	else if (e.keyCode == '37' || e.keyCode == 65) {
		// left arrow or a
		if (!players.player.isPlayerAnimating) {
			// console.log('left swap');
			goLeft(players.player, game.maze, ctx);
			players.player.animatePlayer();
			
		} else {
			// console.log('left arrow No');
		}
		
	}
	else if (e.keyCode == '39' || e.keyCode == 68) {
		// right arrow or d
		if (!players.player.isPlayerAnimating) {
			
			// console.log('right swap');
			goRight(players.player, game.maze, ctx);
			players.player.animatePlayer();
		} else {
			// console.log('righ arrow No');
		}
		
	}
}

export const enableKeybordControl = () => {
	document.onkeydown = checkKey;
}

export const disableKeybordControl = () => {
	document.onkeydown = null;

}