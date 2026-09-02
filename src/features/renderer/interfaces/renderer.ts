export interface Renderer {
  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ): void
  drawCircle(x: number, y: number, radius: number, color: string): void
  drawText(
    text: string,
    x: number,
    y: number,
    font: string,
    fontSize: string,
    fontAlign: string,
  ): void
  clearScreen(): void
}
