import { defineCliConfig } from "sanity/cli";

// Used by the `sanity` CLI (e.g. `npx sanity dataset`, `npx sanity deploy`).
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
