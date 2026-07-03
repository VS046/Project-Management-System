"use client";

export default function ProjectSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse"
        >
          <div className="mb-5 h-8 w-24 rounded-full bg-slate-200" />
          <div className="mb-4 h-4 w-full rounded-full bg-slate-200" />
          <div className="mb-4 h-4 w-5/6 rounded-full bg-slate-200" />
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div className="h-4 w-32 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
