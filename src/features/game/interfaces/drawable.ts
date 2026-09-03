import type { Renderer } from "#/features/renderer/interfaces/renderer"
import type { GameContext } from "./gameContext"

export interface Drawable {
  draw(renderer: Renderer, gameContext: GameContext): void
}
