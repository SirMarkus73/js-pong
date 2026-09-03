import type { GameContext } from "../interfaces/gameContext"

export function updateGame(deltaTime: number, gameContext: GameContext): void {
  const { gameState } = gameContext

  const sceneItems = gameState.sceneItems[gameState.state]

  for (const item of Object.values(sceneItems)) {
    if ("update" in item) {
      item.update(deltaTime, gameContext)
    }
  }
}
