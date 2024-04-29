import '../index.css'
import { Maze } from './maze/maze';
import { CellsWithoutAnyOpenSide, printCellPath } from './tests/cell';
import { assignCanvasWidthHight } from './utils/canvasGeometry';

const canvas = document?.getElementById('canvas') as HTMLCanvasElement;

// setting canvas height and width without overflowing on device screen
assignCanvasWidthHight(canvas);

const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

let maze = new Maze(ctx, 50, 50, 'red', 'white', 'green', 'black');
maze.renderPath();

// tests
// CellsWithoutAnyOpenSide(maze.cells);
// printCellPath(maze, ctx);


console.log("viportWidth: ", window.innerWidth, " viewportHeight: ", window.innerHeight)
