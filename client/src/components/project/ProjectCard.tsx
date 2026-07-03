"use client";

import Link from "next/link";
import { FolderKanban, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Project } from "@/services/services";

type Props = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export default function ProjectCard({ project, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            Project
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            {project.name}
          </h2>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 text-cyan-600">
          <FolderKanban size={20} />
        </div>
      </div>

      <p className="min-h-16 text-sm leading-6 text-slate-600">
        {project.description || "No description available."}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {project.status}
        </span>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(project)}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <Link
            href={`/dashboard/projects/${project._id}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            <MoreHorizontal size={16} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
