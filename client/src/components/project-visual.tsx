import Image from "next/image";
import type { Project } from "@/content/site";

function hostOf(href?: string) {
  if (!href) return "";
  return new URL(href).host.replace(/^www\./, "");
}

// A light browser chrome around a screenshot, or around the pipeline diagram
// for projects that don't have a public demo worth capturing.
export function ProjectVisual({ project }: { project: Project }) {
  const demo = project.links.find((l) => l.label === "Live demo") ?? project.links[0];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        <p className="min-w-0 flex-1 truncate rounded-md bg-bg px-3 py-1 text-center font-mono text-[11px] text-subtle">
          {project.image ? hostOf(demo?.href) : `${project.slug} / architecture`}
        </p>
        <span className="w-[42px]" aria-hidden="true" />
      </div>

      {project.image ? (
        <div className="relative aspect-video bg-bg">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <Pipeline steps={project.pipeline ?? []} />
      )}
    </div>
  );
}

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className="flex min-h-[300px] flex-col items-center justify-center bg-bg px-6 py-8">
      {steps.map((step, i) => (
        <li key={step} className="relative flex w-full max-w-[280px] items-center gap-4 pb-5 last:pb-0">
          {i < steps.length - 1 && (
            <span className="absolute top-8 bottom-0 left-[15px] w-px bg-line" aria-hidden="true" />
          )}
          <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-line bg-card font-mono text-xs text-muted">
            {i + 1}
          </span>
          <span
            className={`rounded-lg border px-3.5 py-2 text-sm ${
              i === steps.length - 1
                ? "border-accent/40 bg-accent-soft text-fg"
                : "border-line bg-card text-fg"
            }`}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
