import { readFile, access } from "node:fs/promises";
import { resolve, join } from "node:path";
const root = resolve(import.meta.dirname, "..");
const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
const names = new Set();
for (const entry of catalog) {
  if (names.has(entry.name)) throw Error(`Duplicate: ${entry.name}`);
  names.add(entry.name);
  if (!/^hds-[a-z0-9-]+$/.test(entry.name) || entry.name.length > 64)
    throw Error(`Invalid name: ${entry.name}`);
  const folder = join(root, "skills", entry.name);
  const text = await readFile(join(folder, "SKILL.md"), "utf8");
  if (
    !text.startsWith(`---\nname: ${entry.name}\ndescription: `) ||
    !text.includes("\n---\n")
  )
    throw Error(`Invalid frontmatter: ${entry.name}`);
  if (/TODO|TBD|\[INSERT/i.test(text))
    throw Error(`Placeholder: ${entry.name}`);
  await access(join(folder, "references/component.md"));
  await access(join(folder, "agents/openai.yaml"));
  await access(join(folder, "assets/preview.png"));
  await access(join(root, entry.screenshot));
  if (entry.export !== "upstream")
    await access(
      join(folder, "assets/source", entry.code.replace(/^src\//, "")),
    );
  for (const match of text.matchAll(/\]\((?!https?:)([^)]+)\)/g))
    await access(join(folder, match[1]));
}
console.log(
  `Validated ${catalog.length} named, documented skills and their local resources.`,
);
