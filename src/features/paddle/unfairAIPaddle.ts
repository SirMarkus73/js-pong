import { Paddle } from "#/features/paddle/interfaces/paddle"
import type { GameContext } from "../game/interfaces/gameContext"

export class UnfairAIPaddle extends Paddle {
  public update(_deltaTime: number, context: GameContext): void {
    const { gameState, gameBounds } = context

    this.posY = gameState.sceneItems.playing.ball.posY - this.height / 2

    this.clampToBounds(gameBounds)
  }
}
