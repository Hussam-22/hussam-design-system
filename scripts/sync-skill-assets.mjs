import {
  readFile,
  writeFile,
  mkdir,
  cp,
  readdir,
  stat,
} from "node:fs/promises";
import { resolve, dirname, relative, join } from "node:path";
const root = resolve(import.meta.dirname, "..");
const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
async function collect(file, seen) {
  if (seen.has(file)) return;
  seen.add(file);
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(
    /(?:from\s*|import\s*\(|import\s*|@import\s*)['"](\.[^'"]+)['"]/g,
  )) {
    const base = resolve(dirname(file), match[1]);
    for (const candidate of [
      base,
      ...[".ts", ".tsx", ".css", ".json", ".svg"].map((ext) => base + ext),
    ]) {
      try {
        if ((await stat(candidate)).isFile()) {
          await collect(candidate, seen);
          break;
        }
      } catch {}
    }
  }
}
for (const entry of catalog) {
  const destination = join(root, "skills", entry.name, "assets");
  await mkdir(destination, { recursive: true });
  await cp(join(root, entry.screenshot), join(destination, "preview.png"));
  if (entry.export === "upstream") {
    await cp(join(root, "docs/tech-text.md"), join(destination, "upstream.md"));
    continue;
  }
  const files = new Set();
  await collect(join(root, entry.code), files);
  if (entry.name === "hds-ui-primitives") {
    for (const file of await readdir(join(root, "src/components/ui"))) {
      if (file.endsWith(".tsx"))
        await collect(join(root, "src/components/ui", file), files);
    }
  }
  if (entry.name === "hds-gradient-palette")
    await collect(join(root, "src/components/Visuals.tsx"), files);
  for (const file of files) {
    const target = join(
      destination,
      "source",
      relative(join(root, "src"), file),
    );
    await mkdir(dirname(target), { recursive: true });
    await cp(file, target);
  }
  await cp(join(root, "src/styles"), join(destination, "source/styles"), {
    recursive: true,
  });
  await cp(
    join(root, "src/assets.d.ts"),
    join(destination, "source/assets.d.ts"),
  );
  await cp(
    join(root, "THIRD_PARTY_NOTICES.md"),
    join(destination, "THIRD_PARTY_NOTICES.md"),
  );
  await cp(join(root, "licenses"), join(destination, "licenses"), {
    recursive: true,
  });
  const declarations = JSON.parse(
    await readFile(join(root, "package.json"), "utf8"),
  );
  await writeFile(
    join(destination, "dependencies.json"),
    JSON.stringify(
      {
        peerDependencies: declarations.peerDependencies,
        dependencies: declarations.dependencies,
      },
      null,
      2,
    ) + "\n",
  );
}
const previewFiles = await readdir(join(root, "docs/screenshots"));
console.log(
  `Synced ${catalog.length} self-contained skills with ${previewFiles.length} previews.`,
);
