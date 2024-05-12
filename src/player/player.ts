import { Cell } from "../maze/cell";
import { cellHasTwoPaths, cellIsDeadend } from "../maze/cellQuery";
import { Maze } from "../maze/maze";
import { renderMazePath } from "../maze/mazeBoundaryRender";
import { reduceAlpha } from "../maze/reduceAlpha";
import { Firework } from "./firework";
import { stopTimer } from '../utils/timer'
import { disableTouchSwipe } from '../mobileTouch/mobileTouchHandler'
import { disableKeybordControl } from '../keybordAction/keybordHandler'
import { config } from '../index'


let playerWalkSound = new Audio('../assets/playerWalkSoundDum60.wav');

export class Path {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Player {
    x: number;
    y: number;
    xEnemy: number;
    yEnemy: number;
    xPre: number = -1;
    yPre: number = -1;

    // first inital coordinate of the player which is assign at player object construction
    xInitial: number;
    yInitial: number;

    distance: number;
    w: number;
    h: number;

    // previous x and y coordinate of the player;

    // scale is used to set the width and height scale
    scale: number;

    maze: Maze;
    ctx: CanvasRenderingContext2D;

    playerColor: string = 'green';
    playerShadowColor: string = 'blue';
    enemyColor: string = 'red';
    enemyShadowColor: string;
    isPlayerAnimating: boolean = false;
    // playerWalkSound: HTMLAudioElement;

    // player path from starting to current;
    playerPath: Path[] = new Array<Path>();
    numberOfPaths: number = this.playerPath.length;
    
    // the paths is stored when player moves backward
    playerBackwardPath: Path[] = new Array<Path>();
    prePaths: Path[] = new Array();
    isPlayerMovingBackward: boolean = false;

    isGameEnded: boolean = false;
    fireworks: Firework[] = [];


    constructor(x: number, y: number, w: number, h: number, maze: Maze, ctx: CanvasRenderingContext2D, playerColor: string='green', playerShadowColor: string, enemyColor:string = 'red', enemyShadowColor: string, scale: number = 1) {
        this.x = x;
        this.y = y;
        this.xInitial = this.x;
        this.yInitial = this.y;
        this.playerPath.push(new Path(this.xInitial, this.yInitial));
        this.w = w * scale;
        this.h = h * scale;
        this.distance = 0;
        this.scale = scale;
        this.playerColor = playerColor;
        this.enemyColor = enemyColor;
        this.playerShadowColor = playerShadowColor;
        this.enemyShadowColor = enemyShadowColor
        this.maze = maze;
        this.ctx = ctx;

        this.xEnemy = Math.floor(Math.random() * maze.rows);
        this.yEnemy = Math.floor(Math.random() * maze.columns);
        

        console.log('Enemy coordinate ', this.xEnemy,' ', this.yEnemy);
        this.drawPlayer(this.x, this.y);
        this.drawEnemy();

        this.animatePlayer = this.animatePlayer.bind(this);
        


    }

    renderPath(maze: Maze, ctx: CanvasRenderingContext2D) {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        renderMazePath(maze);

        console.log('renderPath() : playerPath.length ', this.playerPath.length, this.playerPath);

        let cells: Cell[][] = maze.cells;

        ctx.save();
        ctx.strokeStyle = this.playerColor;
        ctx.beginPath();
        ctx.lineWidth = 3;
        this.playerPath.forEach(path => {
            // let cx = this.w * path.x + this.w/2;
            // let cy = this.h * path.y + this.h/2;

            let cx = (path.x + 0.5) * maze.wCell; // Adjust for cell center and scale
            let cy = (path.y + 0.5) * maze.hCell;

            // ctx.globalAlpha = cells[path.x][path.y].alpha

            console.log(this.x, this.y);
            // ctx.arc(cx, cy, this.w/3, 0, 2 * Math.PI, false);
            ctx.lineTo(cx, cy);
            // ctx.fillRect(cx, cy, maze.wCell, maze.hCell)

        })
        ctx.stroke();
        ctx.closePath();
        ctx.restore();


    }

