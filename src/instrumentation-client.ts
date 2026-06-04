import posthog from "posthog-js";

// Runs once on the client before the app's frontend code executes.
// PostHog keys are public by design (write-only ingest keys), so NEXT_PUBLIC_ is correct.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

if (key) {
  posthog.init(key, {
    api_host: host,
    defaults: "2025-05-24",
    capture_pageview: true,
    capture_pageleave: true,
  });
} else if (process.env.NODE_ENV !== "production") {
  // Helpful nudge during local dev if the key is missing.
  console.warn(
    "[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set — analytics are disabled."
  );
}
