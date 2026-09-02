import type { Paddle } from "#/features/paddle/interfaces/paddle.js"
import type { Ball } from "../ball/ball.js"

export const GAME_STATUS = {
  PLAYING: "playing",
  GAME_OVER: "gameOver",
} as const

type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS]

export class GameState {
  private _state: GameStatus
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
}
