"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, ListChecks } from "lucide-react";
import toast from "react-hot-toast";

import {
  getTasks,
  getProjects,
  deleteTask,
  Task,
  Project,
} from "@/services/services";
import CreateTaskModal from "@/components/task/CreateTaskModal";
import EditTaskModal from "@/components/task/EditTaskModal";
import DeleteTaskConfirm from "@/components/task/DeleteTaskConfirm";
import TaskSkeleton from "@/components/task/TaskSkeleton";
import TaskCard from "@/components/task/TaskCard";
import Button from "@/components/ui/Button";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const [taskResponse, projectResponse] = await Promise.all([
          getTasks(),
          getProjects(),
        ]);

        setTasks(taskResponse.tasks);
        setProjects(projectResponse.projects);
      } catch {
        toast.error("Unable to load tasks");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const term = searchTerm.toLowerCase();
        return (
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term) ||
          task.project?.name.toLowerCase().includes(term) ||
          task.assignedTo?.name.toLowerCase().includes(term)
        );
      }),
    [tasks, searchTerm],
  );

  const refreshTasks = async () => {
    setLoading(true);

    try {
      const [taskResponse, projectResponse] = await Promise.all([
        getTasks(),
        getProjects(),
      ]);

      setTasks(taskResponse.tasks);
      setProjects(projectResponse.projects);
    } catch {
      toast.error("Unable to refresh tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTask) return;

    setDeleting(true);

    try {
      await deleteTask(selectedTask._id);
      toast.success("Task deleted successfully");
      setDeleteOpen(false);
      setSelectedTask(null);
      await refreshTasks();
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const completedCount = tasks.filter((task) => task.status === "Done").length;
  const pendingCount = tasks.filter((task) => task.status !== "Done").length;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
                Tasks
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">
                Manage your tasks
              </h1>
            </div>

            <Button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600 sm:w-auto"
            >
              <Plus size={18} />
              Create Task
            </Button>
          </div>

          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search tasks"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900">
            Task insights
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Monitor task progress and project coverage.
          </p>
          <div className="mt-6 grid gap-4">
            <div className="flex items-center justify-between rounded-3xl bg-cyan-100 p-5">
              <div>
                <p className="text-sm text-slate-600">Total tasks</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {tasks.length}
                </p>
              </div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500 text-white">
                <ListChecks size={20} />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Pending tasks</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {pendingCount}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Completed tasks</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {completedCount}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Projects available</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {projects.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <TaskSkeleton />
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
          <p className="text-lg font-semibold text-slate-900">No tasks found</p>
          <p className="mt-3">Create a task to get started.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateTaskModal
        open={createOpen}
        projects={projects}
        onClose={() => setCreateOpen(false)}
        onSuccess={refreshTasks}
      />

      <EditTaskModal
        open={editOpen}
        task={selectedTask}
        onClose={() => setEditOpen(false)}
        onSuccess={refreshTasks}
      />

      <DeleteTaskConfirm
        open={deleteOpen}
        taskTitle={selectedTask?.title ?? ""}
        isDeleting={deleting}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
