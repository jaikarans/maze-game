import { Cell } from "../maze/cell";
import { Maze } from "../maze/maze";
import { Player } from "./player";

export const goTop = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    // player's current x and y coordinates are the cell location in array
    let currentCell = maze.cells[player.x][player.y];

    // check if cell allow us to go in that direction otherwise return
    if (!currentCell.isTopOpen) {
        // console.log('cannot go top: ', player.x, ' ', player.y);
        return
    }

    // if cell is open in the direction then find the path player should go
    // until player has choice of selecting multiple paths, or reached a deadend cell
    // or reached the destination
    player.findPath(currentCell, currentCell.topNeighbour as Cell);
    // player.renderPath(maze, ctx);
    // console.log('goTop()')

}

export const goRight = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    let currentCell = maze.cells[player.x][player.y];

    if (!currentCell.isRightOpen) {
        // console.log('cannot go right: ', player.x, player.y);
        return
    }

    player.findPath(currentCell, currentCell.rightNeighbour as Cell);
    // player.renderPath(maze, ctx);
    // console.log('goRight()')

}

export const goBottom =(player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    let currentCell = maze.cells[player.x][player.y];

    if (!currentCell.isBottomOpen) {
        // console.log('cannot go bottom: ', player.x, player.y);
        return
    }

    player.findPath(currentCell, currentCell.bottomNeighbour as Cell);
    // player.renderPath(maze, ctx);
    // console.log('goBottom()')

}

export const goLeft = (player: Player, maze: Maze, ctx: CanvasRenderingContext2D) => {

    let currentCell = maze.cells[player.x][player.y];

    if (!currentCell.isLeftOpen) {
        // console.log('cannot go left: ', player.x, player.y);
        return
    }

    player.findPath(currentCell, currentCell.leftNeighbour as Cell);
    // player.renderPath(maze, ctx);
    // console.log('goLeft()');
    
}