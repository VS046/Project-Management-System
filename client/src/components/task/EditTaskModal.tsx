"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { updateTask, Task } from "@/services/services";

type TaskForm = {
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

type Props = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSuccess: () => void;
};

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function EditTaskModal({
  open,
  task,
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
      status: "Todo",
      priority: "Medium",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        status: task.status as TaskForm["status"],
        priority: task.priority as TaskForm["priority"],
        dueDate: formatDate(task.dueDate),
      });
    }
  }, [task, reset]);

  if (!open || !task) return null;

  const onSubmit = async (data: TaskForm) => {
    try {
      await updateTask(task._id, data);
      toast.success("Task updated successfully");
      onClose();
      onSuccess();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || "Failed to update task");
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
            <h2 className="text-2xl font-bold text-slate-800">Edit Task</h2>
            <p className="mt-1 text-sm text-slate-500">
              Update task details and status.
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                {...register("status", { required: true })}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-500"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>
              <select
                {...register("priority")}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
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
              {isSubmitting ? "Saving..." : "Save Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
