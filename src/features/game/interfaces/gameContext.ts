import type { GameInput } from "../gameInput"
import type { GameState } from "../gameState"
import type { GameBounds } from "./gameBounds"

export interface GameContext {
  gameState: GameState
  gameInput: GameInput
  gameBounds: GameBounds
}
