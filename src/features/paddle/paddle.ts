import type { GameObject } from "../abc/gameObject.js"
import type { GameBounds } from "../abc/interfaces/gameBounds.js"
import type { GameState } from "../gameState/gameState.js"

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

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
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
