import { rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = "public";

const SUPERSEDED = [
  "images/keethhouse-hero.png",
  "images/our-story/team.png",
  "images/privacy-policy.png",
  "images/contact-us.jpg",
  "images/faq.jpg",
  "images/our-story/host.jpeg",
  "images/mt-award.jpeg",
];

let reclaimed = 0;
for (const rel of SUPERSEDED) {
  const p = join(PUBLIC, rel);
  if (!existsSync(p)) {
    console.warn(`skip ${rel} — missing`);
    continue;
  }
  const size = (await stat(p)).size;
  await rm(p);
  reclaimed += size;
  console.log(`✓ ${rel} (${(size / 1024).toFixed(0)}KB)`);
}
console.log(
  `\nReclaimed: ${(reclaimed / 1024 / 1024).toFixed(2)}MB`
);
