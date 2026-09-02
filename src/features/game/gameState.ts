import type { GameBounds } from "#/features/game/interfaces/gameBounds.js"
import type { Paddle } from "#/features/paddle/interfaces/paddle.js"
import type { Ball } from "../ball/ball.js"
import type { Renderer } from "../renderer/interfaces/renderer.js"

const GAME_STATUS = {
  PLAYING: "playing",
  GAME_OVER: "gameOver",
} as const

type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS]
type Input = {
  keyboard: {
    spacePressed: boolean
    wPressed: boolean
    sPressed: boolean
  }
  leftClickPressed: boolean
}

export class GameState {
  private _state: GameStatus
  public input: Input = {
    leftClickPressed: false,
    keyboard: { spacePressed: false, wPressed: false, sPressed: false },
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
      switch (event.key) {
        case " ": {
          this.input.keyboard.spacePressed = true
          break
        }

        case "W":
        case "w": {
          this.input.keyboard.wPressed = true
          break
        }

        case "S":
        case "s": {
          this.input.keyboard.sPressed = true
        }
      }
    })

    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case " ": {
          this.input.keyboard.spacePressed = false
          break
        }

        case "W":
        case "w": {
          this.input.keyboard.wPressed = false
          break
        }

        case "S":
        case "s": {
          this.input.keyboard.sPressed = false
        }
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

  public draw(r: Renderer, gameBounds: GameBounds): void {
    r.clearScreen()

    if (this.state === GAME_STATUS.PLAYING) {
      const centerX = gameBounds.width / 2
      r.drawText(
        `${this.score.left}`,
        centerX - 20,
        30,
        "system-ui",
        "20px",
        "center",
      )

      r.drawText(
        `${this.score.right}`,
        centerX + 20,
        30,
        "system-ui",
        "20px",
        "center",
      )

      r.drawRectangle(centerX - 1, 0, 2, gameBounds.height, "#ffff")

      this.paddleLeft.draw(r)
      this.paddleRight.draw(r)
      this.ball.draw(r)
      return
    }

    r.drawText(
      "GAME OVER",
      gameBounds.width / 2,
      gameBounds.height / 2,
      "system-ui",
      "20px",
      "center",
    )

    r.drawText(
      "Press SPACE or CLICK to restart the game",
      gameBounds.width / 2,
      gameBounds.height / 2 + 45,
      "system-ui",
      "25px",
      "center",
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
      (this.input.keyboard.spacePressed || this.input.leftClickPressed)
    ) {
      this.start()
    }
  }
}
