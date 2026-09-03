import { GameState } from "#/features/game/gameState.js"
import { Ball } from "./features/ball/ball.js"
import { GameInput } from "./features/game/gameInput.js"
import type { GameBounds } from "./features/game/interfaces/gameBounds.js"
import { drawGame } from "./features/game/lib/drawGame.js"
import { updateGame } from "./features/game/lib/updateGame.js"
import { HumanPaddle } from "./features/paddle/humanPaddle.js"
import { UnfairAIPaddle } from "./features/paddle/unfairAIPaddle.js"
import { CanvasRenderer } from "./features/renderer/canvasRenderer.js"
import { UI } from "./features/ui/ui.js"

export function runGame() {
  const $canvas = document.querySelector<HTMLCanvasElement>("#game")
  if (!$canvas) throw new Error("Canvas element not found")

  const gameInput = new GameInput()

  const renderer = new CanvasRenderer($canvas)

  const gameBounds: GameBounds = {
    height: $canvas.height,
    width: $canvas.width,
  }

  const paddleLeft = new HumanPaddle(5, gameBounds.height / 2 - 50, 20, 100)
  const paddleRight = new UnfairAIPaddle(
    gameBounds.width - 20 - 5,
    gameBounds.height / 2 - 50,
    20,
    100,
  )
  const ball = new Ball(7, gameBounds.width / 2, gameBounds.height / 2, 100)
  const ui = new UI()

  const gameState = new GameState(paddleLeft, paddleRight, ball, ui)

  let lastTime = performance.now()
  function gameLoop(time: DOMHighResTimeStamp) {
    const deltaTime = (time - lastTime) / 1000

    lastTime = time

    updateGame(deltaTime, {
      gameBounds,
      gameInput,
      gameState,
    })

    drawGame(renderer, {
      gameBounds,
      gameInput,
      gameState,
    })

    window.requestAnimationFrame(gameLoop)
  }

  window.requestAnimationFrame(gameLoop)
}

runGame()
