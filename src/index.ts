import { GameState } from "#/features/game/gameState.js"
import { Ball } from "./features/ball/ball.js"
import { GameInput } from "./features/game/gameInput.js"
import type { GameBounds } from "./features/game/interfaces/gameBounds.js"
import { drawGame } from "./features/game/lib/drawGame.js"
import { updateGame } from "./features/game/lib/updateGame.js"
import { HumanPaddle } from "./features/paddle/humanPaddle.js"
import { UnfairAIPaddle } from "./features/paddle/unfairAIPaddle.js"
import { canvasRenderer } from "./features/renderer/canvasRenderer.js"

export function runGame() {
  const $canvas = document.querySelector<HTMLCanvasElement>("#game")
  if (!$canvas) throw new Error("Canvas element not found")

  const ctx = $canvas.getContext("2d")
  if (!ctx) throw new Error("Failed to get canvas context")

  const paddleLeft = new HumanPaddle(5, $canvas.height / 2 - 50, 20, 100)
  const paddleRight = new UnfairAIPaddle(
    $canvas.width - 20 - 5,
    $canvas.height / 2 - 50,
    20,
    100,
  )

  const gameInput = new GameInput()

  const ball = new Ball(7, $canvas.width / 2 - 5, $canvas.height - 10, 100)

  const renderer = new canvasRenderer($canvas)
  const gameBounds: GameBounds = {
    height: $canvas.height,
    width: $canvas.width,
  }

  const gameState = new GameState(paddleLeft, paddleRight, ball)

  let lastTime = performance.now()
  function draw(time: DOMHighResTimeStamp = lastTime) {
    if (!$canvas || !ctx) return

    const deltaTime = (time - lastTime) / 1000

    lastTime = time

    updateGame(deltaTime, gameState, gameInput, gameBounds)
    drawGame(renderer, gameState, gameBounds)

    window.requestAnimationFrame(draw)
  }

  window.requestAnimationFrame(draw)
}

runGame()
