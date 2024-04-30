import { Cell } from "./cell";
import { getAnyUnvisitedNeighbourOf, removeWallBetween } from "./cellOperations";
import { Maze } from "./maze";

export const generateMazePaths = (maze: Maze, initialCellX:number, initialCellY:number) => {
    let cellStack: Cell[] = new Array();

    // here is the algorithm for generating the maze
    // https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation_(with_stack)

    // Step-(1) Choose the initial cell, mark it as visited and push it to the stack
    let initialCell: Cell = maze.cells[initialCellX][initialCellY];
    initialCell.isVisited = true;
    cellStack.push(initialCell);

    // Step-(2) while stack is not empty
    while(cellStack.length > 0) {
        /// Step-(2A) Pop a cell from the stack and make it a current cell
        let currentCell: Cell = cellStack.pop() as Cell;

        /// Step-(2B) If the current cell has any neighbours which have not been visited
        if (currentCell.hasUnvisitedNeighbour()) {
            //// Step-(2B-1) Push the current cell to the stack
            cellStack.push(currentCell);


            //// Step-(2B-2) Choose one of the unvisited neighbours
            let cellUnvisited: Cell | null = getAnyUnvisitedNeighbourOf(currentCell);

            if (cellUnvisited) {
                //// Step-(2B-3) Remove the wall between the current cell and the chosen cell
                removeWallBetween(currentCell, cellUnvisited);

                //// Step-(2B-4) Mark the chosen cell as visited and push it to the stack
                cellUnvisited.isVisited = true;
                cellStack.push(cellUnvisited);

            }
        }
    }
    maze.removeUnlikedNeighbours();
}