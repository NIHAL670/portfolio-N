import Image from "next/image";
import type { ReactNode } from "react";
import {
  achievements,
  education,
  experience,
  otherProjects,
  projects,
  site,
  skills,
  stats,
  type Project,
} from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { CopyEmail } from "@/components/copy-email";
import { ContactForm } from "@/components/contact-form";
import { ProjectVisual } from "@/components/project-visual";
import { BrandIcon, hasBrandIcon } from "@/components/brand-icon";
import { ArrowUpRight } from "@/components/icons";

const container = "mx-auto w-full max-w-6xl px-6 lg:px-8";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Experience />
        <Work />
        <Skills />
        <Recognition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className={`${container} pt-12 pb-20 sm:pt-20 lg:pb-24`}>
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_360px] lg:gap-20">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-[3.6rem]">
              {site.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted">{site.intro}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-fg px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                Get in touch
              </a>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-5 py-3 text-sm font-medium transition-colors hover:border-subtle"
              >
                View resume
                <ArrowUpRight width={14} height={14} className="text-muted" />
              </a>
              <span className="mx-2 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
              <ul className="flex items-center gap-1">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-line/60 hover:text-fg"
                    >
                      <BrandIcon name={s.icon} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto w-full max-w-[360px]">
          <figure className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-20px_rgba(0,0,0,0.2)]">
            <div className="relative aspect-[4/5] bg-white">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 90vw"
                className="object-cover object-[50%_12%] dark:brightness-95"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
              <div>
                <p className="font-medium">{site.name}</p>
                <p className="mt-0.5 text-sm text-muted">{site.currently.value}</p>
              </div>
              <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <dl className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-card lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 sm:p-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i >= 2 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l" : ""}`}
            >
              <div className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="grid gap-6">
        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`}>
            <Reveal>
              <article className="grid gap-6 rounded-2xl border border-line bg-card p-6 sm:p-8 md:grid-cols-[200px_1fr] md:gap-10">
                <div className="flex items-start gap-4 md:flex-col md:gap-3">
                  <CompanyMark name={job.company} logo={job.logo} />
                  <div>
                    <p className="font-mono text-xs text-muted">{job.period}</p>
                    <p className="mt-1 text-sm text-subtle">{job.location}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                  <p className="text-muted">{job.company}</p>
                  <ul className="mt-5 grid gap-2.5">
                    {job.points.map((point) => (
                      <Bullet key={point}>{point}</Bullet>
                    ))}
                  </ul>
                  {job.stack && <Stack items={job.stack} className="mt-6" />}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Things I've built"
      description="Machine learning projects taken from data to a deployed app, with notes on the decisions behind them."
    >
      <div className="grid gap-20 lg:gap-28">
        {projects.map((project, i) => (
          <Reveal key={project.slug}>
            <ProjectRow project={project} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-24">
        <div className="flex items-end justify-between gap-6">
          <h3 className="text-xl font-semibold tracking-tight">More projects</h3>
          <a
            href="https://github.com/NIHAL670?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
          >
            All repositories
            <ArrowUpRight width={13} height={13} />
          </a>
        </div>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {otherProjects.map((p) => (
            <li key={p.title}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-subtle"
              >
                <div className="relative aspect-video border-b border-line bg-bg">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`Screenshot of ${p.title}`}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center">
                      <div className="flex items-center gap-2 font-mono text-sm text-muted">
                        <BrandIcon name="github" size={18} />
                        NIHAL670 / {p.href.split("/").pop()}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center justify-between gap-3 font-medium">
                    {p.title}
                    <ArrowUpRight className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
        <ProjectVisual project={project} />
      </div>

      <div className="min-w-0">
        <p className="font-mono text-xs text-subtle">
          {String(index + 1).padStart(2, "0")} · {project.context}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed">{project.summary}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-0.5 text-xs leading-snug text-muted">{m.label}</dt>
                <dd className="text-xl font-semibold tracking-tight">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 grid gap-2.5">
          {project.points.map((point) => (
            <Bullet key={point}>{point}</Bullet>
          ))}
        </ul>

        {project.decision && (
          <details className="group mt-6 rounded-xl border border-line bg-card open:pb-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm [&::-webkit-details-marker]:hidden">
              <span>
                <span className="text-accent">Design decision · </span>
                <span className="font-medium">{project.decision.title}</span>
              </span>
              <span
                className="text-lg leading-none text-subtle transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="px-4 pb-3 text-[15px] leading-relaxed text-muted">
              {project.decision.body}
            </p>
          </details>
        )}

        <Stack items={project.stack} className="mt-6" />

        <div className="mt-7 flex flex-wrap gap-3">
          {project.links.map((link) => {
            const primary = link.label === "Live demo";
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={
                  primary
                    ? "inline-flex items-center gap-1.5 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                    : "inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-subtle"
                }
              >
                {!primary && <BrandIcon name="github" size={15} />}
                {link.label}
                {primary && <ArrowUpRight width={14} height={14} />}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="What I work with">
      <Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group} className="rounded-2xl border border-line bg-card p-6">
              <h3 className="text-sm font-medium text-muted">{s.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg px-2.5 py-1.5 text-sm"
                  >
                    {hasBrandIcon(item) && <BrandIcon name={item} size={14} colored />}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Recognition() {
  return (
    <Section id="recognition" eyebrow="Recognition" title="Competitive programming and education">
      <Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => {
            const body = (
              <>
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-bg">
                  <BrandIcon name={a.icon} size={18} colored />
                </span>
                <p className="mt-5 font-medium">{a.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.detail}</p>
              </>
            );
            return (
              <li key={a.title}>
                {a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full rounded-2xl border border-line bg-card p-6 transition-colors hover:border-subtle"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="h-full rounded-2xl border border-line bg-card p-6">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      <Reveal className="mt-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-fg text-sm font-semibold text-bg">
              AKG
            </span>
            <div>
              <p className="font-semibold tracking-tight">{education.school}</p>
              <p className="text-sm text-muted">
                {education.degree} · {education.detail}
              </p>
            </div>
          </div>
          <p className="shrink-0 font-mono text-xs text-muted">{education.period}</p>
        </div>
      </Reveal>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <Reveal>
        <div className="grid gap-12 rounded-3xl border border-line bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-12">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-balance">
              Hiring for an ML or backend role? I&apos;d like to hear about it.
            </p>
            <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">
              Email works best. I&apos;m also open to internships and freelance projects that
              involve shipping a model into a real product.
            </p>
            <div className="mt-8">
              <CopyEmail email={site.email} />
            </div>
            <ul className="mt-8 grid gap-3 text-sm">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-muted transition-colors hover:text-fg"
                  >
                    <BrandIcon name={s.icon} size={16} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm email={site.email} />
        </div>
      </Reveal>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={`${container} flex flex-col gap-3 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>
          © 2026 {site.name} · {site.role}
        </p>
        <p className="text-subtle">
          {site.location} · {site.timezone}
        </p>
      </div>
    </footer>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20 sm:py-28">
      <div className={container}>
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="text-sm font-medium text-accent">{eyebrow}</p>
          <h2
            id={`${id}-title`}
            className="mt-2 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl"
          >
            {title}
          </h2>
          {description && <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function CompanyMark({ name, logo }: { name: string; logo?: string }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-bg">
      {logo ? (
        <BrandIcon name={logo} size={24} colored />
      ) : (
        <span className="text-sm font-semibold">
          {name
            .split(" ")
            .filter((w) => /^[A-Z]/.test(w))
            .slice(0, 2)
            .map((w) => w[0])
            .join("")}
        </span>
      )}
    </span>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-5 text-[15px] leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:bg-subtle">
      {children}
    </li>
  );
}

function Stack({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Built with">
      {items.map((tech) => (
        <li
          key={tech}
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-bg px-2 py-1 text-xs text-muted"
        >
          {hasBrandIcon(tech) && <BrandIcon name={tech} size={12} />}
          {tech}
        </li>
      ))}
    </ul>
  );
}
