import '../index.css'
import './pages/gameEnd'
import './mobileTouch/mobileTouchHandler'
import './keybordAction/keybordHandler'
import { Maze } from './maze/maze';
import { Player } from './player/player';
import { goBottom, goLeft, goRight, goTop } from './player/playerControlls';
import { assignCanvasWidthHight } from './utils/canvasGeometry';
import { renderMazePath } from './maze/mazeBoundaryRender';
import { reduceAlpha } from './maze/reduceAlpha';
import '../assets/playerWalkSoundDum60.wav'
import { showMainMenu } from './pages/mainMenu';

import logo from '../assets/pauseIcon50.png';

// Use the imported image as needed in your code
// const img = new Image();
// img.src = logo;
// document.getElementById('gameMenu')?.appendChild(img);


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

// reducing color transparacy of player's recent highlighted path
setInterval(() => {
	reduceAlpha(game.maze.cells, players.player, 0.01, 0);
	// highlightVisitedCells(maze, player);

}, 200)

console.log("viportWidth: ", window.innerWidth, " viewportHeight: ", window.innerHeight)
