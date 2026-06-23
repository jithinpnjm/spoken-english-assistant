import { BookOpen, Languages, LogOut } from "lucide-react";

export type LearningPortal = "english" | "german";

interface PortalSelectorProps {
  learnerName: string;
  onSelect: (portal: LearningPortal) => void;
  onSignOut: () => void;
}

export default function PortalSelector({ learnerName, onSelect, onSignOut }: PortalSelectorProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Private learning portal</p>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">Choose your coach, {learnerName}</h1>
            <p className="mt-2 text-sm text-slate-400">English speaking practice and German exam preparation are separated so each portal can teach differently.</p>
          </div>
          <button onClick={onSignOut} className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/15 flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <button
            onClick={() => onSelect("english")}
            className="group rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6 text-left transition hover:border-cyan-300/60 hover:bg-cyan-500/15"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-200">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">English Coach</p>
            <h2 className="mt-2 text-2xl font-bold">Sky English Teacher</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Continue your existing English speaking, vocabulary, live lesson, and correction flow.</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
              Live-first speaking practice · vocabulary bank · transcript · topic picker
            </div>
          </button>

          <button
            onClick={() => onSelect("german")}
            className="group rounded-3xl border border-amber-400/20 bg-amber-500/10 p-6 text-left transition hover:border-amber-300/60 hover:bg-amber-500/15"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-200">
              <Languages className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">German Coach</p>
            <h2 className="mt-2 text-2xl font-bold">Deutsch Coach</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Start the A0 to B1 Goethe path. A1 is the first active exam target, with A2 and B1 already mapped.</p>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
              A0 survival · Goethe A1 · A2 bridge · B1 path · strict review loop
            </div>
          </button>
        </section>
      </div>
    </div>
  );
}
