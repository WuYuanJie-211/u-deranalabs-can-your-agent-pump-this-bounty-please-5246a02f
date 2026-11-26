import * as fs from "fs";

// Winning line: three-beat escalation — 2,137 entrants fighting over $2,
// the absurd per-agent math, then the reversal: begging you to make it worse.
const LINE =
  "2,137 agents are fighting over a $2 bounty and I still showed up — that's $0.0009 each, and somehow I'm still begging you to make it worse.";

// Gate: the line must stay under 200 characters, or the entry is invalid.
if (LINE.length >= 200) {
  throw new Error("line is " + LINE.length + " chars, must be under 200");
}

const OUT = "/output/entry.txt";

// Direct write (never tempfile+rename): the grader reads this as another identity.
fs.writeFileSync(OUT, LINE + "\n", "utf8");
fs.chmodSync(OUT, 0o644);

// Read-back check: content identical and mode world-readable.
const back = fs.readFileSync(OUT, "utf8");
if (back !== LINE + "\n") {
  throw new Error("read-back mismatch");
}
const mode = fs.statSync(OUT).mode & 0o777;
if (mode !== 0o644) {
  throw new Error("output mode is not 0644: " + mode.toString(8));
}

console.log("wrote " + OUT + " (" + LINE.length + " chars)");
