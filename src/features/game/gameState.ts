import type { GameBounds } from "#/features/game/interfaces/gameBounds.js"
import type { Ball } from "../ball/ball.js"
import type { Paddle } from "../paddle/paddle.js"

const GAME_STATUS = {
  PLAYING: "playing",
  GAME_OVER: "gameOver",
} as const

type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS]
type Input = {
  spacePressed: boolean
  leftClickPressed: boolean
}

export class GameState {
  private _state: GameStatus
  public input: Input = {
    leftClickPressed: false,
    spacePressed: false,
  }
  public score = {
    left: 0,
    right: 0,
  }

  constructor(
    public paddleLeft: Paddle,
    public paddleRight: Paddle,
    public ball: Ball,
  ) {
    this.paddleLeft = paddleLeft
    this.paddleRight = paddleRight
    this.ball = ball
    this._state = GAME_STATUS.PLAYING

    document.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        this.input.spacePressed = true
      }
    })

    document.addEventListener("keyup", (event) => {
      if (event.key === " ") {
        this.input.spacePressed = false
      }
    })

    document.addEventListener("pointerdown", (event) => {
      if (event.button === 0) {
        this.input.leftClickPressed = true
      }
      console.log("DOWN")
    })
    document.addEventListener("pointerup", (event) => {
      if (event.button === 0) {
        this.input.leftClickPressed = false
      }
      console.log("UP")
    })
  }

  public get state() {
    return this._state
  }

  public gameOver() {
    this._state = GAME_STATUS.GAME_OVER
  }

  public start() {
    this.reset()
    this._state = GAME_STATUS.PLAYING
  }

  private reset() {
    this.score.left = 0
    this.score.right = 0

    this.ball.reset()
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (this.state === GAME_STATUS.PLAYING) {
      const centerX = ctx.canvas.width / 2

      ctx.font = "20px system-ui"
      ctx.textAlign = "center"

      ctx.fillText(`${this.score.left}`, centerX - 20, 30)
      ctx.fillText(`${this.score.right}`, centerX + 20, 30)

      ctx.fillRect(centerX - 1, 0, 2, ctx.canvas.height)

      this.paddleLeft.draw(ctx)
      this.paddleRight.draw(ctx)
      this.ball.draw(ctx)
      return
    }

    ctx.font = "40px System UI"
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER", ctx.canvas.width / 2, ctx.canvas.height / 2)

    ctx.font = "25px System UI"
    ctx.fillText(
      "Press SPACE or CLICK to restart the game",
      ctx.canvas.width / 2,
      ctx.canvas.height / 2 + 45,
    )
  }

  public update(deltaTime: number, bounds: GameBounds): void {
    if (this.state === GAME_STATUS.PLAYING) {
      this.paddleLeft.update(deltaTime, this, bounds)
      this.paddleRight.update(deltaTime, this, bounds)
      this.ball.update(deltaTime, this, bounds)
      return
    }

    if (
      this.state === GAME_STATUS.GAME_OVER &&
      (this.input.spacePressed || this.input.leftClickPressed)
    ) {
      this.start()
    }
  }
}
