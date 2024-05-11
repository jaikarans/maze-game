import { config, ctx, game, players, theme } from "..";
import { Maze } from "../maze/maze";
import { Player } from "../player/player";
import { createNewGame } from "../utils/newGame";
import { showMainMenu } from '../pages/mainMenu'
import { resetTimerText, startCounter } from '../utils/timer'
import { enableTouchSwipe } from '../mobileTouch/mobileTouchHandler'
import { enableKeybordControl } from "../keybordAction/keybordHandler";

const gameEndOverlay = document.getElementById('gameEndOverlay');
const newGameButton = document.getElementById('newGameButton');
const mainMenuButton = document.getElementById('mainMenuOverlay');

newGameButton?.addEventListener('click', () => {
    if (gameEndOverlay) {
        gameEndOverlay.style.display = 'none';
    }
    createNewGame();
    resetTimerText();
    startCounter();

    // enable touch swipe
    enableTouchSwipe();
    // enable keyboard control
    enableKeybordControl();

});

mainMenuButton?.addEventListener('click', () => {
    if (gameEndOverlay) {
        gameEndOverlay.style.display = 'none';
    }

    // showing menu screen
    showMainMenu();
});


console.log('hi gameEnd.ts')