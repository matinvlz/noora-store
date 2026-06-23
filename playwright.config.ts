import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // The Next.js dev/standalone server drops parallel connections under load
  // (ERR_CONNECTION_RESET). Cap local runs to a single worker; allow more in CI.
  workers: process.env.CI ? 4 : 1,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    // Use the locally installed Google Chrome to avoid downloading
    // Playwright's chrome-headless-shell artifact in restricted networks.
    { name: "chromium", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
  ],
  // Build once, then serve the production output so tests run against the
  // real app the same way users will. Reuses a running server locally.
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
