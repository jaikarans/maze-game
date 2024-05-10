import { ctx, game, players } from "..";
import { goBottom, goLeft, goRight, goTop } from "../player/playerControlls";

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
