"use client";

import { X, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export default function DeleteAccountConfirm({
  open,
  isDeleting,
  onClose,
  onConfirm,
}: Props) {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      // attempt to delete account via API; if endpoint unavailable it'll fail gracefully
      await api.delete("/auth/delete");
      toast.success("Account deleted");
      logout();
      onClose();
      router.push("/login");
      if (onConfirm) onConfirm();
    } catch {
      toast.error("Failed to delete account");
    }
  };

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
              Delete Account
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
            <span>Delete your account and all associated data</span>
          </div>
          <p className="font-semibold text-slate-900">This cannot be undone.</p>
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
            onClick={handleConfirm}
            disabled={isDeleting}
            className="w-auto bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
