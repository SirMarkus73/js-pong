type KeyboardInput = {
  space: boolean
  w: boolean
  s: boolean
}

type PointerInput = {
  left: boolean
  right: boolean
}

export class GameInput {
  public keyboard: KeyboardInput = {
    space: false,
    w: false,
    s: false,
  }

  public pointer: PointerInput = {
    left: false,
    right: false,
  }

  private createKeyHandler(type: "keydown" | "keyup") {
    return (event: KeyboardEvent) => {
      const isKeyDown = type === "keydown"

      switch (event.key) {
        case " ": {
          this.keyboard.space = isKeyDown
          break
        }

        case "W":
        case "w": {
          this.keyboard.w = isKeyDown
          break
        }

        case "S":
        case "s": {
          this.keyboard.s = isKeyDown
        }
      }
    }
  }

  private createPointerHandler(type: "pointerdown" | "pointerup") {
    return (event: PointerEvent) => {
      const isPointerDown = type === "pointerdown"

      switch (event.button) {
        case 0: {
          this.pointer.left = isPointerDown
          break
        }
        case 2: {
          this.pointer.right = isPointerDown
        }
      }
    }
  }

  constructor() {
    document.addEventListener("keydown", this.createKeyHandler("keydown"))
    document.addEventListener("keyup", this.createKeyHandler("keyup"))

    document.addEventListener(
      "pointerdown",
      this.createPointerHandler("pointerdown"),
    )
    document.addEventListener(
      "pointerup",
      this.createPointerHandler("pointerup"),
    )
  }
}
