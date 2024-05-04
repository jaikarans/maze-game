import { printCellPath } from "../tests/cell";
import { drawCellBoundary } from "./cellRender";
import { Maze } from "./maze";

export const renderMazePath = (maze: Maze) => {
    maze.cells.forEach(cellArray => {
        cellArray.forEach(cell => {
            drawCellBoundary(cell, maze, maze.ctx);
            // printCellPath(maze,maze.ctx)
        })
    })
}