    findPath(cell: Cell, sideCell: Cell) {
        
        if (!cell) {
            console.log('Player.findPath() : cell you paased is null or undefined')
            return null;
        }
        if (!sideCell) {
            console.log('Player.findPath(cell, side) : side value can be top, right, bottom, left only');
            return null;
        }

        let tmpCell: Cell;

        // console.log('before added to paths x,y ', this.x,' ',this.y);

        while (!cellHasTwoPaths(sideCell) && !cellIsDeadend(sideCell) && !this.cellIsEnemy(sideCell)) {

            // console.log('while Loop')

            // paths.push(new Path(sideCell.x, sideCell.y));
            // console.log('findPath(): sideCell.x and y ', sideCell.x,' ', sideCell.y)
            this.playerPath.push(new Path(sideCell.x, sideCell.y));

            if (sideCell.topNeighbour && sideCell.topNeighbour !== cell) {
                tmpCell = sideCell;
                cell = sideCell;
                sideCell = tmpCell.topNeighbour as Cell;
            } else if (sideCell.rightNeighbour && sideCell.rightNeighbour !== cell) {
                tmpCell = sideCell;
                cell = sideCell;
                sideCell = tmpCell.rightNeighbour as Cell;
            } else if (sideCell.bottomNeighbour && sideCell.bottomNeighbour !== cell) {
                tmpCell = sideCell;
                cell = sideCell;
                sideCell = tmpCell.bottomNeighbour as Cell;
            } else if (sideCell.leftNeighbour && sideCell.leftNeighbour !== cell) {
                tmpCell = sideCell;
                cell = sideCell;
                sideCell = tmpCell.leftNeighbour as Cell;
            }

        }

        if (cellHasTwoPaths(sideCell) || cellIsDeadend(sideCell) || this.cellIsEnemy(sideCell)) {
            this.playerPath.push(new Path(sideCell.x, sideCell.y));
        }

        this.numberOfPaths = this.playerPath.length;
        this.playerPath.reverse();
        console.log("findPath() playerPath lenght", this.playerPath.length)


    }

    cellIsEnemy(cell: Cell) {
        if (cell.x == this.xEnemy && cell.y == this.yEnemy){
            console.log('enemy cell ',cell.x,' ',cell.y,' xEnemy ', this.xEnemy,' ', this.yEnemy, '###############################################################')
            return true;
        }

        return false;
    }

    isPathAlreadyPresentOnPlayerPath(path: Path): boolean {
        console.log("pathPresent(): ", this.playerPath,'path ', path);
        
        for (let i=0; i<this.playerPath.length; i++){
            if (path.x == this.playerPath[i].x && path.y == this.playerPath[i].y)
                return true;
        }
        return false;
    }

    removePathFromArray(paths: Path[]) {
        console.log('removePathArray() before : playerPath', this.playerPath);
        this.playerPath = this.playerPath.filter(path => {
            if (path.x === this.xInitial && path.y === this.yInitial) {
                return true; // Keep the initial position
            } else {
                // Check if the current path is present in the paths array
                const isPathInPaths = paths.some(p => p.x === path.x && p.y === path.y);
                // Return true if the path is not in the paths array
                return !isPathInPaths;
            }
        });
        console.log('removePathArray() out : playerPath', this.playerPath);
    }
    

    // Define animation function
    async animatePlayer() {

        this.isPlayerAnimating = true;

        console.log('audio duration ', playerWalkSound.duration)
        if (config.soundEnabled) {
            playerWalkSound.play();

        }
        // await new Promise(resolve => {
        //     this.playerWalkSound.onended = resolve; // Resolve the Promise when audio playback ends
        // });
        


        const nextPoint = this.playerPath.pop();

        await new Promise(resolve => setTimeout(resolve, 50));

        // i++;
        // console.log('currentPointIndex: ', currentPointIndex)
        console.log('animate else Length of playerPath ', this.playerPath.length);


        console.log('else !nextPoint: ', !nextPoint, nextPoint)
        if (!nextPoint) {
            this.isPlayerAnimating = false;
            console.log('else animation return:')
            return; // Animation complete
        }

        this.x = nextPoint.x;
        this.y = nextPoint.y;

        // Clear canvas and redraw maze
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // creating border canvas
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.maze.wallColor;
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = this.maze.wallLineWidth; 
        this.ctx.strokeRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.ctx.stroke();
        this.ctx.restore();



        renderMazePath(this.maze);
        this.drawEnemy();

        // Draw player at new position
        console.log('else drawing x y ', this.x, ' ', this.y, ' playerPath ', this.playerPath)
        // this.drawPlayer((this.x + 0.5) * this.w, (this.y + 0.5) * this.h);
        this.drawPlayer(this.x, this.y);
        // this.playerWalkSound.pause();

        // // giving alpha value for background higlighting
        // const alphaDifference = (80 - 5) / this.numberOfPaths;
        // let alpha = this.numberOfPaths - this.playerPath.length;

        this.maze.cells[this.x][this.y].alpha = 0.5;
        // alpha = this.numberOfPaths
        // alpha++;
        // reduceAlpha(this.maze.cells, this, 0.01,0)

        if (this.x == this.xEnemy && this.y == this.yEnemy) {
            // alert('game end please refrese the game');
            console.log('game end please refrese the game');
            this.isGameEnded = true;
            this.isPlayerAnimating = false;
            let gameEndMenu = document.getElementById('gameEndOverlay');
            if (gameEndMenu) {

                gameEndMenu.style.display = 'flex';
            }

            let score = document.getElementById('time');
            let timer = document.getElementById('timer');
            if (score) {
                if (timer) {
                    score.innerText = timer.innerText;
                    stopTimer();
                }
            }

            // disabling the touch swipe
            disableTouchSwipe();
            // disable keyboard keys for controlling game
            disableKeybordControl();
            
            return;
                
        }

        // this.playerWalkSound.pause();
        // Repeat animation
        requestAnimationFrame(this.animatePlayer);

    }

