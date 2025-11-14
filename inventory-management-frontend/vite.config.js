import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fnMapAlias = (value) => {
  const alias = {};
  value.forEach((item) => {
    alias[`@${item}`] = path.resolve(__dirname, `./src/${item}`);
  });
  return alias;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      ...fnMapAlias([
        "components",
        "routers",
        "pages",
        "layouts",
        "assets",
        "services",
        "stores",
        "utils",
      ]),
    },
  },
});
