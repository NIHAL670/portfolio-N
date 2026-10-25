import {
  siC,
  siCodeforces,
  siCplusplus,
  siDocker,
  siExpress,
  siFastapi,
  siGeeksforgeeks,
  siGit,
  siGithub,
  siGithubactions,
  siHuggingface,
  siInfosys,
  siJavascript,
  siKeras,
  siLeetcode,
  siMongodb,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPostgresql,
  siPydantic,
  siPython,
  siReact,
  siRedis,
  siScikitlearn,
  siStreamlit,
  siTailwindcss,
  siTensorflow,
  type SimpleIcon,
} from "simple-icons";

// LinkedIn is not in simple-icons, so its mark is inlined here.
const linkedin = {
  title: "LinkedIn",
  hex: "0A66C2",
  path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
};

type Icon = Pick<SimpleIcon, "title" | "hex" | "path">;

const icons: Record<string, Icon> = {
  python: siPython,
  "c++": siCplusplus,
  javascript: siJavascript,
  c: siC,
  tensorflow: siTensorflow,
  keras: siKeras,
  "scikit-learn": siScikitlearn,
  pandas: siPandas,
  numpy: siNumpy,
  opencv: siOpencv,
  "hugging face": siHuggingface,
  huggingface: siHuggingface,
  pydantic: siPydantic,
  fastapi: siFastapi,
  "node.js": siNodedotjs,
  express: siExpress,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  redis: siRedis,
  docker: siDocker,
  git: siGit,
  "github actions": siGithubactions,
  streamlit: siStreamlit,
  react: siReact,
  "tailwind css": siTailwindcss,
  github: siGithub,
  linkedin,
  leetcode: siLeetcode,
  codeforces: siCodeforces,
  geeksforgeeks: siGeeksforgeeks,
  infosys: siInfosys,
};

export function hasBrandIcon(name: string) {
  return name.toLowerCase() in icons;
}

// Very dark brand colours disappear on the dark theme, so those fall back to the text colour.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70;
}

export function BrandIcon({
  name,
  size = 16,
  colored = false,
  className,
}: {
  name: string;
  size?: number;
  colored?: boolean;
  className?: string;
}) {
  const icon = icons[name.toLowerCase()];
  if (!icon) return null;
  const fill = colored && !isDark(icon.hex) ? `#${icon.hex}` : "currentColor";

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
