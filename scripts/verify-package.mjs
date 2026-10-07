import { writeFile, mkdir, cp } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { resolve, join, dirname } from "node:path";
const root = resolve(import.meta.dirname, "..");
const npmCli =
  process.env.npm_execpath ||
  join(dirname(process.execPath), "node_modules/npm/bin/npm-cli.js");
const packed = JSON.parse(
  execFileSync(process.execPath, [npmCli, "pack", "--json"], {
    cwd: root,
    encoding: "utf8",
  }),
);
if (!packed[0].files.some((file) => file.path === "dist/index.d.ts"))
  throw Error("Package declarations missing");
if (!packed[0].files.some((file) => file.path === "licenses/shadcn-ui.txt"))
  throw Error("Third-party license missing");
if (packed[0].files.some((file) => /skills\/|gallery\//.test(file.path)))
  throw Error("Skills or gallery leaked into component package");
const consumer = join(root, ".qa/consumer");
await mkdir(consumer, { recursive: true });
await cp(join(root, packed[0].filename), join(consumer, "hds.tgz"));
await writeFile(
  join(consumer, "package.json"),
  JSON.stringify({
    name: "hds-consumer-check",
    private: true,
    type: "module",
    dependencies: {
      "@hussam-22/design-system": "file:./hds.tgz",
      react: "^19.3.0",
      "react-dom": "^19.3.0",
    },
    devDependencies: {
      vite: "^8.0.0",
      tailwindcss: "^4.3.3",
      "@tailwindcss/vite": "^4.3.3",
      daisyui: "^5.0.0",
    },
  }),
);
await writeFile(
  join(consumer, "index.html"),
  '<html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/main.jsx"></script></body></html>',
);
await writeFile(
  join(consumer, "main.jsx"),
  `import React from 'react';import {createRoot} from 'react-dom/client';import {SpotlightCard,GradientButton,RobotOrb,ServiceGraphic,DesignBrowser} from '@hussam-22/design-system';import '@hussam-22/design-system/styles.css';import './app.css';createRoot(document.getElementById('root')).render(<SpotlightCard className="p-8"><h1>Portable package</h1><GradientButton>Use HDS</GradientButton><ServiceGraphic kind="website"/><div style={{width:300}}><RobotOrb/></div><DesignBrowser/></SpotlightCard>);`,
);
await writeFile(
  join(consumer, "app.css"),
  "@import 'tailwindcss' source(none);\n@source './main.jsx';\n@source './node_modules/@hussam-22/design-system/dist';\n@plugin 'daisyui' { themes: false; }\n",
);
await writeFile(
  join(consumer, "vite.config.js"),
  "import {defineConfig} from 'vite';import tailwind from '@tailwindcss/vite';export default defineConfig({plugins:[tailwind()]});",
);
execFileSync(process.execPath, [npmCli, "install", "--no-audit", "--no-fund"], {
  cwd: consumer,
  stdio: "inherit",
});
execFileSync(process.execPath, ["node_modules/vite/bin/vite.js", "build"], {
  cwd: consumer,
  stdio: "inherit",
});
const report = {
  package: packed[0].name,
  version: packed[0].version,
  files: packed[0].files.length,
  consumerBuild: "passed",
  skillsIncluded: false,
  date: "2026-10-07",
};
await writeFile(
  join(root, "docs/package-validation.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log("Standalone tarball consumer build passed.");
