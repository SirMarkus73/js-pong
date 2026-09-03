import type { GameContext } from "./gameContext"

export interface Updatable {
  update(deltaTime: number, context: GameContext): void
}
