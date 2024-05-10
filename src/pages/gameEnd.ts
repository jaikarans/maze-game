import { config, ctx, game, players, theme } from "..";
import { Maze } from "../maze/maze";
import { Player } from "../player/player";
import { createNewGame } from "../utils/newGame";

const gameEndOverlay = document.getElementById('gameEndOverlay');
const newGameButton = document.getElementById('newGameButton');
const mainMenuButton = document.getElementById('mainMenuOverlay');

newGameButton?.addEventListener('click', () => {
    if (gameEndOverlay) {
        gameEndOverlay.style.display = 'none';
    }
    createNewGame();

});

mainMenuButton?.addEventListener('click', () => {
    if (gameEndOverlay) {
        gameEndOverlay.style.display = 'none';
    }

    // removing game screen
    let gameDiv = document.getElementById('game');
    if (gameDiv){
        console.log('gameDiv is set to none')
        gameDiv.style.display = 'none';
        
    }
    
    // showing menu screen
    let mainMenu = document.getElementById('mainMenu');
    if (mainMenu) {
        mainMenu.style.display = 'block';

    }
});


console.log('hi gameEnd.ts')