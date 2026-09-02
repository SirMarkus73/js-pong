import type { GameState } from "#/features/game/gameState.js"
import type { GameBounds } from "#/features/game/interfaces/gameBounds.js"
import type { GameObject } from "#/features/game/interfaces/gameObject.js"
import type { Renderer } from "../renderer/interfaces/renderer"

export class Paddle implements GameObject {
  public posX: number
  public posY: number

  constructor(
    private readonly startingX: number,
    private readonly startingY: number,

    public readonly width: number,
    public readonly height: number,
  ) {
    this.posX = startingX
    this.posY = startingY
  }

  public draw(renderer: Renderer): void {
    renderer.drawRectangle(
      this.posX,
      this.posY,
      this.width,
      this.height,
      "#ffff",
    )
  }

  public update(
    _deltaTime: number,
    _gameState: GameState,
    _bounds: GameBounds,
  ): void {}

  public reset(): void {
    this.posX = this.startingX
    this.posY = this.startingY
  }

  protected clampToBounds(bounds: GameBounds): void {
    this.posY = Math.min(Math.max(this.posY, 0), bounds.height - this.height)
  }
}
