import type { Renderer } from "#/features/renderer/interfaces/renderer"
import type { GameContext } from "../interfaces/gameContext"

export function drawGame(r: Renderer, gameContext: GameContext): void {
  r.clearScreen()
  const { gameState } = gameContext
  const sceneItems = gameState.sceneItems[gameState.state]

  for (const item of Object.values(sceneItems)) {
    item.draw(r, gameContext)
  }
}
