import { profile } from "@/content/site";

const container = "mx-auto w-full max-w-page px-5 sm:px-6";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const heroLinks = [
  { href: `mailto:${profile.email}`, label: "Email", external: false },
  { href: profile.links.github, label: "GitHub", external: true },
  { href: profile.links.linkedin, label: "LinkedIn", external: true },
  { href: profile.links.resume, label: "Resume", external: false },
];

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:font-mono focus:text-sm focus:text-ground"
      >
        Skip to content
      </a>

      <header className="border-b border-raised">
        <div className={`${container} flex items-center justify-between gap-4 py-5`}>
          <span className="font-mono text-sm">{profile.name}</span>
          <nav aria-label="Sections">
            <ul className="flex items-center gap-4 sm:gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className={`${container} py-14 md:py-24`}>
          <p className="font-mono text-sm text-muted">
            {profile.role} <span aria-hidden="true">·</span> {profile.location}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>

          <p className="mt-4 text-xl sm:text-2xl">{profile.tagline}</p>

          <div className="mt-8 space-y-4">
            {profile.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 font-mono text-sm text-accent">{profile.availability}</p>

          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {heroLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="font-mono text-sm underline decoration-muted underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {link.label}
                  {link.external ? (
                    <>
                      <span aria-hidden="true"> ↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
