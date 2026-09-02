import type { GameState } from "../gameState/gameState.js"
import type { GameBounds } from "./interfaces/gameBounds.js"

export abstract class GameObject {
  public abstract update(
    deltaTime: number,
    gameState: GameState,
    bounds: GameBounds,
  ): void
  public abstract draw(ctx: CanvasRenderingContext2D): void
  public abstract reset(): void
}
