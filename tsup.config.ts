import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "dist",
  format: ["esm"],
  clean: true,
  sourcemap: true,
  dts: false,
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
});