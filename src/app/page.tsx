import { SignupForm } from "./_components/signup-form";

const features = [
  {
    emoji: "🔎",
    title: "Discover opportunities",
    body: "Browse gigs, secondments, and projects across every agency — not just your own.",
    color: "bg-accent-soft",
  },
  {
    emoji: "🪪",
    title: "Showcase your skills",
    body: "Build a profile that travels with you across the whole of government.",
    color: "bg-mint",
  },
  {
    emoji: "🤝",
    title: "Connect with people",
    body: "Find mentors, collaborators, and teams who need exactly what you do.",
    color: "bg-brand-300",
  },
];

const steps = [
  { n: "01", title: "Create your profile", body: "Add your skills, interests, and what you're looking for." },
  { n: "02", title: "Explore the marketplace", body: "Match with projects and people across agencies in seconds." },
  { n: "03", title: "Make your move", body: "Apply, connect, and grow — all without leaving government." },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-2xl font-black tracking-tight text-brand-700">
          laughdieme
        </span>
        <a
          href="#waitlist"
          className="rounded-full bg-brand-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-700"
        >
          Join waitlist
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12 text-center">
        <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
          ✨ The internal LinkedIn for government
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">
          Your next big move is{" "}
          <span className="text-brand-600">already in government.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70 sm:text-xl">
          laughdieme is the whole-of-government talent marketplace. Find
          projects, gigs, and people across every agency — and let your skills
          be seen.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3">
          <SignupForm />
          <p className="text-sm text-foreground/50">
            Free for all public officers. No spam, ever.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border-2 border-foreground/5 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${f.color}`}
              >
                {f.emoji}
              </span>
              <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-foreground/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-center text-4xl font-black tracking-tight sm:text-5xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <span className="text-5xl font-black text-brand-300">{s.n}</span>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-foreground/70">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="mx-auto my-16 w-full max-w-6xl px-6">
        <div className="flex flex-col items-center rounded-[2.5rem] bg-brand-600 px-6 py-16 text-center text-white">
          <h2 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Ready to find your people?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Join the waitlist and be first in when laughdieme opens.
          </p>
          <div className="mt-8 [&_button]:bg-accent [&_button]:hover:bg-accent/90 [&_input]:border-white/30">
            <SignupForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-foreground/50">
        <div className="flex flex-col items-center justify-between gap-2 border-t border-foreground/10 pt-8 sm:flex-row">
          <span className="font-black text-brand-700">laughdieme</span>
          <span>
            Built for the whole of government · © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </main>
  );
}
