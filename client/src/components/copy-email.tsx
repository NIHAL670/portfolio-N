"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-line bg-bg p-1 pl-3.5">
      <a href={`mailto:${email}`} className="link py-1 text-[15px]">
        {email}
      </a>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(email);
          setCopied(true);
        }}
        className="ml-1 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-line/60 hover:text-fg"
        aria-label="Copy email address"
      >
        {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
