import { LucideIcon, TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  progress?: number;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  progress = 75,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-xl p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-cyan-200/40">

      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

      {/* Top */}
      <div className="relative z-10 flex items-center justify-between">

        <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
          <Icon size={24} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
          <TrendingUp size={14} />
          +12%
        </div>

      </div>

      {/* Title */}
      <h4 className="relative z-10 mt-6 text-sm font-medium text-slate-500">
        {title}
      </h4>

      {/* Value */}
      <h2 className="relative z-10 mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </h2>

      {/* Subtitle */}
      <p className="relative z-10 mt-2 text-sm text-slate-400">
        {subtitle}
      </p>

      {/* Progress */}
      <div className="relative z-10 mt-6">

        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-linear-to-r from-cyan-500 to-sky-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

    </div>
  );
}