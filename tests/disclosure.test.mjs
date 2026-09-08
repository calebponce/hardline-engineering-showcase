import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("public pages preserve the synthetic evidence boundary", async () => {
  const [page, readme] = await Promise.all([read("../index.html"), read("../README.md")]);
  const publicCopy = (page + readme).toLowerCase();

  assert.match(publicCopy, /synthetic data/);
  assert.match(publicCopy, /code-rendered scene/);
  assert.match(publicCopy, /production codebase/);
  assert.match(publicCopy, /no (measured )?(accuracy|performance) claim/);
});

test("the demo contains no opaque media or misleading focus target", async () => {
  const page = await read("../index.html");

  assert.doesNotMatch(page, /<video\b/i);
  assert.doesNotMatch(page, /demo-(?:scan|poster)/i);
  assert.doesNotMatch(page, /class="viewport"[^>]*tabindex/i);
});

test("both founders and the existing product site are linked", async () => {
  const [page, readme] = await Promise.all([read("../index.html"), read("../README.md")]);
  const publicCopy = page + readme;

  assert.match(publicCopy, /https:\/\/github\.com\/keenanfrancisco/);
  assert.match(publicCopy, /https:\/\/github\.com\/calebponce/);
  assert.match(publicCopy, /https:\/\/hardline-seven\.vercel\.app\//);
});

test("common private implementation identifiers are absent", async () => {
  const files = await Promise.all([
    read("../index.html"),
    read("../app.js"),
    read("../data.js"),
    read("../README.md"),
    read("../CONTRIBUTIONS.md"),
    read("../docs/CASE_STUDY.md"),
  ]);
  const publicCopy = files.join("\n");
  const forbidden = [
    "utility-map-ai",
    "NEXT_PUBLIC_API_URL",
    "DATABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "AWS_SECRET_ACCESS_KEY",
  ];

  for (const identifier of forbidden) {
    assert.equal(publicCopy.includes(identifier), false, `Unexpected private identifier: ${identifier}`);
  }
});
