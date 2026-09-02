import type { GameState } from "#/features/game/gameState.js"
import type { GameBounds } from "#/features/game/interfaces/gameBounds.js"

export interface GameObject {
  update(deltaTime: number, gameState: GameState, bounds: GameBounds): void
  draw(ctx: CanvasRenderingContext2D): void
  reset(): void
}
