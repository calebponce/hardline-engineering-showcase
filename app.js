import { normalizedPoint, syntheticRecord } from "./data.js";

const instrument = document.querySelector(".instrument");
const viewport = document.querySelector(".viewport");
const cursorReadout = document.querySelector("#cursor-readout");
const layerControls = document.querySelector("#layer-controls");
const recordCounts = document.querySelector("#record-counts");
const basisReadout = document.querySelector("#basis-readout");
const basisDetail = document.querySelector("#basis-detail");
const modeButtons = [...document.querySelectorAll("[data-mode-button]")];
const scrollMeter = document.querySelector(".scroll-meter span");

const activeLayers = new Set(syntheticRecord.layers.map((layer) => layer.id));

function renderRecordCounts() {
  recordCounts.replaceChildren(
    ...syntheticRecord.layers.map((layer) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const value = document.createElement("dd");
      const swatch = document.createElement("span");

      swatch.className = "layer-swatch";
      swatch.style.setProperty("--swatch", layer.color);
      term.append(swatch, document.createTextNode(layer.label));
      value.textContent = `${layer.count} ${layer.unit}`;
      row.append(term, value);
      return row;
    }),
  );
}

function setLayer(layerId, visible) {
  if (visible) activeLayers.add(layerId);
  else activeLayers.delete(layerId);

  document.querySelectorAll(`[data-layer="${layerId}"]`).forEach((layer) => {
    layer.toggleAttribute("hidden", !visible);
  });
}

function renderLayerControls() {
  layerControls.replaceChildren(
    ...syntheticRecord.layers.map((layer) => {
      const button = document.createElement("button");
      const swatch = document.createElement("span");

      button.type = "button";
      button.dataset.layerToggle = layer.id;
      button.setAttribute("aria-pressed", "true");
      button.setAttribute("aria-label", `Toggle ${layer.label}`);
      swatch.className = "layer-swatch";
      swatch.style.setProperty("--swatch", layer.color);
      button.append(swatch, document.createTextNode(layer.label));
      button.addEventListener("click", () => {
        const next = button.getAttribute("aria-pressed") !== "true";
        button.setAttribute("aria-pressed", String(next));
        setLayer(layer.id, next);
      });
      return button;
    }),
  );
}

function setMode(mode) {
  instrument.dataset.mode = mode;
  modeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.modeButton === mode));
  });

  const messages = {
    capture: {
      basis: "code-rendered wall scene",
      detail: "The utility overlay is suppressed to distinguish the synthetic scene from a mapped record.",
    },
    record: {
      basis: syntheticRecord.basis,
      detail: syntheticRecord.basisDetail,
    },
    evidence: {
      basis: "proof boundary visible",
      detail: "Synthetic behavior checks are not field measurements or certified accuracy evidence.",
    },
  };

  basisReadout.textContent = messages[mode].basis;
  basisDetail.textContent = messages[mode].detail;
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.modeButton));
});

function updateCursorReadout(event) {
  const point = normalizedPoint(event.clientX, event.clientY, viewport.getBoundingClientRect());
  cursorReadout.textContent = `X ${point.x.toFixed(3)} / Y ${point.y.toFixed(3)}`;
}

viewport.addEventListener("pointermove", updateCursorReadout);
viewport.addEventListener("pointerleave", () => {
  cursorReadout.textContent = "X 0.500 / Y 0.500";
});

function updateScrollMeter() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const progress = available > 0 ? window.scrollY / available : 0;
  scrollMeter.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}

window.addEventListener("scroll", updateScrollMeter, { passive: true });
window.addEventListener("resize", updateScrollMeter);

renderRecordCounts();
renderLayerControls();
setMode("record");
updateScrollMeter();
document.querySelector("#year").textContent = new Date().getFullYear().toString();
