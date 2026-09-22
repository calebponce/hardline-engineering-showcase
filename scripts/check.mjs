import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const rootPath = fileURLToPath(root);
const required = [
  "README.md",
  "CONTRIBUTIONS.md",
  "NOTICE.md",
  "SECURITY.md",
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "assets/mark.svg",
];
const forbiddenNames = [
  ".env",
  ".env.local",
  ".env.production",
  "utilitymap.db",
  "credentials.json",
  "service-account.json",
];
const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".svg", ".yml", ".yaml"]);
const opaqueMediaExtensions = new Set([".gif", ".heic", ".jpeg", ".jpg", ".mov", ".mp4", ".png", ".webm"]);
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9_]{30,}/,
  /sk-[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...(await walk(absolute)));
    else paths.push(absolute);
  }

  return paths;
}

for (const path of required) {
  const info = await stat(new URL(path, root));
  assert.equal(info.isFile(), true, `Missing required file: ${path}`);
}

const files = await walk(rootPath);

for (const absolute of files) {
  const path = relative(rootPath, absolute);
  assert.equal(forbiddenNames.includes(path) || forbiddenNames.includes(basename(path)), false, `Forbidden file: ${path}`);
  assert.equal(opaqueMediaExtensions.has(extname(path).toLowerCase()), false, `Opaque media requires explicit provenance review: ${path}`);

  if (!textExtensions.has(extname(path))) continue;
  const contents = await readFile(absolute, "utf8");

  for (const pattern of secretPatterns) {
    assert.equal(pattern.test(contents), false, `Possible secret in ${path}: ${pattern}`);
  }
}

console.log(`Checked ${files.length} public files; disclosure guard passed.`);
