import type { GameInput } from "#/features/game/gameInput"
import type { GameState } from "#/features/game/gameState"
import type { GameBounds } from "#/features/game/interfaces/gameBounds"
import { Paddle } from "#/features/paddle/interfaces/paddle"

export class UnfairAIPaddle extends Paddle {
  public update(
    _deltaTime: number,
    gameState: GameState,
    _gameInput: GameInput,
    bounds: GameBounds,
  ): void {
    this.posY = gameState.ball.posY - this.height / 2

    this.clampToBounds(bounds)
  }
}
