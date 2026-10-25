"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-line/60 hover:text-fg"
      aria-label="Toggle colour theme"
    >
      {/* Both icons render on the server; CSS picks one so there is no flash. */}
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </button>
  );
}
