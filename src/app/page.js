import { profile, projects } from "@/content/site";

const container = "mx-auto w-full max-w-page px-5 sm:px-6";
const section = `${container} border-t border-raised py-14 md:py-24`;

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

function SectionHeading({ number, children }) {
  return (
    <h2 className="mb-10 flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
      <span className="font-mono text-sm font-normal text-accent">{number}</span>
      {children}
    </h2>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-muted underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
    >
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Decision({ decision }) {
  return (
    <details className="group border-t border-raised">
      <summary className="flex cursor-pointer list-none items-start gap-3 py-3 [&::-webkit-details-marker]:hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 10 10"
          className="mt-2 h-2.5 w-2.5 shrink-0 fill-accent transition-transform duration-150 group-open:rotate-90 motion-reduce:transition-none"
        >
          <path d="M2 0l6 5-6 5z" />
        </svg>
        <span className="transition-colors group-hover:text-accent">{decision.title}</span>
      </summary>
      <div className="pb-5 pl-[1.4rem] text-muted">
        <p>{decision.detail}</p>
        {decision.seeAlso ? (
          <p className="mt-3">
            <a
              href={`#${decision.seeAlso.slug}`}
              className="font-mono text-sm text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {decision.seeAlso.label}
            </a>
          </p>
        ) : null}
      </div>
    </details>
  );
}

function Project({ project }) {
  const meta = [project.year, project.role, project.status].filter(Boolean);

  return (
    <article id={project.slug} className="scroll-mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="font-mono text-xs text-muted">
          {meta.map((item, i) => (
            <span key={item}>
              {i > 0 ? <span aria-hidden="true"> · </span> : null}
              {item}
            </span>
          ))}
        </p>
      </div>

      <p className="mt-3">{project.blurb}</p>

      {project.problem ? <p className="mt-3 text-muted">{project.problem}</p> : null}

      <ul className="mt-4 flex flex-wrap gap-y-1 font-mono text-xs text-muted">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="after:mx-2 after:text-muted/40 after:content-['·'] last:after:content-none"
          >
            {tech}
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm">
        {project.links.live ? (
          <li>
            <ExternalLink href={project.links.live}>Live demo</ExternalLink>
            {project.coldStart ? (
              <span className="text-muted"> (cold start, give it a minute)</span>
            ) : null}
          </li>
        ) : null}
        {project.links.repo ? (
          <li>
            <ExternalLink href={project.links.repo}>Repo</ExternalLink>
          </li>
        ) : null}
        {project.links.caseStudy ? (
          <li>
            <ExternalLink href={project.links.caseStudy}>Case study</ExternalLink>
          </li>
        ) : null}
      </ul>

      <div className="mt-6">
        {project.decisions.map((decision) => (
          <Decision key={decision.title} decision={decision} />
        ))}
      </div>
    </article>
  );
}

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
                {link.external ? (
                  <span className="font-mono text-sm">
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  </span>
                ) : (
                  <a
                    href={link.href}
                    className="font-mono text-sm underline decoration-muted underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className={section}>
          <SectionHeading number="01">Projects</SectionHeading>
          <div className="space-y-14">
            {projects.map((project) => (
              <Project key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
