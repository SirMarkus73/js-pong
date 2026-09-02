import type { UserConfig } from "vite"

export default {
  root: "src",
  resolve: {
    tsconfigPaths: true,
  },
} satisfies UserConfig
