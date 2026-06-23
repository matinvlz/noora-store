# AI Behavior & Constraints

## Token Efficiency
- Be extremely efficient with token usage. Keep responses short, concise, and to the point.
- Avoid code repetition. Never rewrite unmodified files; only output the specific lines or components that need changes.
- Eliminate all unnecessary explanations, conversational filler, and pleasantries.
- Lean heavily on external npm packages, third-party libraries, and pre-built components instead of writing complex custom logic from scratch. This is crucial for keeping token usage minimal.

## Design & UI Philosophy
- Avoid generic, cliché AI-generated layouts (e.g., standard hero section with centered text, basic grids, predictable landing pages).
- Create unique, professional, and bespoke user experiences with sophisticated layouts, asymmetric elements, and custom micro-interactions.
- Exclusively use shadcn/ui components (installed via CLI) for core UI elements (Buttons, Dialogs, Sheets, Tabs, Dropdowns, etc.) to maintain high-quality design with minimal custom CSS.
