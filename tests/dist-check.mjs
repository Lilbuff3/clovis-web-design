// Checks the built site in dist/ — what visitors and crawlers actually get. Run after `astro build`.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const DIST = path.resolve(import.meta.dirname, "../dist");
const read = (p) => fs.readFileSync(path.join(DIST, p), "utf8");
const pages = fs.globSync("**/*.html", { cwd: DIST });

// Price comes from calculator.ts, so a price change can't silently leave the page stale.
const calc = fs.readFileSync(path.resolve(import.meta.dirname, "../src/data/calculator.ts"), "utf8");
const PRICE = Number(calc.match(/id: "landing",[\s\S]*?price: (\d+)/)[1]);

// ── Home page renders its content without JavaScript ──
const home = read("index.html");
for (const needle of ["tel:5595753014", "sms:+15595753014", `$${PRICE}`, "Fortune 500 craft", "<title>Fresno Web Design"]) {
  assert.ok(home.includes(needle), `index.html is missing ${needle}`);
}
for (const id of ["work", "pricing", "cost-of-slow", "ledger", "receipt", "process", "services", "faq"]) {
  assert.ok(home.includes(`id="${id}"`), `index.html is missing section #${id}`);
}
assert.match(home, /<table[\s>]/, "comparison should be a real <table>");

// ── One valid JSON-LD graph per indexable page ──
const graphs = {};
for (const page of pages.filter((p) => p !== "404.html")) {
  const blocks = [...read(page).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(blocks.length, 1, `${page} should have exactly one JSON-LD block`);
  graphs[page] = JSON.parse(blocks[0][1])["@graph"];
}
const homeTypes = graphs["index.html"].flatMap((n) => [].concat(n["@type"]));
assert.ok(homeTypes.includes("ProfessionalService"));
assert.ok(!homeTypes.includes("MedicalClinic"), "client entities belong on client sites, not the agency homepage");
const offer = graphs["index.html"].find((n) => n.hasOfferCatalog).hasOfferCatalog.itemListElement[0];
assert.equal(offer.price, PRICE, "schema Offer price must match calculator.ts");

// ── Every case study has its own page that points back at the client entity ──
const workPages = pages.filter((p) => p.replaceAll("\\", "/").startsWith("work/"));
assert.equal(workPages.length, 2, "expected one page per case study");
for (const page of workPages) {
  const article = graphs[page].find((n) => n["@type"] === "Article");
  assert.match(article?.about?.url ?? "", /^https:\/\//, `${page} Article should point at the live client site`);
}

// ── JS budget: the calculator island is the only client code ──
const jsGz = fs
  .globSync("_astro/*.js", { cwd: DIST })
  .reduce((sum, f) => sum + zlib.gzipSync(fs.readFileSync(path.join(DIST, f))).length, 0);
assert.ok(jsGz <= 15_000, `JS is ${jsGz} bytes gzipped, budget is 15,000`);

// ── WCAG contrast of the text colors actually used, read from the theme ──
const css = fs.readFileSync(path.resolve(import.meta.dirname, "../src/styles/global.css"), "utf8");
const token = (name) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, "i"))[1];
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(token(a)), lum(token(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
for (const [fg, bg, min] of [
  ["ink", "paper", 7],
  ["ink-soft", "paper", 4.5],
  ["stone", "paper", 4.5],
  ["clay", "paper", 4.5],
  ["linen", "ink", 7],
  ["stone-light", "ink", 4.5],
]) {
  const r = ratio(fg, bg);
  assert.ok(r >= min, `${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`);
}

console.log(`dist-check: ok (${pages.length} pages, ${jsGz} B JS gz)`);
