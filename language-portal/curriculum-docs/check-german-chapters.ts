import {readFileSync, readdirSync} from 'node:fs';
import {join} from 'node:path';

const root = join(process.cwd(), 'docs/german/a1');

function requireCheck(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const test = readFileSync(join(root, 'exam-center/telc-full-practice.mdx'), 'utf8');
const listeningItems = [...test.matchAll(/label="Play listening item (\d+)"/g)].map((match) => Number(match[1]));
requireCheck(listeningItems.length === 15 && listeningItems.every((item, index) => item === index + 1), 'The telc rehearsal needs listening items 1–15');
requireCheck(test.includes('not a telc test') && test.includes('synthetic German device voice'), 'The telc rehearsal needs source and audio limitations');

const bookDir = join(root, 'book');
const bookChapters = readdirSync(bookDir).filter((name) => name.endsWith('.mdx')).sort();
requireCheck(bookChapters.length === 18, `Expected 18 complete A1 book chapters (Chapters 0–17) in docs/german/a1/book, found ${bookChapters.length}`);

const parallelDir = join(process.cwd(), 'docs/german/parallel-systems');
const parallelPages = readdirSync(parallelDir).filter((name) => name.endsWith('.mdx')).sort();
requireCheck(parallelPages.length === 11, `Expected 11 Parallel Learning Systems pages in docs/german/parallel-systems, found ${parallelPages.length}`);

const minimumBookWords = 4000;
const wordPattern = /[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu;
const allMajorChapters = [
  ...bookChapters.map((file) => join(bookDir, file)),
  ...parallelPages.map((file) => join(parallelDir, file)),
  join(root, 'exam-center/telc-overview.mdx'),
  join(root, 'exam-center/telc-writing-speaking.mdx'),
  join(root, 'exam-center/telc-full-practice.mdx'),
];

for (const chapterPath of allMajorChapters) {
  const raw = readFileSync(chapterPath, 'utf8');
  requireCheck(raw.includes('<AIPracticeComponent') && raw.includes('<details>'), `Book/Parallel chapter needs checked practice and AI teacher: ${chapterPath}`);
  const stripped = raw
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/^import .*;\s*$/gm, '')
    .replace(/<AIPracticeComponent\b[\s\S]*?\/>/g, '')
    .replace(/<[^>]+>/g, ' ');
  const wordCount = stripped.match(wordPattern)?.length ?? 0;
  requireCheck(wordCount >= minimumBookWords, `Chapter ${chapterPath} has ${wordCount} words; minimum is ${minimumBookWords}`);
}

console.log(`ok - ${bookChapters.length} full-length A1 book chapters (Chapters 0–17), ${parallelPages.length} Parallel Learning Systems (A–K), 3 telc exam masterclasses (>= ${minimumBookWords} words each), and 15 telc listening items`);
