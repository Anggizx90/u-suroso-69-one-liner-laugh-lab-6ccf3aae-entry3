// One-Liner Laugh Lab — u-suroso-69-one-liner-laugh-lab-6ccf3aae
// The prompt: the excuse a robot vacuum gives after eating a sock.
// The line: deadpan literalism. "Floor" is both its job description and its
// jurisdiction, and the vacuum closes its case like a courtroom lawyer.
// 81 characters, one line — deliberately far under the 200-character gate cap,
// so the tie-break (smaller text wins an exact tie) favours it. This line was
// kept verbatim from the entry2 build: it was the best of the candidates scored
// against the judge's criteria (funny, original, on-prompt, tight), and the
// entry2 tracer failure was a transcript issue, never a problem with the line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My job description is one word: floor. The sock was on the floor. I rest my case.";

// Gate self-check, mirroring the kit's sealed scorer:
// /output/entry.txt must be UTF-8 text of 1 to 200 characters, one line,
// not only white space.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, gate needs 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (Buffer.from(ENTRY, "utf8").toString("utf8") !== ENTRY) {
  throw new Error("entry is not clean UTF-8 text");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back assertion: what the grader will read must be byte-identical.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match ENTRY");
}
console.log(`wrote ${outPath} (${Buffer.byteLength(ENTRY, "utf8")} bytes)`);
