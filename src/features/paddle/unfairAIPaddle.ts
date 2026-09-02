import type { GameBounds } from "../abc/interfaces/gameBounds.js"
import type { GameState } from "../gameState/gameState.js"
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
