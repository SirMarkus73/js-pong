import type { GameState } from "../game/gameState"
import type { GameBounds } from "../game/interfaces/gameBounds"
import { Paddle } from "./interfaces/paddle"

export class HumanPaddle extends Paddle {
  private moveSensitivity = 200

  public update(
    deltaTime: number,
    gameState: GameState,
    bounds: GameBounds,
  ): void {
    if (gameState.input.keyboard.wPressed) {
      console.log(deltaTime)
      this.posY -= this.moveSensitivity * deltaTime
    } else if (gameState.input.keyboard.sPressed) {
      this.posY += this.moveSensitivity * deltaTime
    }

    this.clampToBounds(bounds)
  }
}
