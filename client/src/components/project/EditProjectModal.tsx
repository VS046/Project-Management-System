"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { updateProject, Project } from "@/services/services";

type ProjectForm = {
  name: string;
  description: string;
  status: string;
};

type Props = {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditProjectModal({
  open,
  project,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProjectForm>({
    defaultValues: {
      name: "",
      description: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description || "",
        status: project.status,
      });
    }
  }, [project, reset]);

  if (!open || !project) return null;

  const onSubmit = async (data: ProjectForm) => {
    try {
      await updateProject(project._id, data);
      toast.success("Project updated successfully");
      onClose();
      onSuccess();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || "Failed to update project");
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
            <h2 className="text-2xl font-bold text-slate-800">Edit Project</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update project details and status.
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
            label="Project Name"
            placeholder="Enter project name"
            {...register("name", { required: "Project name is required" })}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Enter project description"
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-500"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
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
              {isSubmitting ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
