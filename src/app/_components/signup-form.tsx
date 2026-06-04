"use client";

import { useState } from "react";
import posthog from "posthog-js";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // Capture the signup intent in PostHog.
    posthog.capture("waitlist_signup", { email });
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="text-lg font-semibold text-brand-700">
        You&apos;re on the list. We&apos;ll be in touch. 🎉
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your.name@agency.gov.sg"
        className="flex-1 rounded-full border-2 border-brand-100 bg-white px-5 py-3 text-foreground outline-none focus:border-brand-500"
      />
      <button
        type="submit"
        className="rounded-full bg-brand-600 px-6 py-3 font-bold text-white transition hover:bg-brand-700 active:scale-95"
      >
        Join the waitlist
      </button>
    </form>
  );
}
