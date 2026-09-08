import assert from "node:assert/strict";
import test from "node:test";

import { normalizedPoint, syntheticRecord, visibleLayerCount } from "../data.js";

test("synthetic record exposes only the expected public layers", () => {
  assert.deepEqual(
    syntheticRecord.layers.map(({ id, count }) => ({ id, count })),
    [
      { id: "outlets", count: 3 },
      { id: "wire", count: 2 },
      { id: "pipe", count: 1 },
      { id: "studs", count: 6 },
    ],
  );
});

test("normalizedPoint converts viewport coordinates to zero-to-one values", () => {
  assert.deepEqual(
    normalizedPoint(150, 250, { left: 100, top: 200, width: 200, height: 100 }),
    { x: 0.25, y: 0.5 },
  );
});

test("normalizedPoint clamps values outside the viewport", () => {
  assert.deepEqual(
    normalizedPoint(-20, 900, { left: 0, top: 0, width: 400, height: 400 }),
    { x: 0, y: 1 },
  );
});

test("normalizedPoint falls back to the center for unusable bounds", () => {
  assert.deepEqual(normalizedPoint(1, 1, { width: 0, height: 0 }), { x: 0.5, y: 0.5 });
  assert.deepEqual(normalizedPoint(1, 1), { x: 0.5, y: 0.5 });
});

test("visibleLayerCount totals only active synthetic layers", () => {
  assert.equal(visibleLayerCount(["wire", "outlets"]), 5);
  assert.equal(visibleLayerCount([]), 0);
});
