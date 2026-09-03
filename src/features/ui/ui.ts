import { GAME_STATUS } from "../game/gameState"
import type { Drawable } from "../game/interfaces/drawable"
import type { GameContext } from "../game/interfaces/gameContext"
import type { Renderer } from "../renderer/interfaces/renderer"

export class UI implements Drawable {
  draw(r: Renderer, gameContext: GameContext): void {
    const { gameState, gameBounds } = gameContext

    if (gameState.state === "playing") {
      const centerX = gameBounds.width / 2
      r.drawText(
        `${gameState.score.left}`,
        centerX - 20,
        30,
        "system-ui",
        "20px",
        "center",
      )

      r.drawText(
        `${gameState.score.right}`,
        centerX + 20,
        30,
        "system-ui",
        "20px",
        "center",
      )

      r.drawRectangle(centerX - 1, 0, 2, gameBounds.height, "#ffff")
      return
    }

    if (gameState.state === "gameOver") {
      const { gameInput } = gameContext

      r.drawText(
        "GAME OVER",
        gameBounds.width / 2,
        gameBounds.height / 2,
        "system-ui",
        "20px",
        "center",
      )

      r.drawText(
        "Press SPACE or CLICK to restart the game",
        gameBounds.width / 2,
        gameBounds.height / 2 + 45,
        "system-ui",
        "25px",
        "center",
      )

      if (
        gameState.state === GAME_STATUS.GAME_OVER &&
        (gameInput.keyboard.space ||
          gameInput.pointer.left ||
          gameInput.pointer.right)
      ) {
        gameState.start()
      }
    }
  }
}
