"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createTask, Project } from "@/services/services";

type TaskForm = {
  title: string;
  description: string;
  projectId: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

type Props = {
  open: boolean;
  projects: Project[];
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateTaskModal({
  open,
  projects,
  onClose,
  onSuccess,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TaskForm>({
    defaultValues: {
      title: "",
      description: "",
      projectId: projects[0]?._id || "",
      priority: "Medium",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (projects.length > 0) {
      reset((values) => ({
        ...values,
        projectId: values.projectId || projects[0]._id,
      }));
    }
  }, [projects, reset]);

  if (!open) return null;

  const onSubmit = async (data: TaskForm) => {
    if (projects.length === 0) {
      toast.error("Please create a project before adding tasks");
      return;
    }

    try {
      await createTask(data);
      toast.success("Task created successfully");
      reset();
      onClose();
      onSuccess();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || "Failed to create task");
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
            <h2 className="text-2xl font-bold text-slate-800">Create Task</h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a new task to a project.
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
            label="Title"
            placeholder="Enter task title"
            {...register("title", { required: "Task title is required" })}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Enter task details"
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Project
            </label>
            {projects.length > 0 ? (
              <div className="relative">
                <select
                  {...register(
                    "projectId",
                    projects.length > 0 ? { required: true } : {},
                  )}
                  className="appearance-auto md:appearance-none w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500"
                >
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
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
                No projects available. Create a project first.
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                {...register("priority")}
                className="appearance-auto md:appearance-none w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-cyan-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate")}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="w-auto bg-slate-500 text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-auto px-6"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
