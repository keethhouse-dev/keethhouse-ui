import sharp from "sharp";
import { readFile, writeFile, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = "public";

/** 1. Convert large used images to WebP (full + small variant where useful) */
const CONVERSIONS = [
  // hero — full-bleed on homepage, highest-priority LCP
  {
    src: "images/keethhouse-hero.png",
    out: "images/keethhouse-hero.webp",
    smOut: "images/keethhouse-hero-sm.webp",
    width: 1800, smWidth: 900, quality: 80, smQuality: 74,
  },
  // team silhouette — large PNG, lazy-loaded in our-story
  {
    src: "images/our-story/team.png",
    out: "images/our-story/team.webp",
    width: 1400, quality: 82,
  },
  // privacy policy hero
  {
    src: "images/privacy-policy.png",
    out: "images/privacy-policy.webp",
    width: 1600, quality: 80,
  },
  // contact-us hero
  {
    src: "images/contact-us.jpg",
    out: "images/contact-us.webp",
    width: 1600, quality: 78,
  },
  // faq hero
  {
    src: "images/faq.jpg",
    out: "images/faq.webp",
    width: 1600, quality: 78,
  },
  // host portrait — small but re-encoded for consistency
  {
    src: "images/our-story/host.jpeg",
    out: "images/our-story/host.webp",
    width: 900, quality: 80,
  },
  // make-my-trip award card logo
  {
    src: "images/mt-award.jpeg",
    out: "images/mt-award.webp",
    width: 600, quality: 80,
  },
];

let reclaimed = 0;

for (const c of CONVERSIONS) {
  const srcPath = join(PUBLIC, c.src);
  if (!existsSync(srcPath)) {
    console.warn(`skip ${c.src} — missing`);
    continue;
  }
  const srcSize = (await stat(srcPath)).size;

  await sharp(srcPath)
    .rotate()
    .resize({ width: c.width, withoutEnlargement: true })
    .webp({ quality: c.quality, effort: 5 })
    .toFile(join(PUBLIC, c.out));
  const outSize = (await stat(join(PUBLIC, c.out))).size;

  let smLine = "";
  if (c.smOut) {
    await sharp(srcPath)
      .rotate()
      .resize({ width: c.smWidth, withoutEnlargement: true })
      .webp({ quality: c.smQuality, effort: 5 })
      .toFile(join(PUBLIC, c.smOut));
    const smSize = (await stat(join(PUBLIC, c.smOut))).size;
    smLine = ` + ${c.smOut.split("/").pop()} ${(smSize / 1024).toFixed(0)}KB`;
  }

  console.log(
    `  ${c.src}  ${(srcSize / 1024).toFixed(0)}KB → ${c.out.split("/").pop()} ${(outSize / 1024).toFixed(0)}KB${smLine}`
  );
}

/** 2. Delete confirmed-unused files */
const DELETE = [
  // our-story orphans (old design)
  "images/our-story/beginning.jpeg",
  "images/our-story/experience.jpeg",
  "images/our-story/keeth.jpeg",
  "images/our-story/land.jpeg",
  "images/our-story/people.jpeg",
  // our-story originals — replaced by .webp variants
  "images/our-story/our-story-1.JPEG",
  "images/our-story/our-story-2.JPEG",
  "images/our-story/our-story-3.jpg",
  "images/our-story/our-story-4.JPEG",
  "images/our-story/our-story-5.JPEG",
  // unused root-level files
  "meta-tag.png",
  "logo-black.png",
  "logo-white.JPG",
];

console.log("\nDeleting unused:");
for (const rel of DELETE) {
  const p = join(PUBLIC, rel);
  if (!existsSync(p)) {
    console.warn(`  skip ${rel} — missing`);
    continue;
  }
  const size = (await stat(p)).size;
  await rm(p);
  reclaimed += size;
  console.log(`  ✓ ${rel} (${(size / 1024 / 1024).toFixed(2)}MB)`);
}

console.log(
  `\nTotal reclaimed from deletions: ${(reclaimed / 1024 / 1024).toFixed(2)}MB`
);
console.log("✓ done");
