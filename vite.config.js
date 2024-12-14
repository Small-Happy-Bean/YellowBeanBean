// import { fileURLToPath, URL } from "node:url";
// import { resolve } from "path";
import { defineConfig } from "vite";

// Where i work the command is: npx vite build --config vite.config.js
// If just want build the scripts then use:
// build -> lib & rollupOptions & others like plugins
// If want build all files then add:
// base, outDir?, assetsDir , rollupOption -> input... (A little forget...)
export default defineConfig({
  build: {
    // Libs (For just bundling scripts)
    emptyOutDir: false,
    lib: {
      entry: "./src_es6/gameLoader.js",
      name: "index",
    },
    // Rollup Options
    rollupOptions: {
      external: "phaser",
      output: {
        dir: "vite_dist",
        entryFileNames: "index.js",
      },
    },
  },
});
