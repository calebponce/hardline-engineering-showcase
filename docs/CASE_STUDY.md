# Engineering a trustworthy wall record

Hardline starts with a narrow field problem: utilities are easiest to document while framing is open, but the resulting record must still be understandable after drywall changes what is visible.

The engineering challenge is not merely producing a plausible overlay. It is preserving enough context and provenance for a later reviewer to know what was observed, what was inferred, and what the system is actually allowed to claim.

## Product workflow

1. Capture guides a phone user through recording an exposed wall with spatial context and immediate field feedback.
2. Processing assembles asynchronous reconstruction, detection, provenance, and record-generation work.
3. Review gives an authorized user 2D and 3D inspection, correction, export, and controlled-sharing surfaces.
4. Return uses an alignment-aware workflow to relate the saved record back to the physical wall.

The production implementation spans Swift/iOS, Python/FastAPI, and TypeScript/React. Those sources and their infrastructure remain private.

## Decision: separate measurement from inference

A location can look precise while being tied to the wrong coordinate basis. Hardline's engineering history therefore treats coordinate provenance as part of the result rather than incidental metadata.

A public-safe version of the contract is:

| Position basis | Permitted interpretation |
| --- | --- |
| Measured | Located in a shared wall-local reference frame |
| Approximate | Image-relative or otherwise unsuitable for a physical measurement claim |
| Unreferenced | Detection exists, but no position is claimed |

This distinction is more important than visual polish: a trustworthy record needs to explain the basis for a location.

## Decision: make failure observable

An asynchronous pipeline can appear healthy while work has stalled between upload, queue, worker, and result surfaces. The team added lifecycle visibility and alerting so a silent scan or worker failure becomes a diagnosable state.

The public artifact describes that principle but excludes queue topology, infrastructure identifiers, thresholds, dashboards, and operational history.

## Decision: treat synthetic checks as software evidence

Synthetic replay is valuable for regressions and adversarial evaluation. It does not establish physical field accuracy.

The evidence hierarchy is:

1. Synthetic replay checks software behavior.
2. A measured pilot compares output against physical ground truth.
3. A reviewed report records the claim boundary and result.

The interactive demo follows the same rule: its wall scene is rendered entirely from repository HTML/CSS/SVG, its utility data is synthetic, and it makes no measured accuracy claim.

## Shared product delivery

Trust also depends on the surfaces around the core geometry: stable room identity, guarded uploads, workspace authorization, usable 2D review, controlled sharing, quota and rate boundaries, and clear capture feedback. Caleb and Keenan's work crossed these boundaries; [CONTRIBUTIONS.md](../CONTRIBUTIONS.md) records selected examples without publishing private source.

## What remains private

- Reconstruction, detection, geometry, and relocalization implementation
- The production repository and complete Git history
- Infrastructure configuration, credentials, and operational details
- Customer, property, scan, and field-validation data
- Internal commercial plans and unvalidated performance results

The result is deliberately asymmetric: enough public material to evaluate engineering judgment and product ownership, without turning the production repository into a copyable blueprint.
