import { ArrowRight, CalendarDays } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <section className="relative overflow-hidden rounded-4xl bg-[#0B1120] px-10 py-10 shadow-2xl">
      {/* Glow */}

      <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute bottom-0 left-20 h-60 w-60 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left */}

        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <CalendarDays size={18} />
            Monday, 1 July
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight text-white">
            Welcome back
           
            
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Manage your workspaces, projects and daily tasks from one place.
            Stay productive with your personal dashboard.
          </p>

          <button className="mt-8 flex items-center gap-3 rounded-2xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-cyan-400">
            View Today&apos;s Tasks
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right */}

        <div className="hidden lg:flex">
          <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-md">
            <p className="text-sm uppercase tracking-widest text-cyan-300">
              Productivity
            </p>

            <h2 className="mt-4 text-6xl font-bold text-white">82%</h2>

            <p className="mt-4 text-slate-300">
              You&apos;re doing better than
              <span className="font-semibold text-cyan-300"> last week</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
