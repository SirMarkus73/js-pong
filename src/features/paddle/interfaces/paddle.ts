import type { GameInput } from "#/features/game/gameInput"
import type { GameState } from "#/features/game/gameState"
import type { Drawable } from "#/features/game/interfaces/drawable"
import type { GameBounds } from "#/features/game/interfaces/gameBounds"
import type { GameContext } from "#/features/game/interfaces/gameContext"
import type { Resettable } from "#/features/game/interfaces/resettable"
import type { Updatable } from "#/features/game/interfaces/updatable"
import type { Renderer } from "#/features/renderer/interfaces/renderer"

export abstract class Paddle implements Resettable, Updatable, Drawable {
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

  public abstract update(deltaTime: number, context: GameContext): void

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
