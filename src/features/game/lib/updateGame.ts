import type { GameInput } from "../gameInput"
import { GAME_STATUS, type GameState } from "../gameState"
import type { GameBounds } from "../interfaces/gameBounds"

export function updateGame(
  deltaTime: number,
  gameState: GameState,
  gameInput: GameInput,
  bounds: GameBounds,
): void {
  if (gameState.state === GAME_STATUS.PLAYING) {
    gameState.paddleLeft.update(deltaTime, gameState, gameInput, bounds)
    gameState.paddleRight.update(deltaTime, gameState, gameInput, bounds)
    gameState.ball.update(deltaTime, gameState, gameInput, bounds)
    return
  }

  if (
    gameState.state === GAME_STATUS.GAME_OVER &&
    (gameInput.keyboard.space ||
      gameInput.pointer.left ||
      gameInput.pointer.right)
  ) {
    gameState.start()
  }
}
