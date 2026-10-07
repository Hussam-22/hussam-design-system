import { cp, mkdir, readFile, writeFile, access } from "node:fs/promises";
import { resolve, join } from "node:path";
import { homedir } from "node:os";
const root = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const onlyIndex = args.indexOf("--only");
const only = onlyIndex >= 0 ? args[onlyIndex + 1]?.split(",") : null;
if (onlyIndex >= 0 && !only?.length)
  throw Error("--only requires comma-separated skill names");
const codexHome = process.env.CODEX_HOME || join(homedir(), ".codex");
const destination = join(codexHome, "skills");
const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
if (only?.some((name) => !catalog.some((entry) => entry.name === name)))
  throw Error("Unknown skill in --only");
const selected = catalog.filter((entry) => !only || only.includes(entry.name));
await mkdir(destination, { recursive: true });
// Check every destination before copying any skill. Existing unrelated skills are never overwritten.
for (const entry of selected) {
  const target = join(destination, entry.name);
  let exists = false;
  try {
    await access(target);
    exists = true;
  } catch {}
  if (exists) {
    let marker;
    try {
      marker = JSON.parse(
        await readFile(join(target, ".hds-install.json"), "utf8"),
      );
    } catch {}
    if (marker?.repository !== "Hussam-22/hussam-design-system")
      throw Error(`Refusing to overwrite unrelated skill: ${target}`);
  }
  await access(join(root, "skills", entry.name, "assets/preview.png"));
}
for (const entry of selected) {
  const target = join(destination, entry.name);
  await cp(join(root, "skills", entry.name), target, { recursive: true });
  await writeFile(
    join(target, ".hds-install.json"),
    JSON.stringify(
      {
        repository: "Hussam-22/hussam-design-system",
        skill: entry.name,
        version: "0.1.0",
      },
      null,
      2,
    ) + "\n",
  );
}
console.log(
  `Installed ${selected.length} HDS skills in ${destination}. Open a new Codex chat if the current skill list has already loaded.`,
);
