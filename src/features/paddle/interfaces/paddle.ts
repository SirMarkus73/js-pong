import type { GameInput } from "#/features/game/gameInput"
import type { GameState } from "#/features/game/gameState"
import type { GameBounds } from "#/features/game/interfaces/gameBounds"
import type { GameObject } from "#/features/game/interfaces/gameObject"
import type { Renderer } from "#/features/renderer/interfaces/renderer"

export abstract class Paddle implements GameObject {
  public readonly posX: number
  public posY: number

  constructor(
    startingX: number,
    private readonly startingY: number,

    public readonly width: number,
    public readonly height: number,
  ) {
    this.posX = startingX
    this.posY = startingY
  }

  public abstract update(
    deltaTime: number,
    gameState: GameState,
    gameInput: GameInput,
    bounds: GameBounds,
  ): void

  public draw(renderer: Renderer): void {
    renderer.drawRectangle(
      this.posX,
      this.posY,
      this.width,
      this.height,
      "#ffff",
    )
  }

  public reset(): void {
    this.posY = this.startingY
  }

  protected clampToBounds(bounds: GameBounds): void {
    this.posY = Math.min(Math.max(this.posY, 0), bounds.height - this.height)
  }
}
