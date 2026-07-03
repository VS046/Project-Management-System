"use client";

import { X, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

type Props = {
  open: boolean;
  projectName: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteProjectConfirm({
  open,
  projectName,
  isDeleting,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Delete Project
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6 space-y-4 rounded-3xl border border-red-100 bg-red-50 p-5 text-sm text-slate-700">
          <div className="flex items-center gap-3 text-red-700">
            <Trash2 size={18} />
            <span>Delete project:</span>
          </div>
          <p className="font-semibold text-slate-900">{projectName}</p>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="w-auto bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-auto bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      </div>
    </div>
  );
}
