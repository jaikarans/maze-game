import { config } from "..";
import { disableKeybordControl, enableKeybordControl } from "../keybordAction/keybordHandler";
import { disableTouchSwipe, enableTouchSwipe } from "../mobileTouch/mobileTouchHandler";
import { pauseTimer, resumeTimer } from "../utils/timer";
import { showMainMenu } from "./mainMenu";

export const pauseGameOverlay = document.getElementById('pauseGameOverlay');

const resumeGameButton = document.getElementById('resumeGameButton');
const MainMenuButton = document.getElementById('MainMenuButton');

const pauseButton = document.getElementById('pauseButton');
pauseButton?.addEventListener('click', () => {
    // pausing the timer
    pauseTimer();

    if (pauseGameOverlay) {
        pauseGameOverlay.style.display = 'flex'
    }

    // disabling the touch swipe
    disableTouchSwipe();
    // disable keyboard keys for controlling game
    disableKeybordControl();

    if (pauseGameOverlay) {
        if (config.mobile) {
            pauseGameOverlay.style.width = '50%';
        } else {
            pauseGameOverlay.style.width = '30%';
        }

        pauseGameOverlay.style.display = 'flex';
    }
})

resumeGameButton?.addEventListener('click', () => {
    if (pauseGameOverlay) {
        pauseGameOverlay.style.display = 'none'
    }

    // starting the time counting

    resumeTimer();
    
    enableTouchSwipe();
    enableKeybordControl();
});

MainMenuButton?.addEventListener('click', () => {
    showMainMenu();
})