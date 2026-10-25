"use client";

import { useActionState } from "react";

type State = { status: "idle" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[15px] placeholder:text-subtle transition-colors focus:border-accent focus:outline-none";

export function ContactForm({ email }: { email: string }) {
  const [state, submit, pending] = useActionState<State, FormData>(
    async (_prev, data) => {
      const name = String(data.get("name") ?? "").trim();
      const from = String(data.get("email") ?? "").trim();
      const message = String(data.get("message") ?? "").trim();
      if (!name || !from || !message) {
        return { status: "error", message: "Please fill in every field." };
      }

      try {
        // FormSubmit forwards the message to the inbox below; no backend needed.
        const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email: from,
            message,
            _subject: `Portfolio message from ${name}`,
            _template: "table",
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        return { status: "sent" };
      } catch {
        return {
          status: "error",
          message: "That didn't go through. Please email me directly instead.",
        };
      }
    },
    { status: "idle" },
  );

  if (state.status === "sent") {
    return (
      <p className="rounded-lg border border-line bg-bg px-4 py-3.5 text-[15px]">
        Thanks, your message is on its way. I&apos;ll reply by email.
      </p>
    );
  }

  return (
    <form action={submit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-sm text-muted">Name</span>
          <input name="name" autoComplete="name" required className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm text-muted">Email</span>
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="text-sm text-muted">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="A role, a project, or a question"
          className={`${field} resize-y`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
