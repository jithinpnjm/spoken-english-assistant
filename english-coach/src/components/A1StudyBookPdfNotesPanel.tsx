import { useState } from "react";
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { getA1StudyBookPagesByRefs } from "../lib/a1-study-book-notes";
import type { A1StudyBookPdfPage, A1StudyBookTopicIndexEntry } from "../lib/a1-study-book-notes/types";
import type { GermanA1BookLesson } from "../lib/germanA1BookLessonTypes";

interface A1StudyBookPdfNotesPanelProps {
  pages: A1StudyBookPdfPage[];
  topics?: A1StudyBookTopicIndexEntry[];
  lessonNo?: number;
  lesson?: GermanA1BookLesson;
}

interface PhraseEntry {
  no: string;
  german: string;
  english: string;
  note?: string;
}

interface ContentBlock {
  heading?: string;
  entries: PhraseEntry[];
  rawLines: string[];
}

const STAGE_STYLES: Record<string, { badge: string; border: string }> = {
  survival:   { badge: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30", border: "border-l-emerald-500" },
  identity:   { badge: "bg-sky-500/20 text-sky-200 border-sky-500/30",            border: "border-l-sky-500" },
  grammar:    { badge: "bg-violet-500/20 text-violet-200 border-violet-500/30",   border: "border-l-violet-500" },
  cases:      { badge: "bg-amber-500/20 text-amber-200 border-amber-500/30",      border: "border-l-amber-500" },
  "daily-life": { badge: "bg-teal-500/20 text-teal-200 border-teal-500/30",       border: "border-l-teal-400" },
  "exam-life":  { badge: "bg-rose-500/20 text-rose-200 border-rose-500/30",       border: "border-l-rose-500" },
  source:     { badge: "bg-slate-600/40 text-slate-400 border-slate-600/30",      border: "border-l-slate-600" },
};

// Lines that are PDF boilerplate — skip entirely
const BOILERPLATE_RE = /^(?:A1 German Notes|.*\|\s*Page \d+\s*$|Handwritten Page \d+:|CONTENTS IN THIS BATCH|Quality method:|Quality-first|This PDF|🇩🇪)/i;
const PAGE_TITLE_RE = /^Page \d+\s*[-–]/i;

// Table header rows (all batch formats) — skip entirely
const TABLE_HEADER_RE = /^(?:No\.?\s+(?:Handwritten|Source|Clean|Page)|Column\s+Purpose|Handwritten source\s+(?:Correct|Clean)|Source note\s+(?:Correct|Clean|Corrected)|German\s*\/\s*Source\s+Correct|Columns:\s|What this batch|Symbol.+German|Letters.+sounds|No\.\s+Clean|Page\/No\.\s+)/i;

// Numbered data row: "1  text...", "1a  text...", "18-Q1  text...", "18-A2  text..."
const NUMBERED_ROW_RE = /^\s*(\d+[a-zA-Z0-9\-]*)\s{2,}(.+)/;

// Section heading: capital start, no numbers, reasonable length, no multi-column gaps
const HEADING_RE = /^[A-ZÄÖÜ][A-Za-zÄÖÜäöüß ,\-/–()]+$/;

function splitByCols(text: string): string[] {
  return text.split(/\s{3,}/).map((c) => c.trim()).filter(Boolean);
}

function entryFromCols(no: string, cols: string[]): PhraseEntry | null {
  if (cols.length >= 4) {
    // [handwritten-source, clean-German, English, note]
    if (cols[1] && cols[2]) return { no, german: cols[1], english: cols[2], note: cols[3] || undefined };
  }
  if (cols.length === 3) {
    // [handwritten-source, clean-German, English] or [German, English, note]
    if (cols[1] && cols[2]) return { no, german: cols[1], english: cols[2] };
  }
  if (cols.length === 2) {
    if (cols[0] && cols[1]) return { no, german: cols[0], english: cols[1] };
  }
  return null;
}

function parsePageContent(rawText: string): ContentBlock[] {
  const lines = rawText
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => {
      const t = l.trim();
      return t && !BOILERPLATE_RE.test(t) && !PAGE_TITLE_RE.test(t);
    });

  const blocks: ContentBlock[] = [{ entries: [], rawLines: [] }];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (TABLE_HEADER_RE.test(trimmed)) continue;

    // ── Numbered row ────────────────────────────────────────────────────────
    const nm = line.match(NUMBERED_ROW_RE);
    if (nm) {
      const cols = splitByCols(nm[2]);
      const entry = entryFromCols(nm[1].trim(), cols);
      if (entry) {
        blocks[blocks.length - 1].entries.push(entry);
        continue;
      }
      // Has a number but couldn't parse columns — fall through to raw
    }

    // ── Non-numbered multi-column row ────────────────────────────────────────
    // E.g. "Der markt - Market   der Markt   market   Noun capitalized; article der."
    const cols = splitByCols(trimmed);
    // Values that indicate a header row disguised as a data row
    const firstColLower = cols[0]?.toLowerCase() ?? "";
    const isMetaRow =
      firstColLower === "source note" ||
      firstColLower === "handwritten source" ||
      firstColLower === "german / source" ||
      firstColLower === "german" ||
      firstColLower.startsWith("what this batch") ||
      firstColLower.startsWith("method ") ||
      firstColLower === "contents in this batch";
    if (
      !isMetaRow &&
      cols.length >= 2 &&
      cols[0].length < 80 &&
      !trimmed.startsWith("Page ") &&
      !trimmed.startsWith("This PDF") &&
      !trimmed.startsWith("Quality") &&
      !trimmed.startsWith("Important") &&
      !trimmed.startsWith("Columns:")
    ) {
      const entry = entryFromCols("–", cols);
      if (entry) {
        blocks[blocks.length - 1].entries.push(entry);
        continue;
      }
    }

    // ── Section heading ──────────────────────────────────────────────────────
    const cur = blocks[blocks.length - 1];
    if (
      HEADING_RE.test(trimmed) &&
      trimmed.length < 65 &&
      trimmed.split(/\s+/).length <= 7
    ) {
      if (cur.entries.length > 0 || cur.rawLines.length > 0) {
        blocks.push({ heading: trimmed, entries: [], rawLines: [] });
      } else {
        cur.heading = trimmed;
      }
      continue;
    }

    // ── Plain text line ──────────────────────────────────────────────────────
    blocks[blocks.length - 1].rawLines.push(trimmed);
  }

  return blocks.filter((b) => b.entries.length > 0 || b.rawLines.length > 0);
}

