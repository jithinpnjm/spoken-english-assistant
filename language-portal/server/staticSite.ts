// Serves the Docusaurus static build (`npm run build:site` -> build/).
// Docusaurus emits one index.html per route (e.g. build/docs/english/foo/index.html), so a route is
// resolved to <path>/index.html or <path>.html, and unknown routes get build/404.html with status 404.

import fs from "fs";
import path from "path";
import express from "express";

export function serveStaticSite(app: express.Express, staticDir: string) {
  const root = path.resolve(process.cwd(), staticDir);
  if (!fs.existsSync(path.join(root, "index.html"))) {
    console.warn(`[Static] ${root}/index.html not found — run "npm run build:site" first. Only /api routes will work.`);
  }

  // Hashed assets can be cached aggressively; HTML must revalidate so new deploys show up.
  app.use(
    express.static(root, {
      index: false,
      redirect: false,
      setHeaders(res, filePath) {
        if (filePath.includes(`${path.sep}assets${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        else if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
      },
    }),
  );

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api/")) return res.status(404).json({ error: "Not found" });
    let decoded: string;
    try {
      decoded = decodeURIComponent(req.path);
    } catch {
      return res.status(400).send("Bad request");
    }
    const relative = path.normalize(decoded).replace(/^([/\\])+/, "");
    const candidates = [path.join(root, relative, "index.html"), path.join(root, `${relative.replace(/[/\\]$/, "")}.html`)];
    for (const candidate of candidates) {
      if (candidate.startsWith(root) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        res.setHeader("Cache-Control", "no-cache");
        return res.sendFile(candidate);
      }
    }
    const notFound = path.join(root, "404.html");
    if (fs.existsSync(notFound)) return res.status(404).sendFile(notFound);
    return res.status(404).send("Not found");
  });
}
