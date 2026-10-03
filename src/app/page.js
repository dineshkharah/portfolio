import {
  profile,
  projects,
  skills,
  experience,
  education,
  recognition,
  site,
} from "@/content/site";

const container = "mx-auto w-full max-w-page px-5 sm:px-6";
const section = `${container} border-t border-line py-14 md:py-24`;

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const profileLinks = [
  { href: profile.links.github, label: "GitHub", external: true },
  { href: profile.links.linkedin, label: "LinkedIn", external: true },
  { href: profile.links.resume, label: "Resume", external: false },
];

const underline =
  "underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

function SectionHeading({ number, children }) {
  return (
    <div className="reveal mb-10">
      <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight">
        <span className="font-mono text-sm font-normal text-accent">{number}</span>
        {children}
      </h2>
      <div
        aria-hidden="true"
        className="mt-3 h-px bg-gradient-to-r from-accent/50 via-line to-transparent"
      />
    </div>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={underline}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function ProfileLink({ link }) {
  return link.external ? (
    <ExternalLink href={link.href}>{link.label}</ExternalLink>
  ) : (
    <a href={link.href} className={underline}>
      {link.label}
    </a>
  );
}

function Decision({ decision }) {
  return (
    <details className="group border-b border-line last:border-b-0">
      <summary className="group/row relative flex cursor-pointer list-none items-start gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-line/30 motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-accent transition-transform duration-200 group-hover/row:scale-y-100 group-open:scale-y-100 motion-reduce:transition-none"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 10 10"
          className="mt-2 h-2.5 w-2.5 shrink-0 fill-accent transition-transform duration-200 group-hover/row:translate-x-0.5 group-open:translate-x-0 group-open:rotate-90 motion-reduce:transition-none"
        >
          <path d="M2 0l6 5-6 5z" />
        </svg>
        <h4 className="transition-colors duration-200 group-hover/row:text-accent">
          {decision.title}
        </h4>
      </summary>
      <div className="px-4 pb-5 pl-[2.4rem] text-muted">
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

function Project({ project, isFirst }) {
  return (
    <article
      id={project.slug}
      className={
        isFirst ? "reveal scroll-mt-8" : "reveal scroll-mt-8 border-t border-line pt-12"
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="font-mono text-xs">
          <span className="text-muted">{project.year}</span>
          <span aria-hidden="true" className="text-muted/40"> · </span>
          <span className="text-muted">{project.role}</span>
          <span aria-hidden="true" className="text-muted/40"> · </span>
          <span className="text-accent">{project.status}</span>
        </p>
      </div>

      <p className="mt-3">{project.blurb}</p>

      {project.problem ? (
        <p className="mt-4 border-l-2 border-accent/40 pl-4 text-muted">{project.problem}</p>
      ) : null}

      <ul
        role="list"
        aria-label={`${project.name} stack`}
        className="mt-5 flex flex-wrap gap-2 font-mono text-xs text-muted"
      >
        {project.stack.map((tech) => (
          <li key={tech} className="rounded border border-line bg-raised px-2 py-1">
            {tech}
          </li>
        ))}
      </ul>

      <ul
        role="list"
        className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm"
      >
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

      <div className="mt-6 overflow-hidden rounded-lg border border-line bg-raised">
        {project.decisions.map((decision) => (
          <Decision key={decision.title} decision={decision} />
        ))}
      </div>
    </article>
  );
}

function TimelineEntry({ entry }) {
  return (
    <li className="reveal py-5 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-semibold tracking-tight">{entry.title}</h3>
        <p className="font-mono text-xs text-muted">{entry.period}</p>
      </div>
      <p className="mt-1 text-muted">{entry.org}</p>
      {entry.note ? <p className="mt-2 text-muted">{entry.note}</p> : null}
    </li>
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

      <header className="border-b border-line">
        <div className={`${container} flex items-center justify-between gap-4 py-5`}>
          <span className="font-mono text-sm">{profile.name}</span>
          <nav aria-label="Sections">
            <ul role="list" className="flex items-center gap-4 sm:gap-6">
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

          <p className="mt-8 flex items-center gap-2.5 font-mono text-sm text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.availability}
          </p>

          <ul
            role="list"
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm"
          >
            <li>
              <a href={`mailto:${profile.email}`} className={underline}>
                Email
              </a>
            </li>
            {profileLinks.map((link) => (
              <li key={link.label}>
                <ProfileLink link={link} />
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className={section}>
          <SectionHeading number="01">Projects</SectionHeading>
          <div className="space-y-12">
            {projects.map((project, i) => (
              <Project key={project.slug} project={project} isFirst={i === 0} />
            ))}
          </div>
        </section>

        <section id="skills" className={section}>
          <SectionHeading number="02">Skills</SectionHeading>
          <div className="divide-y divide-line">
            {skills.map((group) => (
              <div
                key={group.group}
                className="reveal grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-6"
              >
                <h3 className="font-mono text-sm text-muted">{group.group}</h3>
                <ul role="list" className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="rounded border border-line bg-raised px-2 py-1 font-mono text-xs"
                    >
                      {item.name}
                      <span className="ml-1.5 text-muted">{item.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className={section}>
          <SectionHeading number="03">Experience</SectionHeading>
          <ul role="list" className="divide-y divide-line">
            {experience.map((entry) => (
              <TimelineEntry key={`${entry.title}-${entry.period}`} entry={entry} />
            ))}
          </ul>
        </section>

        <section id="education" className={section}>
          <SectionHeading number="04">Education</SectionHeading>
          <ul role="list" className="divide-y divide-line">
            {education.map((entry) => (
              <TimelineEntry key={`${entry.title}-${entry.period}`} entry={entry} />
            ))}
          </ul>
        </section>

        <section id="recognition" className={section}>
          <SectionHeading number="05">Recognition</SectionHeading>
          <ul role="list" className="space-y-4">
            {recognition.map((item, i) => (
              <li key={i} className="reveal flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className={section}>
          <SectionHeading number="06">Contact</SectionHeading>
          <div className="reveal">
          <p className="text-muted">
            {profile.availability}. Based in {profile.location}.
          </p>
          <p className="mt-5">
            <a href={`mailto:${profile.email}`} className={`font-mono text-lg ${underline}`}>
              {profile.email}
            </a>
          </p>
          <ul
            role="list"
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-sm"
          >
            {profileLinks.map((link) => (
              <li key={link.label}>
                <ProfileLink link={link} />
              </li>
            ))}
          </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${container} py-10`}>
          <p className="reveal font-mono text-xs text-muted">
            {site.footer} <ExternalLink href={site.repo}>Source</ExternalLink>
          </p>
        </div>
      </footer>
    </>
  );
}
