import type { GameState } from "#/features/game/gameState.js"
import type { GameBounds } from "#/features/game/interfaces/gameBounds.js"
import { Paddle } from "./paddle.js"

export class UnfairAIPaddle extends Paddle {
  public update(
    _deltaTime: number,
    gameState: GameState,
    bounds: GameBounds,
  ): void {
    this.posY = gameState.ball.posY - this.height / 2

    this.clampToBounds(bounds)
  }
}
