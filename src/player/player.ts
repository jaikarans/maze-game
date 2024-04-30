import { Cell } from "../maze/cell";
import { cellHasTwoPaths, cellIsDeadend } from "../maze/cellQuery";
import { Maze } from "../maze/maze";

export class Path {
    x: number
    y: number

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Player {
    x: number;
    y: number;
    xPre: number = -1;
    yPre: number = -1;
    w: number;
    h: number;

    // previous x and y coordinate of the player;

    // scale is used to set the width and height scale
    scale: number;
    
    maze: Maze;
    ctx: CanvasRenderingContext2D;

    playerColor: string = 'green';

    // player path from starting to current;
    playerPath: Path[][] = new Array();
    prePaths: Path[] = new Array();

    constructor (x: number, y: number, w: number, h: number, maze: Maze, ctx: CanvasRenderingContext2D, playerColor:string = 'green', scale: number = 1){
        this.x = x;
        this.y = y;
        this.prePaths.push(new Path(0,0));
        this.w = w * scale;
        this.h = h * scale;
        this.scale = scale;
        this.playerColor = playerColor;
        this.maze = maze;
        this.ctx = ctx;
    }

    renderPath(paths: Path[], maze: Maze, ctx: CanvasRenderingContext2D) {

        if (paths) {

            console.log('renderPath() : paths.length ', paths.length);
            console.log('renderPath() : playerPath.length ', this.playerPath.length, this.playerPath);

            let currentPath: Path = paths[paths.length-1];

            //TODO - add functionlity for player to go back on path
            if (false) {

                let p:Path[] = this.playerPath.pop() as Path[];

                console.log('renderPath() in reverse***************** : p.length ', p);

                if (p && p.length>0) {
                    // ctx.strokeStyle = maze.surfaceColor;
                    ctx.strokeStyle = 'blue';
                    ctx.beginPath();
                    // ctx.moveTo(this.x, this.y)

                    for (let i=p.length-1; i>=0; i--) {
                        let cx = this.w * p[i].x + this.w/2;
                        let cy = this.h * p[i].y + this.h/2;

                        console.log('erase', this.x, this.y);
                        // ctx.arc(cx, cy, this.w/3, 0, 2 * Math.PI, false);
                        ctx.lineTo(cx, cy);
                    }
                    ctx.stroke();
                    ctx.closePath();
                    
                }

                if (this.prePaths.length > 1) {
                    this.x = this.prePaths[this.prePaths.length-1].x;
                    this.y = this.prePaths[this.prePaths.length-1].y;
                    this.prePaths.pop();

                }

                console.log('renderPath() : paths.length ', paths.length);
                console.log('renderPath() : playerPath.length ', this.playerPath.length, this.playerPath);
                
            }
            else {
                ctx.strokeStyle = this.playerColor;
                ctx.beginPath();
                paths.forEach(path => {
                    let cx = this.w * path.x + this.w/2;
                    let cy = this.h * path.y + this.h/2;
                    console.log(this.x, this.y);
                    // ctx.arc(cx, cy, this.w/3, 0, 2 * Math.PI, false);
                    ctx.lineTo(cx, cy);
                })
                ctx.stroke();
                ctx.closePath();
                this.prePaths.push(new Path(this.x, this.y))
            }
        
        }

    }

    findPath(cell: Cell, sideCell: Cell): Path[] | null {
        if (!cell) {
            console.log('Player.findPath() : cell you paased is null or undefined')
            return null;
        }
        if (!sideCell) {
            console.log('Player.findPath(cell, side) : side value can be top, right, bottom, left only');
            return null;
        }

        let paths: Path[] = new Array();
        let tmpCell: Cell;

        paths.push(new Path(cell.x, cell.y));

        while(!cellHasTwoPaths(sideCell) && !cellIsDeadend(sideCell)){

            console.log('while Loop')

            paths.push(new Path(sideCell.x, sideCell.y));

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

        if (cellHasTwoPaths(sideCell) || cellIsDeadend(sideCell)) {
            paths.push(new Path(sideCell.x, sideCell.y));
        }

        // updating the letest path coordinate of player
        let currentPathEnd = paths[paths.length-1];
        this.x = currentPathEnd.x;
        this.y = currentPathEnd.y;

        // this.eraseCharacterFromCanvas(this.maze, this.ctx)
        console.log('check paths ', this.x,' ',this.y, ' !== ', this.prePaths[this.prePaths.length-1].x, '  ',this.prePaths[this.prePaths.length-1].y)
        console.log('prePaths', this.prePaths)
        if (this.x !== this.prePaths[this.prePaths.length-1].x && this.y !== this.prePaths[this.prePaths.length-1].y) {
            this.playerPath.push(paths);
        }

        console.log("playerPath in go top", this.playerPath.length)

        return paths;

    }
    
}