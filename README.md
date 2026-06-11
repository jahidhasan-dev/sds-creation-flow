# SDS Creation Flow — Demo (Frontend Only)

New-design demo of the ExactSDS creation flow, built from Figma with raw HTML + Tailwind CSS (CDN) + vanilla JS. No backend — all data is dummy and persisted in `localStorage`.

## Run it

Open `index.html` (or `dashboard.html`) in any browser. No build step, no server needed.

## Flow

| Page | Figma node(s) | What works |
|---|---|---|
| `dashboard.html` | 2876-33523 | Hero with welcome pill + animated flask, Create New SDS → Section 1, Create with AI, Credit Wallet cards with animated progress bars, sidebar with Upgrade card, footer links |
| `section-1.html` | 2876-33077 | Product info + SDS config forms, Add Company modal, hazardous/non-hazardous choice cards, required-field validation, save → continue |
| `section-3.html` | 3538-10868, 3538-11410, 3541-10712, 3498-16584, 3504-19052, 3497-16058, 3505-27880 | Empty state, Add Chemical modal (CAS search → skeleton loading → Chemical Found → Verify with progress fill), chemical drawer (H Code / Exposure / Toxicology / Ecotoxicity, inline-editable tables, add/remove codes & rows), Missing Data Warning, chemicals table (edit/delete), Select Preset bulk-load, Generate Final Hazard → Select Mixture State |
| `final-hazard.html` | 3241-28146 | Combined hazard codes grouped by Physical (H2xx) / Health (H3xx) / Environmental (H4xx), add/remove codes, Save Hazard Code |
| `section-9.html` | 3242-29815 | State locked from chosen mixture state, pH/solubility/density/flash point, dynamic "Add Other Properties" rows |
| `section-14.html` | 3242-30549, 3242-30550 | "Not dangerous" toggle disables fields, UN/ID lookup (try 1090, 1830, 1789, 1824) auto-fills class & shipping name, Generate SDS animation → success summary + reset |

## Demo data

Searchable CAS numbers: `7664-93-9` (Sulfuric Acid), `7647-01-0` (Hydrochloric Acid), `1310-73-2` (Sodium Hydroxide), `67-64-1` (Acetone), `64-17-5` (Ethanol). Name search works too.

"Start New SDS" on the success screen clears all stored demo data.

## Structure

```
sds creation flow/
├── index.html            → redirects to section-1
├── section-1.html        → Section 1: Product Details
├── section-3.html        → Section 3: Ingredient Details (+ all modals/drawer)
├── final-hazard.html     → Section 3: Final hazard code
├── section-9.html        → Section 9: Physical Properties
├── section-14.html       → Section 14: Transport Information
└── assets/
    ├── styles.css        → design tokens, components, animations
    ├── data.js           → dummy CAS DB, presets, UN DB, option lists
    └── common.js         → state (localStorage), shared shell, toasts, modals
```
