import type { GameContext } from "../game/interfaces/gameContext"
import { Paddle } from "./interfaces/paddle"

export class HumanPaddle extends Paddle {
  private moveSensitivity = 200

  public update(deltaTime: number, context: GameContext): void {
    const { gameInput, gameBounds } = context

    if (gameInput.keyboard.w) {
      console.log(deltaTime)
      this.posY -= this.moveSensitivity * deltaTime
    } else if (gameInput.keyboard.s) {
      this.posY += this.moveSensitivity * deltaTime
    }

    this.clampToBounds(gameBounds)
  }
}
