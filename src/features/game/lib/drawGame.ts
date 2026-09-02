import type { Renderer } from "#/features/renderer/interfaces/renderer"
import { GAME_STATUS, type GameState } from "../gameState"
import type { GameBounds } from "../interfaces/gameBounds"

export function drawGame(
  r: Renderer,
  gameState: GameState,
  gameBounds: GameBounds,
): void {
  r.clearScreen()

  if (gameState.state === GAME_STATUS.PLAYING) {
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

    gameState.paddleLeft.draw(r)
    gameState.paddleRight.draw(r)
    gameState.ball.draw(r)
    return
  }

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
}
