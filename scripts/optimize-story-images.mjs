import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const dir = "public/images/our-story";
const targets = ["our-story-1", "our-story-2", "our-story-3", "our-story-4", "our-story-5"];

const variants = [
  { suffix: "",      width: 1600, quality: 78 },
  { suffix: "-sm",   width: 900,  quality: 72 },
];

const files = await readdir(dir);

for (const base of targets) {
  const match = files.find(f => parse(f).name.toLowerCase() === base.toLowerCase());
  if (!match) {
    console.warn(`skip ${base} — source not found`);
    continue;
  }
  const src = join(dir, match);
  const srcSize = (await stat(src)).size;
  for (const v of variants) {
    const out = join(dir, `${base}${v.suffix}.webp`);
    await sharp(src)
      .rotate()
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality, effort: 5 })
      .toFile(out);
    const outSize = (await stat(out)).size;
    console.log(
      `${match} (${(srcSize/1024/1024).toFixed(1)}MB) → ${base}${v.suffix}.webp ${(outSize/1024).toFixed(0)}KB`
    );
  }
}
console.log("✓ done");