    currentPointIndexOnPlayerPath() {
        for (let i = 0; i < this.playerPath.length; i++) {
            const path = this.playerPath[i];
            if (this.x == path.x && this.y == path.y)
                return i;
        }
        return 0;
    }

    drawPlayer(x: number, y: number) {
        let radius;
        if (this.w == this.h) {
            radius = (this.h/2) - this.maze.wallLineWidth ;
        } else if (this.w < this.h) {
            radius = this.w/2 - this.maze.wallLineWidth ;
        } else {
            radius = this.h/2 - this.maze.wallLineWidth ;
        }

        // this.ctx.save()
        // this.ctx.fillStyle = rg;
        this.ctx.save();
        let rg = this.ctx.createRadialGradient(
            (x) * this.w + this.w/3, (y) * this.h + this.w/3, 0,  // Inner circle position and radius
            (x + 0.5) * this.w, (y + 0.5) * this.h, radius // Outer circle position and radius
        );
        rg.addColorStop(0, this.playerColor);
        rg.addColorStop (1, this.playerShadowColor)
        this.ctx.fillStyle = rg;

        this.ctx.shadowColor = this.maze.objectShadow
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 4;
        this.ctx.shadowBlur = 4;

        // Draw a green circle representing the player
        this.ctx.beginPath();
        // this.ctx.fillStyle = 'blue'
        this.ctx.arc((x + 0.5) * this.w, (y + 0.5) * this.h, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        // this.ctx.restore();
        // this.ctx.save();

        // this.ctx.fillStyle = 'yellow'
        // this.ctx.beginPath();
        // this.ctx.arc(((x) * this.w) + (this.w/3), ((y) * this.h) + (this.h/3), (halfPlayerSize - this.maze.wallLineWidth)/4, 0, Math.PI * 2);
        // this.ctx.fill();
        this.ctx.restore()
        console.log('drawPlayer x,y ',x, ' ', y)
    }

    drawEnemy() {
        
        let radius;
        if (this.w == this.h) {
            radius = (this.h/2) - this.maze.wallLineWidth;
        } else if (this.w < this.h) {
            radius = this.w/2 - this.maze.wallLineWidth;
        } else {
            radius = this.h/2 - this.maze.wallLineWidth;
        }

        // Draw a green circle representing the playe
        this.ctx.save();
        let rg = this.ctx.createRadialGradient(
            (this.xEnemy) * this.w + this.w/3, (this.yEnemy) * this.h + this.w/3, 0,  // Inner circle position and radius
            (this.xEnemy + 0.5) * this.w, (this.yEnemy + 0.5) * this.h, radius // Outer circle position and radius
        );
        rg.addColorStop(0, this.enemyColor);
        rg.addColorStop (1, this.enemyShadowColor)
        this.ctx.fillStyle = rg;

        this.ctx.shadowColor = this.maze.objectShadow;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 4;
        this.ctx.shadowBlur = 4;

        this.ctx.beginPath();
        // this.ctx.fillStyle = this.enemyColor;
        this.ctx.arc((this.xEnemy + 0.5) * this.w, (this.yEnemy + 0.5) * this.h, radius, 0, Math.PI * 2);
        // this.ctx.arc(((this.xEnemy + 0.5) * this.w)/1.5, ((this.yEnemy + 0.5) * this.h)/1.5, (halfPlayerSize - this.maze.wallLineWidth)/4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore()
        console.log('drawEnemy x, y ',this.xEnemy, ' ', this.yEnemy);
    }



}