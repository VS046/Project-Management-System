"use client";

import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createWorkspace } from "@/services/services";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type WorkspaceForm = {
  name: string;
  description: string;
};

export default function CreateWorkspaceModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<WorkspaceForm>();

  if (!open) return null;

  const onSubmit = async (data: WorkspaceForm) => {
    try {
      await createWorkspace(data);

      toast.success("Workspace created successfully");

      reset();
      onClose();
      onSuccess();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || "Failed to create workspace");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Create Workspace
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Create a workspace for your projects.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Workspace Name"
            placeholder="Enter workspace name"
            {...register("name", {
              required: "Workspace name is required",
            })}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Enter workspace description"
              className="w-full resize-none rounded-2xl text-slate-800 border border-slate-200 px-4 py-3 outline-none transition focus:border-cyan-500"
            />
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
              type="submit"
              disabled={isSubmitting}
              className="w-auto px-6"
            >
              {isSubmitting ? "Creating..." : "Create Workspace"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
