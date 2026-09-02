import type { GameInput } from "../game/gameInput"
import type { GameState } from "../game/gameState"
import type { GameBounds } from "../game/interfaces/gameBounds"
import { Paddle } from "./interfaces/paddle"

export class HumanPaddle extends Paddle {
  private moveSensitivity = 200

  public update(
    deltaTime: number,
    _gameState: GameState,
    gameInput: GameInput,
    bounds: GameBounds,
  ): void {
    if (gameInput.keyboard.w) {
      console.log(deltaTime)
      this.posY -= this.moveSensitivity * deltaTime
    } else if (gameInput.keyboard.s) {
      this.posY += this.moveSensitivity * deltaTime
    }

    this.clampToBounds(bounds)
  }
}
