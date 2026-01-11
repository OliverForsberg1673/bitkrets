import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  let input;
  let output;
  if (mode === "backend") {
    input = "server.ts";
    output = "backend";
  } else if (mode === "frontend") {
    output = "frontend";
  }
  return {
    test: {
      include: ["./tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      exclude: ["./tests/data/**/*"],
      setupFiles: "./tests/setup.ts",
    },
    build: {
      rollupOptions: {
        input: input,
        output: {
          dir: `dist/${output}`,
        },
      },
    },
  };
});
