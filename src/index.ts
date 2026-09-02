import { GameState } from "#/features/game/gameState.js"
import { Ball } from "./features/ball/ball.js"
import { UnfairAIPaddle } from "./features/paddle/unfairAIPaddle.js"

export function runGame() {
  const $canvas = document.querySelector<HTMLCanvasElement>("#game")
  if (!$canvas) throw new Error("Canvas element not found")

  const ctx = $canvas.getContext("2d")
  if (!ctx) throw new Error("Failed to get canvas context")

  const paddleLeft = new UnfairAIPaddle(5, $canvas.height / 2 - 50, 20, 100)
  const paddleRight = new UnfairAIPaddle(
    $canvas.width - 20 - 5,
    $canvas.height / 2 - 50,
    20,
    100,
  )
  const ball = new Ball(7, $canvas.width / 2 - 5, $canvas.height - 10, 100)

  const gameState = new GameState(paddleLeft, paddleRight, ball)

  let lastTime = performance.now()
  function draw(time: DOMHighResTimeStamp = lastTime) {
    if (!$canvas || !ctx) return

    const deltaTime = (time - lastTime) / 1000

    lastTime = time

    gameState.update(deltaTime, {
      height: $canvas?.height,
      width: $canvas?.width,
    })
    gameState.draw(ctx)

    window.requestAnimationFrame(draw)
  }

  window.requestAnimationFrame(draw)
}

runGame()
