"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

import {
  getProjects,
  getTasks,
  deleteTask,
  Project,
  Task,
} from "@/services/services";
import TaskCard from "@/components/task/TaskCard";
import TaskSkeleton from "@/components/task/TaskSkeleton";
import CreateTaskModal from "@/components/task/CreateTaskModal";
import EditTaskModal from "@/components/task/EditTaskModal";
import DeleteTaskConfirm from "@/components/task/DeleteTaskConfirm";
import Button from "@/components/ui/Button";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
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
        const [projectResponse, taskResponse] = await Promise.all([
          getProjects(),
          getTasks(),
        ]);

        setProjects(projectResponse.projects);
        setProject(
          projectResponse.projects.find((item) => item._id === projectId) ??
            null,
        );
        setTasks(
          taskResponse.tasks.filter((task) => task.project?._id === projectId),
        );
      } catch {
        toast.error("Unable to load project details");
      } finally {
        setLoading(false);
      }
    }

    if (projectId) {
      loadData();
    }
  }, [projectId]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const term = searchTerm.toLowerCase();
        return (
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term) ||
          task.assignedTo?.name.toLowerCase().includes(term)
        );
      }),
    [tasks, searchTerm],
  );

  const refreshTasks = async () => {
    setLoading(true);

    try {
      const taskResponse = await getTasks();
      setTasks(
        taskResponse.tasks.filter((task) => task.project?._id === projectId),
      );
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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition hover:text-cyan-500"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
              Project details
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              {project?.name ?? "Project details"}
            </h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            {project?.description ??
              "View tasks and progress for this project."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600"
          >
            <Plus size={18} />
            Add Task
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Summary
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Project workspace</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {project?.workspace.name ?? "Unknown"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Total tasks</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {totalTasks}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Completed</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {completedTasks}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Pending</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {pendingTasks}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg xl:col-span-2">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Project tasks
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Task board
              </h2>
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
                placeholder="Search project tasks"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm placeholder:text-slate-400 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
            </div>
          </div>

          {loading ? (
            <TaskSkeleton />
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-500">
              <p className="text-lg font-semibold text-slate-900">
                No tasks found
              </p>
              <p className="mt-3">Add a task to this project to get started.</p>
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-2">
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
        </div>
      </div>

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