// ── Sub-components ───────────────────────────────────────────────────────────

function PhraseTable({ entries }: { entries: PhraseEntry[] }) {
  if (!entries.length) return null;
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-900/80">
            <th className="w-8 px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">#</th>
            <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">German</th>
            <th className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">English</th>
            <th className="hidden lg:table-cell px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {entries.map((entry, idx) => (
            <tr key={`${entry.no}-${idx}`} className={idx % 2 === 0 ? "bg-slate-950" : "bg-slate-900/30"}>
              <td className="px-3 py-2 text-[11px] text-slate-600 align-top">{entry.no}</td>
              <td className="px-3 py-2 font-semibold text-white align-top">{entry.german}</td>
              <td className="px-3 py-2 text-slate-300 align-top">{entry.english}</td>
              <td className="hidden lg:table-cell px-3 py-2 text-xs text-slate-500 align-top">{entry.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RawLines({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(false);
  if (!lines.length) return null;
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-400 transition-colors"
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {open ? "Hide" : "Show"} additional notes ({lines.length} lines)
      </button>
      {open && (
        <div className="mt-2 rounded-md border border-slate-800 bg-slate-950 p-3">
          {lines.map((line, i) => (
            <p key={i} className="text-xs leading-6 text-slate-400">{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80 pt-1">{block.heading}</p>
      )}
      <PhraseTable entries={block.entries} />
      <RawLines lines={block.rawLines} />
    </div>
  );
}

function safePageLabel(page: A1StudyBookPdfPage): string {
  // Some batch pages have a table-header row captured as the label — replace with a generic one
  if (/^(?:Source note|Handwritten source|German\s*\/\s*Source)/i.test(page.sourcePageLabel)) {
    return `Batch page ${page.pdfPageNumber}`;
  }
  if (/^🇩🇪/.test(page.sourcePageLabel)) return "Batch cover";
  return page.sourcePageLabel;
}

function batchLabel(batchId: string, sourcePageRange: string): string {
  const num = batchId.replace("batch", "Batch ");
  return `${num} · ${sourcePageRange}`;
}

function PageCard({ page }: { page: A1StudyBookPdfPage }) {
  const [expanded, setExpanded] = useState(true);
  const blocks = parsePageContent(page.text);
  const totalEntries = blocks.reduce((sum, b) => sum + b.entries.length, 0);

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-slate-900/60 transition-colors"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-100 truncate">{safePageLabel(page)}</p>
          <p className="mt-0.5 text-xs text-slate-500 truncate">
            {batchLabel(page.batchId, page.sourcePageRange)} · PDF p.{page.pdfPageNumber}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {totalEntries > 0 && (
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
              {totalEntries} {totalEntries === 1 ? "phrase" : "phrases"}
            </span>
          )}
          {expanded
            ? <ChevronDown className="h-4 w-4 text-slate-500" />
            : <ChevronRight className="h-4 w-4 text-slate-500" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-slate-800 p-4 space-y-5">
          {blocks.length > 0
            ? blocks.map((block, i) => (
                <div key={i}>
                  <ContentBlockView block={block} />
                </div>
              ))
            : <p className="text-xs italic text-slate-600">No structured phrases found on this page.</p>}
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function A1StudyBookPdfNotesPanel({ pages, topics = [], lessonNo, lesson }: A1StudyBookPdfNotesPanelProps) {
  if (pages.length === 0 && topics.length === 0) return null;

  const topicGroups = topics.length
    ? topics.map((topic) => ({ topic, pages: getA1StudyBookPagesByRefs(topic.pageRefs) }))
    : [{
        topic: {
          id: "linked-sources",
          title: "Linked source pages",
          stage: "source" as const,
          lessonNos: lessonNo ? [lessonNo] : [],
          pageRefs: [],
        },
        pages,
      }];

  const totalPages = topicGroups.reduce((sum, g) => sum + g.pages.length, 0);

  return (
    <div className="space-y-6">

      {/* Panel header */}
      <div className="flex items-start gap-3">
        <BookOpen className="h-5 w-5 text-sky-300 mt-0.5 shrink-0" />
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-100">
            {lesson ? `Source notes — Lesson ${lesson.lessonNo}: ${lesson.titleEn}` : "Source notes"}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            {topicGroups.length} {topicGroups.length === 1 ? "topic" : "topics"} · {totalPages} {totalPages === 1 ? "source page" : "source pages"} — German/English pairs extracted from your handwritten study book PDF.
          </p>
        </div>
      </div>

      {/* Topic sections */}
      {topicGroups.map(({ topic, pages: topicPages }) => {
        const style = STAGE_STYLES[topic.stage] ?? STAGE_STYLES.source;
        const otherLessons = topic.lessonNos.filter((n) => n !== lessonNo);

        return (
          <section
            key={topic.id}
            className={`rounded-xl border border-slate-800 border-l-4 ${style.border} overflow-hidden`}
          >
            {/* Topic header */}
            <div className="border-b border-slate-800 bg-slate-900/70 px-5 py-4">
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-0">
                  <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-2 ${style.badge}`}>
                    {topic.stage}
                  </span>
                  <h4 className="text-base font-bold text-white leading-tight">{topic.title}</h4>
                  {otherLessons.length > 0 && (
                    <p className="mt-1 text-xs text-slate-500">
                      Also indexed for: {otherLessons.map((n) => `Lesson ${n}`).join(", ")}
                    </p>
                  )}
                </div>
                <span className="shrink-0 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400">
                  {topicPages.length} {topicPages.length === 1 ? "page" : "pages"}
                </span>
              </div>
            </div>

            {/* Pages */}
            <div className="p-4 space-y-3">
              {topicPages.length > 0
                ? topicPages.map((page) => (
                    <div key={`${page.batchId}-${page.pdfPageNumber}`}>
                      <PageCard page={page} />
                    </div>
                  ))
                : <p className="text-xs italic text-slate-500 py-2">No source pages indexed for this topic.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
