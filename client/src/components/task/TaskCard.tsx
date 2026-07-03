"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Task } from "@/services/services";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            Task
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            {task.title}
          </h2>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-sm text-slate-500">
            {task.project?.name ?? "No project"}
          </p>
          <p className="text-sm text-slate-500">
            {task.assignedTo?.name ?? "Unassigned"}
          </p>
        </div>
      </div>

      <p className="min-h-16 text-sm leading-6 text-slate-600">
        {task.description || "No description provided."}
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {task.status}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            Priority: {task.priority}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
