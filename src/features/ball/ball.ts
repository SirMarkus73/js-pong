import type { GameState } from "#/features/game/gameState.js"
import type { GameBounds } from "#/features/game/interfaces/gameBounds"
import type { GameObject } from "#/features/game/interfaces/gameObject.js"

export class Ball implements GameObject {
  public posX: number
  public posY: number
  private velocityX: number
  private velocityY: number

  constructor(
    public radius: number,
    private startX: number,
    private startY: number,
    private startingVelocity: number,
  ) {
    this.posX = startX
    this.posY = startY

    this.velocityX = startingVelocity
    this.velocityY = -startingVelocity
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.fillStyle = "#ffff"
    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

    // TODO: Dibujar una estela para que quede mas bonito
  }

  public update(
    deltaTime: number,
    gameState: GameState,
    bounds: GameBounds,
  ): void {
    this.checkCollisions(bounds, gameState)
    this.posX += this.velocityX * deltaTime
    this.posY += this.velocityY * deltaTime
  }

  public reset(): void {
    this.posX = this.startX
    this.posY = this.startY
    this.velocityX = this.startingVelocity
    this.velocityY = -this.startingVelocity
  }

  private checkCollisions(bounds: GameBounds, gameState: GameState) {
    if (this.isCollidingUpperWall(bounds)) {
      this.posY = this.radius
      this.velocityY = -this.velocityY
      return
    }

    if (this.isCollidingFloor(bounds)) {
      this.posY = bounds.height - this.radius
      this.velocityY = -this.velocityY
      return
    }

    if (this.isCollidingRightPaddle(gameState)) {
      this.posX = gameState.paddleRight.posX - this.radius

      this.velocityX = -this.velocityX
      gameState.score.right += 1
      return
    }

    if (this.isCollidingLeftPaddle(gameState)) {
      this.posX =
        gameState.paddleLeft.posX + gameState.paddleLeft.width + this.radius

      this.velocityX = -this.velocityX
      gameState.score.left += 1
      return
    }

    if (this.isCollidingLeftWall(bounds) || this.isCollidingRightWall(bounds)) {
      gameState.gameOver()
      return
    }
  }

  private isCollidingRightWall(bounds: GameBounds): boolean {
    return this.posX + this.radius >= bounds.width
  }

  private isCollidingLeftWall(_bounds: GameBounds): boolean {
    return this.posX - this.radius <= 0
  }

  private isCollidingUpperWall(_bounds: GameBounds): boolean {
    return this.posY - this.radius <= 0
  }

  private isCollidingFloor(bounds: GameBounds): boolean {
    return this.posY + this.radius >= bounds.height
  }

  private isCollidingLeftPaddle(gameState: GameState) {
    return (
      this.posX - this.radius <=
        gameState.paddleLeft.posX + gameState.paddleLeft.width &&
      this.posY > gameState.paddleLeft.posY &&
      this.posY < gameState.paddleLeft.posY + gameState.paddleLeft.height
    )
  }

  private isCollidingRightPaddle(gameState: GameState) {
    return (
      this.posX + this.radius >= gameState.paddleRight.posX &&
      this.posY > gameState.paddleLeft.posY &&
      this.posY < gameState.paddleLeft.posY + gameState.paddleLeft.height
    )
  }
}
