import { Cell } from "../maze/cell";
import { Maze } from "../maze/maze";
import { Path, Player } from "./player";

export const goTop = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    // player's current x and y coordinates are the cell location in array
    let currentCell = maze.cells[player.x][player.y];

    // check if cell allow us to go in that direction otherwise return
    if (!currentCell.isTopOpen) {
        console.log('cannot go top: ', player.x, ' ', player.y);
        return
    }

    // if cell is open in the direction then find the path player should go
    // until player has choice of selecting multiple paths, or reached a deadend cell
    // or reached the destination
    let paths: Path[] | null = player.findPath(currentCell, currentCell.topNeighbour as Cell);
    console.log('goTop(): paths: ',paths)

    // render the path on the canvas
    if(paths){
        
        console.log('goTop(): player current position: ', player.x, player.y);

        player.renderPath(paths as Path[], maze, ctx);
    }
    // player.renderPlayer(player.maze, player.ctx);
    
}

export const goRight = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    let currentCell = maze.cells[player.x][player.y];

    if (!currentCell.isRightOpen) {
        console.log('cannot go right: ', player.x, player.y);
        return
    }

    let paths: Path[] | null = player.findPath(currentCell, currentCell.rightNeighbour as Cell);
    console.log('goRight(): paths: ',paths)

    if(paths){

        console.log('goRight(): player current position: ', player.x, player.y);

        player.renderPath(paths as Path[], maze, ctx);
    }
    // player.renderPlayer(player.maze, player.ctx);

}

export const goBottom =(player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    let currentCell = maze.cells[player.x][player.y];

    if (!currentCell.isBottomOpen) {
        console.log('cannot go bottom: ', player.x, player.y);
        return
    }

    let paths: Path[] | null = player.findPath(currentCell, currentCell.bottomNeighbour as Cell);
    console.log('goBottom(): paths: ',paths)

    if(paths){

        console.log('gotBottom(): player current position: ', player.x, player.y);

        player.renderPath(paths as Path[], maze, ctx);
    }
    // player.renderPlayer(player.maze, player.ctx);
    
}

export const goLeft = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    let currentCell = maze.cells[player.x][player.y];

    if (!currentCell.isLeftOpen) {
        console.log('cannot go left: ', player.x, player.y);
        return
    }

    let paths: Path[] | null = player.findPath(currentCell, currentCell.leftNeighbour as Cell);
    console.log('goLeft(): paths: ',paths)

    if(paths){

        console.log('goLeft(): player current position: ', player.x, player.y);

        player.renderPath(paths as Path[], maze, ctx);

    }
    // player.renderPlayer(player.maze, player.ctx);
    
}