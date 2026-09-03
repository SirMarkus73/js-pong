import type { Paddle } from "#/features/paddle/interfaces/paddle.js"
import type { Ball } from "../ball/ball.js"
import type { UI } from "../ui/ui.js"

export const GAME_STATUS = {
  PLAYING: "playing",
  GAME_OVER: "gameOver",
} as const

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS]

export class GameState {
  public readonly sceneItems

  private _state: GameStatus
  public score = {
    left: 0,
    right: 0,
  }

  constructor(paddleLeft: Paddle, paddleRight: Paddle, ball: Ball, ui: UI) {
    this.sceneItems = {
      [GAME_STATUS.GAME_OVER]: { ui },
      [GAME_STATUS.PLAYING]: {
        ui,
        paddleLeft,
        paddleRight,
        ball,
      },
    }

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

    this.sceneItems.playing.paddleLeft.reset()
    this.sceneItems.playing.paddleRight.reset()
    this.sceneItems.playing.ball.reset()
  }
}
