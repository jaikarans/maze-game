import { Player } from "../player/player";
import { Cell } from "./cell";

export const reduceAlpha = (cells: Cell[][], player: Player, reduceBy: number, reduceTill: number = 0) => {
    cells.forEach(cellArray => {
        cellArray.forEach(cell => {
            // console.log('cell.alpha before ', cell.alpha)
            if (cell.alpha !== 0){

                cell.alpha = parseFloat((cell.alpha - reduceBy).toFixed(2));
                // cell.alpha = cell.alpha - reduceBy;
            }
            if (cell.alpha < 0) {
                cell.alpha = 0;
            }
            // console.log('cell.alpha after ', cell.alpha)

        })
    });

}
