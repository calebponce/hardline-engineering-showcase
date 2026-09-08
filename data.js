export const syntheticRecord = Object.freeze({
  id: "SYN-042",
  basis: "reference visualization",
  basisDetail: "No measured coordinates are claimed in this public demo.",
  layers: Object.freeze([
    Object.freeze({ id: "outlets", label: "Outlets", count: 3, unit: "markers", color: "#60a5fa" }),
    Object.freeze({ id: "wire", label: "Wire paths", count: 2, unit: "paths", color: "#22d3ee" }),
    Object.freeze({ id: "pipe", label: "Pipe", count: 1, unit: "path", color: "#f59e0b" }),
    Object.freeze({ id: "studs", label: "Studs", count: 6, unit: "references", color: "#94a3b8" }),
  ]),
});

export function normalizedPoint(clientX, clientY, bounds) {
  if (!bounds || bounds.width <= 0 || bounds.height <= 0) {
    return { x: 0.5, y: 0.5 };
  }

  const clamp = (value) => Math.min(1, Math.max(0, value));
  return {
    x: clamp((clientX - bounds.left) / bounds.width),
    y: clamp((clientY - bounds.top) / bounds.height),
  };
}

export function visibleLayerCount(activeLayerIds) {
  const active = new Set(activeLayerIds);
  return syntheticRecord.layers
    .filter((layer) => active.has(layer.id))
    .reduce((total, layer) => total + layer.count, 0);
}
