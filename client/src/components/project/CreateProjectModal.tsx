"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createProject, Workspace } from "@/services/services";

type ProjectForm = {
  name: string;
  description: string;
  workspaceId: string;
};

type Props = {
  open: boolean;
  workspaces: Workspace[];
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateProjectModal({
  open,
  workspaces,
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
      workspaceId: workspaces[0]?._id || "",
    },
  });

  useEffect(() => {
    if (workspaces.length > 0) {
      reset((values) => ({
        ...values,
        workspaceId: values.workspaceId || workspaces[0]._id,
      }));
    }
  }, [workspaces, reset]);

  if (!open) return null;

  const onSubmit = async (data: ProjectForm) => {
    if (workspaces.length === 0) {
      toast.error("Please create a workspace before adding projects");
      return;
    }

    try {
      await createProject(data);
      toast.success("Project created successfully");
      reset();
      onClose();
      onSuccess();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || "Failed to create project");
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
              Create Project
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a new project to a workspace.
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
              Workspace
            </label>
            {workspaces.length > 0 ? (
              <div className="relative">
                <select
                  {...register("workspaceId", { required: true })}
                  className="appearance-auto md:appearance-none w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500"
                >
                  {workspaces.map((workspace) => (
                    <option key={workspace._id} value={workspace._id}>
                      {workspace.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 hidden md:flex items-center text-slate-400">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                No workspaces available. Create a workspace first.
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="w-auto bg-slate-600 text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-auto px-6"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
