import type { GameInput } from "#/features/game/gameInput"
import type { GameState } from "#/features/game/gameState.js"
import type { GameBounds } from "#/features/game/interfaces/gameBounds.js"
import type { Renderer } from "#/features/renderer/interfaces/renderer"

export interface GameObject {
  update(
    deltaTime: number,
    gameState: GameState,
    gameInput: GameInput,
    bounds: GameBounds,
  ): void
  draw(renderer: Renderer): void
  reset(): void
}
