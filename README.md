[![Verify public artifact](https://github.com/calebponce/hardline-engineering-showcase/actions/workflows/verify.yml/badge.svg)](https://github.com/calebponce/hardline-engineering-showcase/actions)

# Hardline engineering showcase

Hardline documents utilities while framing is exposed, then turns the capture into a reviewable wall record.

This public repository is a source-safe portfolio artifact for co-founders [Keenan Francisco](https://github.com/keenanfrancisco) and [Caleb Ponce](https://github.com/calebponce). It demonstrates the product language, system boundaries, and selected engineering decisions without publishing Hardline's production codebase, operational configuration, or field data.

- **Live engineering showcase:** [Interactive case study](https://calebponce.github.io/hardline-engineering-showcase/)
- **Product:** [Hardline marketing site](https://hardline-seven.vercel.app/)
- **Technical case study:** [docs/CASE_STUDY.md](docs/CASE_STUDY.md)
- **Contribution evidence:** [CONTRIBUTIONS.md](CONTRIBUTIONS.md)

## What is here

- A dependency-free interactive wall-record visualization using an original code-rendered scene and synthetic utility data
- A high-level map of the iOS, backend, processing, and web review surfaces
- Dated contribution counts and internally verified private-history references for both founders
- Explicit evidence and disclosure boundaries
- Automated checks that guard against accidentally adding common secret, database, or production-config files

The visualization is not a production client, reconstruction implementation, field-accuracy result, or customer scan.

## System boundary

~~~mermaid
flowchart LR
    A["Capture<br/>Swift · ARKit"] --> B["Process<br/>Python · FastAPI"]
    B --> C["Review<br/>TypeScript · React"]
    C --> D["Return<br/>Swift · spatial math"]
    D -. "field evidence informs the contract" .-> A
~~~

The production application and its complete Git history remain private. This repository describes interfaces and engineering judgment, not the implementation behind them.

## Founder record

As reported by GitHub's contributor API for the private production repository on September 8, 2026:

| Founder | Authored commits | Selected focus |
| --- | ---: | --- |
| [Keenan Francisco](https://github.com/keenanfrancisco) | 286 | Spatial contracts, field validation, iOS capture, reliability, release safety |
| [Caleb Ponce](https://github.com/calebponce) | 228 | Full-stack product delivery, reconstruction integration, security, sharing, field UX |

These counts establish sustained authorship, not sole ownership of shared decisions. Outside reviewers cannot inspect the private Git objects; the internal verification method and selected references are in [CONTRIBUTIONS.md](CONTRIBUTIONS.md).

## Run locally

No install or build step is required.

    python3 -m http.server 4173

Then open [http://localhost:4173](http://localhost:4173).

To run the repository checks with Node.js 20 or newer:

    npm test
    npm run check

## Repository map

| Path | Purpose |
| --- | --- |
| index.html, styles.css, app.js | Interactive portfolio case study |
| data.js | Synthetic record and testable display helpers |
| assets/ | Original vector mark |
| docs/CASE_STUDY.md | Technical narrative and design decisions |
| CONTRIBUTIONS.md | Attribution methodology and selected evidence |
| scripts/check.mjs | Public-disclosure safety checks |
| tests/ | Behavioral and disclosure-boundary tests |

## Public-disclosure boundary

Included: high-level architecture, product-language samples, synthetic data, public-safe contribution summaries, and dependency-free showcase source.

Excluded: reconstruction and relocalization algorithms, production application code, infrastructure, credentials, internal operating history, customer/property/scan data, and unvalidated performance claims.

## Rights and reuse

This repository is public for inspection, attribution, and portfolio review; it is not open source. No open-source license is granted. See [NOTICE.md](NOTICE.md).

Security-sensitive concerns should follow [SECURITY.md](SECURITY.md).
