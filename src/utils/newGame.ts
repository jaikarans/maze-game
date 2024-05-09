import { config, ctx, game, players, theme } from ".."
import { Maze } from "../maze/maze"
import { renderMazePath } from "../maze/mazeBoundaryRender";
import { Player } from "../player/player"

export const createNewGame = () => {
    game. maze = new Maze(ctx, config.numberOfRows, config.numberOfColumns, theme.wallColor, theme.wallShadowColor, theme.backgroundColor, theme.objectShadow, theme.playerColor, theme.playerRecentPathHighlightColor, config.wallLineWidth);
    renderMazePath(game.maze)

    players.player = new Player(0, 0, game.maze.wCell, game.maze.hCell, game.maze, ctx, theme.playerColor, theme.playerShadowColor, theme.enemyColor, theme.enemyShadowColor, 1);


}