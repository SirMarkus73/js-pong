import type { Renderer } from "./interfaces/renderer"

export class CanvasRenderer implements Renderer {
  private readonly ctx: CanvasRenderingContext2D

  constructor(private readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("Cannot get context of canvas")
    }

    this.ctx = ctx
  }

  clearScreen(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawCircle(x: number, y: number, radius: number, color: string): void {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }

  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ): void {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, width, height)
  }

  drawText(
    text: string,
    x: number,
    y: number,
    font: string,
    fontSize: string,
    fontAlign: CanvasTextAlign,
  ): void {
    this.ctx.font = `${fontSize} ${font}`
    this.ctx.textAlign = fontAlign
    this.ctx.fillText(text, x, y)
  }
}
