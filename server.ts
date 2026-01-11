import express, { type Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import {
  dashboard,
  getBlogPost,
  getBlogPosts,
} from "./src/backend/controllers/dashboardController.js";
import { DatabaseConnection } from "./src/backend/db.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// this files filename
const __filename = fileURLToPath(import.meta.url);
// the directory of this file i.e. project root
const __dirname = path.dirname(__filename);
// dist path relative to built server.js
const __distPath = path.join(path.dirname(__dirname));
// dist frontend path relative to built server.js
const __distFrontendPath = path.join(__distPath, "frontend");

async function main() {
  // Use memory server for development and test, real DB for production only
  await DatabaseConnection.connect(process.env.NODE_ENV !== "production");

  const app = express();
  app.use(express.json());

  app.get("/posts", getBlogPosts);
  app.get("/blog/:id", getBlogPost);
  app.post("/dashboard", dashboard);

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: __dirname,
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(__distFrontendPath));
    app.get("/*splat", ({ res }: { res: Response }) => {
      res.sendFile(path.join(__distFrontendPath, "index.html"));
    });
  }

  app.listen(port, () => {
    console.log(
      `running ${
        isProduction ? "PROD" : "DEV"
      } server at http://localhost:${port}`
    );
  });
}

main().catch((error) => console.log(error));
